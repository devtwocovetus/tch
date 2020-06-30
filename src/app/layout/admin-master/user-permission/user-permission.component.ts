import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,  ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

declare var $:any
@Component({
	selector: 'app-user-permission',
	templateUrl: './user-permission.component.html',
	styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {
	// findRoleById
	admin
	getUniqueId
	userRoleObject
	masterRecordsArray
	showLoader
	checkBox
	hiddenfield
	setAccToSurgery
	mySlug
	getCategoryList
	getpagesList
	reqData
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService, 
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getUniqueId= this.route.snapshot.params.slug;
		console.log(this.getUniqueId)
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};

		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('User Permission - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('User Permission - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('User Permission - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.reqData = {}
		this.userRoleObject = {}
		this.getCategoryList = []
		this.getpagesList = []
		// this.getUser()
		this.getPagesNameForPermission()
		setTimeout(function(){ 
			var color = $( '.table thead th' ).css( "background-color" );
			$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
			$(".mat-checked input:checkbox").change(function() {
				var color = $( '.table thead th' ).css( "background-color" );
				var ischecked= $(this).is(':checked');
				if(!ischecked)
					$( ".mat-slide-toggle-thumb" ).css( "background-color", "#ffffff");
				else 
					var color = $( '.table thead th' ).css( "background-color" );
				$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
			});
			// $(".mat-accent .mat-slide-toggle-thumb").css("background-color", '#ffffff!important')
			// var str = str.replace(";", "");
			$(".add-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".view-button").show();
				// $(".add-button").hide();

			});
		}, 2000);
	}

	getUser(){
		this.UserService.findRoleById({ROM_Unique_ID:this.getUniqueId, Slug:this.mySlug}).subscribe((data)=>{
			console.log(data)
			this.userRoleObject = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getPagesNameForPermission(){
		this.showLoader  = true
		var type
		if(this.admin.UM_Office_Type == 'S'){
			type = 'Surgery Center'
		}else if(this.admin.UM_Office_Type == 'P'){
			type = 'Physician Office'
		}else{
			type = 'Surgery Center'
		}
		this.UserService.getPagesNameForPermission({CM_Login_From:type, Slug:this.mySlug}).subscribe((data)=>{
			console.log(data)
			this.getCategoryList = data.Data.CM_Detail
			// this.userRoleObject = data.DataList
			this.showLoader  = false
		},err=>{
			console.log(err)
		})
	}
	getDataViaName(list){
		console.log(list)
		this.showLoader  = true
		this.UserService.pagesListViaCatFromermission({User_ID : this.getUniqueId,Category_Name:list, Slug:this.mySlug}).subscribe((data)=>{
			console.log(data)
			this.getpagesList = data.DataList
			this.showLoader  = false
		},err=>{
			console.log(err)
		})
	}
	goBack(){
		this.location.back()
	}
	SubmitPermission(){
		this.showLoader  = true
		var myThis = this
		var grid = $("#Grid_Pagemaster");
		var children =[];
		children=grid.children();
		$.each(children , function(index){	
			var Permissionuniqueid=$("#hf_permissionid" + index).val();
			var Pageid=$("#hf_pageid" + index).val();
			var Categoryname=$("#hf_category" + index).val();
			var Pagename=$("#lbl_Pagename" + index).text();
			var chkview=false;
			var chkadd=false;
			var chkedit=false;
			var chkdelete=false;
			if($("#chk_0" + index).prop("checked")==true)
			{
				chkview=true;
			}
			if($("#chk_1" + index).prop("checked")==true)
			{
				chkadd=true;
			}
			if($("#chk_2" + index).prop("checked")==true)
			{
				chkedit=true;
			}
			if($("#chk_3" + index).prop("checked")==true)
			{
				chkdelete=true;
			}
			console.log("(" + index + ") " + "PageId : " +   Pageid + ", CategoryName : " 
				+ Categoryname + ", PageName : " + Pagename + ", View : " 
				+ chkview + ", Edit : " + chkedit + ", Add : " + chkadd 
				+ ", Delete : " + chkdelete);
			myThis.AddUserPermissions(Permissionuniqueid,chkview,chkadd,chkedit,chkdelete);
		});		
		this.showLoader  = false
	}

	AddUserPermissions(PerUniqueId,IsView,IsAdd,IsEdit,IsDelete)
	{
		this.UserService.AssignUserPermission({UP_Unique_ID : PerUniqueId, Is_View : IsView , Is_Add : IsAdd, Is_Edit : IsEdit, Is_Delete : IsDelete, Slug:this.mySlug}).subscribe((data)=>{
			console.log(data)
			this.getpagesList = data.DataList
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
	}

	

	
}
