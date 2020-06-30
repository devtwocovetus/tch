import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
declare var $:any
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
	selector: 'app-master-relationship',
	templateUrl: './master-relationship.component.html',
	styleUrls: ['./master-relationship.component.css']
})
export class MasterRelationshipComponent implements OnInit {

	reqData
	admin
	getRelationArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedRtopArray
	setAccToSurgery
	mySlug
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService) { 
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
				this.title.setTitle('Relationship - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Relationship - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Relationship - The Cloud Health')
		}
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Rtop_Name: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
		});
		this.reqData = {}
		this.getRelationArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getRelationList()
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

	addRelation(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update')
			this.form.value.Rtop_Unique_ID = this.getUniqueid
			this.form.value.Rtop_Create_Date = this.getcreatedAt
			this.form.value.Rtop_Is_Active = true
			this.form.value.Rtop_Create_By = this.admin.UM_Unique_ID
			this.form.value.Rtop_Modify_Date = new Date()
			this.form.value.Rtop_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Rtop_User_Name = this.admin.UM_Username
			this.form.value.Rtop_Is_Deleted = false
			this.form.value.Rtop_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.updateRelation(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Rtop_Is_Active = true
			this.form.value.Rtop_Create_By = this.admin.UM_Unique_ID
			this.form.value.Rtop_Create_Date = new Date()
			this.form.value.Rtop_Modify_Date = new Date()
			this.form.value.Rtop_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Rtop_User_Name = this.admin.UM_Username
			this.form.value.Rtop_Is_Deleted = false
			this.form.value.Rtop_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.addRelation(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editRelationList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.Rtop_Unique_ID
		this.getcreatedAt = item.Rtop_Create_Date
		this.form.get('Rtop_Name').setValue(item.Rtop_Name);
	}

	getRelationList(){
		this.showLoader = true
		$('#reltsip').DataTable().destroy();
		var obj = {
			Slug: this.mySlug
		}

		this.UserService.getRelationList(obj).subscribe((data)=>{
			console.log(data)
			this.getRelationArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		console.log(list)
		var obj = {
			Rtop_Is_Active : evt.checked,
			Rtop_Modify_Date : new Date(),
			Rtop_Unique_ID : list.Rtop_Unique_ID,
			Rtop_TimeZone : list.Rtop_TimeZone,
			Slug: this.mySlug
		}
		console.log(obj)
		this.UserService.relationIsActive(obj).subscribe((data)=>{
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
		this.getRelationDeletedList()
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
			Rtop_Modify_Date : new Date(),
			Rtop_Unique_ID : this.isDelete.Rtop_Unique_ID,
			Rtop_Is_Deleted: true,
			Rtop_TimeZone: this.isDelete.Rtop_TimeZone,
			Slug: this.mySlug
		}

		this.UserService.relationIsDeleted(obj).subscribe((data)=>{
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
			Rtop_Modify_Date : new Date(),
			Rtop_Unique_ID : this.isDelete.Rtop_Unique_ID,
			Rtop_Is_Deleted: false,
			Rtop_TimeZone: this.isDelete.Rtop_TimeZone,
			Slug: this.mySlug
		}
		this.UserService.relationIsDeleted(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getRelationDeletedList(){
		this.showLoader = true
		$('#Rtop_deleted_rc').DataTable().destroy();
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getRelationDeletedList(obj).subscribe((data)=>{
			this.getDeletedRtopArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}
// getRelationDeletedList