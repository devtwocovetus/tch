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
	selector: 'app-master-icd10',
	templateUrl: './master-icd10.component.html',
	styleUrls: ['./master-icd10.component.css']
})
export class MasterIcd10Component implements OnInit {

	reqData
	admin
	getRaceArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedBlockArray
	getAnesTArray
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
				this.title.setTitle('ICD - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('ICD - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('ICD - The Cloud Health')
		}
		this.getUniqueid = ''
		this.getAnesTArray = []
		this.hideShow()
		this.form = new FormGroup({
			ICD_Procedure_Code_Category: new FormControl('',[Validators.required]),
			ICD_ICD10_PCS_Code: new FormControl('',[Validators.required]),
			ICD_Code_Description: new FormControl('',[Validators.required]),
		});
		this.reqData = {}
		this.getRaceArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getBlockList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		// this.getAnsNameList()
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
	addBlockthesia(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update', this.form.value)
			this.form.value.ICD_Unique_ID = this.getUniqueid
			this.form.value.ICD_Create_Date = this.getcreatedAt
			this.form.value.ICD_Is_Active = true
			this.form.value.ICD_Create_By = this.admin.UM_Unique_ID
			this.form.value.ICD_Modify_Date = new Date()
			this.form.value.ICD_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.ICD_User_Name = this.admin.UM_Username
			this.form.value.ICD_Is_Deleted = false
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.form.value.ICD_TimeZone = this.admin.UM_TimeZone
			this.UserService.updateICD(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.ICD_Is_Active = true
			this.form.value.ICD_Create_By = this.admin.UM_Unique_ID
			this.form.value.ICD_Create_Date = new Date()
			this.form.value.ICD_Modify_Date = new Date()
			this.form.value.ICD_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.ICD_User_Name = this.admin.UM_Username
			this.form.value.ICD_Is_Deleted = false
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.form.value.ICD_TimeZone = this.admin.UM_TimeZone
			this.UserService.addICD(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editBlockthesiaList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.ICD_Unique_ID
		this.getcreatedAt = item.ICD_Create_Date
		this.form.get('ICD_Procedure_Code_Category').setValue(item.ICD_Procedure_Code_Category);
		this.form.get('ICD_ICD10_PCS_Code').setValue(item.ICD_ICD10_PCS_Code);
		this.form.get('ICD_Code_Description').setValue(item.ICD_Code_Description);

	}

	getBlockList(){
		$('#Icd_tablesss').DataTable().destroy();
		this.showLoader  =true
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.getICDList(obj).subscribe((data)=>{
			console.log(data)
			this.dtTrigger.next();
			this.getRaceArray = data.DataList
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			ICD_Is_Active : evt.checked,
			ICD_Modify_Date : new Date(),
			ICD_Unique_ID : list.ICD_Unique_ID,
			Slug: this.mySlug,
			ICD_TimeZone : this.admin.UM_TimeZone

		}
		console.log(obj)
		this.UserService.ICDIsActive(obj).subscribe((data)=>{
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
		this.getBlockDeletedList()
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
			ICD_Create_By : this.isDelete.ICD_Create_By,
			ICD_Create_Date : this.isDelete.ICD_Create_Date,
			ICD_Is_Active :  this.isDelete.ICD_Is_Active,
			ICD_Modify_Date : new Date(),
			ICD_Name : this.isDelete.ICD_Name,
			ICD_Unique_ID : this.isDelete.ICD_Unique_ID,
			ICD_User_Name : this.isDelete.ICD_User_Name,
			ICD_Create_By_Type: this.isDelete.ICD_Create_By_Type,
			ICD_Is_Deleted: true,
			ICD_Type : this.isDelete.ICD_Type,
			Project_ID  : this.admin.Project_ID,
			Slug: this.mySlug,
			ICD_TimeZone: this.admin.UM_TimeZone

		}

		this.UserService.ICDIsDeleted(obj).subscribe((data)=>{
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
			ICD_Modify_Date : new Date(),
			ICD_Unique_ID : this.isDelete.ICD_Unique_ID,
			ICD_Is_Deleted: false,
			Slug: this.mySlug,
			ICD_TimeZone : this.admin.UM_TimeZone

		}
		console.log(obj)
		this.UserService.ICDIsDeleted(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getBlockDeletedList(){
		$('#ICD_deleted_rc_jjj').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.getICDDeletedList(obj).subscribe((data)=>{
			this.getDeletedBlockArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

	

}

