import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

declare var $:any
@Component({
	selector: 'app-language-master',
	templateUrl: './language-master.component.html',
	styleUrls: ['./language-master.component.css']
})
export class LanguageMasterComponent implements OnInit {

	reqData
	admin
	getLanguageArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedLangArray
	setAccToSurgery
	mySlug
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService) { 
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		console.log(this.getPerDetails[0])
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
		this.dtTrigger1.unsubscribe();
	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.dtOptions1 = {
			pagingType: 'full_numbers',
			pageLength: 10
		};

		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Language - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Language - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Language - The Cloud Health')
		}
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Lang_Name: new FormControl('',[Validators.required, ]),
			// Lang_Shotname: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
		});
		this.reqData = {}
		this.getLanguageArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getLanguageList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
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
				$(".add-button").hide();

			});
		}, 2000);
	}

	addLanguage(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update')
			this.form.value.Lang_Unique_ID = this.getUniqueid
			this.form.value.Lang_Create_Date = this.getcreatedAt
			this.form.value.Lang_Is_Active = true
			this.form.value.Lang_Create_By = this.admin.UM_Unique_ID
			this.form.value.Lang_Modify_Date = new Date()
			this.form.value.Lang_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Lang_User_Name = this.admin.UM_Username
			this.form.value.Lang_Is_Deleted = false
			this.form.value.Lang_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.updateLanguage(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Lang_Is_Active = true
			this.form.value.Lang_Create_By = this.admin.UM_Unique_ID
			this.form.value.Lang_Create_Date = new Date()
			this.form.value.Lang_Modify_Date = new Date()
			this.form.value.Lang_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Lang_User_Name = this.admin.UM_Username
			this.form.value.Lang_Is_Deleted = false
			this.form.value.Lang_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.mySlug

			this.UserService.addLanguage(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editLanguageList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.Lang_Unique_ID
		this.getcreatedAt = item.Lang_Create_Date
		this.form.get('Lang_Name').setValue(item.Lang_Name);
		// this.form.get('Lang_Shotname' ).setValue(item.Lang_Shotname);
	}

	getLanguageList(){
		
		this.showLoader = true
		var obj = {
			Slug: this.mySlug
		}
		$('#lnglstnew').DataTable().destroy();
		this.UserService.getLanguageList(obj).subscribe((data)=>{
			console.log(data)
			this.getLanguageArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			Lang_Is_Active : evt.checked,
			Lang_Modify_Date : new Date(),
			Lang_Unique_ID : list.Lang_Unique_ID,
			Lang_TimeZone : list.Lang_TimeZone,
			Slug: this.mySlug

		}
		console.log(obj)
		this.UserService.languageIsActive(obj).subscribe((data)=>{
			console.log(data)
			// this.ngOnInit()
		},err=>{
			console.log(err)
		})
	}
	hideShow(){
		$(".edit-data").hide();
		$(".view-delete-button").hide();
		$(".view-deleted").hide();
		$( ".add-button" ).show();
		$( ".add-table" ).show();
		$( ".hide-from" ).hide();
		$(".view-button").hide();
		$(document).ready(function(){
			$(".add-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".view-button").show();
				$(".add-button").hide();
				
			});
			$(".view-button").click(function(){
				$(".hide-from").hide();
				$(".view-button").hide();
				$(".add-table").show();
				$(".add-button").show();
				$(".view-delete-button").hide();
				$(".edit-data").hide();
				$(".view-deleted").hide();
			});
		});
		// $('[data-toggle="tooltip"]').tooltip();
	}
	viewDeletedRdcs(){
		this.getLanguageDeletedList()
		$(".view-delete-button").show();
		$(".hide-from").hide();
		$(".view-button").hide();
		$(".add-table").hide();
		$(".add-button").hide();
		$(".view-deleted").show();
		$("#again-Back").show();
		
	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
	}
	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data
	}
	revertDeleted(data){
		$("#revertDelete").modal("show");
		console.log(data)
		this.isDelete = data
	}

	isDeletedYes(){
		
		console.log(this.isDelete)
		var obj = {
			Lang_Modify_Date : new Date(),
			Lang_Unique_ID : this.isDelete.Lang_Unique_ID,
			Lang_Is_Deleted: true,
			Lang_TimeZone: this.isDelete.Lang_TimeZone,
			Slug: this.mySlug

		}

		this.UserService.languageIsDeleted(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}
	revertData(){
		
		var obj = {
			Lang_Modify_Date : new Date(),
			Lang_Unique_ID : this.isDelete.Lang_Unique_ID,
			Lang_Is_Deleted: false,
			Lang_TimeZone: this.isDelete.Lang_TimeZone,
			Slug: this.mySlug

		}
		this.UserService.languageIsDeleted(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getLanguageDeletedList(){
		this.showLoader = true
		$('#Lang_deleted_rc').DataTable().destroy();
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getLanguageDeletedList(obj).subscribe((data)=>{
			this.getDeletedLangArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}

