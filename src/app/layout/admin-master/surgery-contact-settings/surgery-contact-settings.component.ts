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

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-surgery-contact-settings',
  templateUrl: './surgery-contact-settings.component.html',
  styleUrls: ['./surgery-contact-settings.component.css']
})
export class SurgeryContactSettingsComponent implements OnInit {

  reqData
	adminContactationArray
	getUniqueid
	form
	admin
	getContactArray
	getcreatedAt
	showLoader
	isDelete
	getDeletedSCSArray
	surgeryUniqueId
	getSurgeryName
	setAccToSurgery
	mySlug
	dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) { 
		this.surgeryUniqueId = route.snapshot.params.id;
		console.log(this.surgeryUniqueId)
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
				this.title.setTitle('Contact Setting - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Contact Setting - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Contact Setting - The Cloud Health')
		}
		this.getUniqueid = ''
		this.getSurgeryName = ''
		this.hideShow()
		this.form = new FormGroup({
			SCS_Contact_Type: new FormControl('',[Validators.required ]),
			SCS_First_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SCS_Last_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SCS_Phone_No: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			SCS_Email: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
		});
		this.form.get('SCS_Contact_Type').setValue('selectType');
		
		this.reqData = {}
		this.getContactArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getRelationList()
	}

	addRelation(){

		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			if(this.form.value.SCS_Contact_Type == 'selectType'){
				this.toster.warning('Please select contact type','Warning')
				return
			}
			console.log(';im in update')
			var MT_SurgC_Contact_Setting = {
				SurgC_Unique_ID: "MFV94371bb1d952df"
			}

			this.form.value.SurgC_Unique_ID= this.surgeryUniqueId
			this.form.value.SCS_Unique_ID = this.getUniqueid
			this.form.value.SCS_Create_Date = this.getcreatedAt
			this.form.value.SCS_Is_Active = true
			this.form.value.SCS_Create_By = this.admin.UM_Unique_ID
			this.form.value.SCS_Modify_Date = new Date()
			this.form.value.SCS_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.SCS_User_Name = this.admin.UM_Username
			this.form.value.SCS_Is_Deleted = false
			this.form.value.SCS_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID

			var SurgC_ContactSetting =  []
			SurgC_ContactSetting.push(this.form.value)
			var obj = {
				SurgC_Unique_ID:  this.surgeryUniqueId,
				SurgC_ContactSetting:SurgC_ContactSetting
			}
			this.UserService.updateSurgerySetting(obj).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			if(this.form.value.SCS_Contact_Type == 'selectType'){
				this.toster.warning('Please select contact type','Warning')
				return
			}
			this.form.value.SurgC_Unique_ID= this.surgeryUniqueId
			this.form.value.SCS_Is_Active = true
			this.form.value.SCS_Create_By = this.admin.UM_Unique_ID
			this.form.value.SCS_Create_Date = new Date()
			this.form.value.SCS_Modify_Date = new Date()
			this.form.value.SCS_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.SCS_User_Name = this.admin.UM_Username
			this.form.value.SCS_Is_Deleted = false
			this.form.value.SCS_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			// this.form.value.MT_SurgC_Contact_Setting = MT_SurgC_Contact_Setting
			var SurgC_ContactSetting =  []
			SurgC_ContactSetting.push(this.form.value)
			var obj = {
				SurgC_Unique_ID:  this.surgeryUniqueId,
				SurgC_ContactSetting:SurgC_ContactSetting
			}
			console.log(obj)
			// return
			this.UserService.addSurgerySetting(obj).subscribe((data)=>{
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

		this.getUniqueid = item.SCS_Unique_ID
		this.getcreatedAt = item.SCS_Create_Date
		this.form.get('SCS_Name').setValue(item.SCS_Name);
	}

	getRelationList(){
		this.hideShow()
		this.showLoader = true
		$('#nationality').dataTable().fnDestroy();
		var obj = {
			Slug: this.mySlug,
			SurgC_Unique_ID: this.surgeryUniqueId
		}
		this.UserService.getSurgerySetting(obj).subscribe((data)=>{
			console.log(data)
			this.getContactArray = data.Data
			this.getSurgeryName = data.Data.SurgC_DBA_Name
			console.log(this.getContactArray)
			$(document).ready(function() {
				setTimeout(function(){
					$('#nationality').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		console.log(list)

		var obj = {
			SCS_Create_By : list.SCS_Create_By,
			SCS_Create_Date : list.SCS_Create_Date,
			SCS_Is_Active : evt.checked,
			SCS_Modify_Date : new Date(),
			SCS_Contact_Type:  list.SCS_Contact_Type,
			SCS_First_Name : list.SCS_First_Name,
			SCS_Last_Name : list.SCS_Last_Name,
			SCS_Phone_No : list.SCS_Phone_No,
			SCS_Email : list.SCS_Email,
			SCS_Unique_ID : list.SCS_Unique_ID,
			SCS_Create_By_Type : list.SCS_Create_By_Type,
			SCS_User_Name : list.SCS_User_Name,
			SCS_Is_Deleted : list.SCS_Is_Deleted,
			SCS_TimeZone :list.SCS_TimeZone,
			Project_ID  : this.admin.Project_ID,
		}
		var SurgC_ContactSetting =  []
			SurgC_ContactSetting.push(obj)
			var newobj = {
				SurgC_Unique_ID:  this.surgeryUniqueId,
				SurgC_ContactSetting:SurgC_ContactSetting
			}
		console.log(obj)
		this.UserService.updateSurgerySetting(newobj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
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
				$(".hide-from").hide();
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
		$(document).ready(function() {
			setTimeout(function(){
				$('#SCS_deleted_rc').DataTable();
			}, 100);
		} );
		
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
			SCS_Create_By : this.isDelete.SCS_Create_By,
			SCS_Create_Date : this.isDelete.SCS_Create_Date,
			SCS_Is_Active :  this.isDelete.SCS_Is_Active,
			SCS_Modify_Date : new Date(),
			SCS_Contact_Type : this.isDelete.SCS_Contact_Type,
			SCS_First_Name : this.isDelete.SCS_First_Name,
			SCS_Last_Name : this.isDelete.SCS_Last_Name,
			SCS_Phone_No : this.isDelete.SCS_Phone_No,
			SCS_Email : this.isDelete.SCS_Email,
			SCS_Unique_ID : this.isDelete.SCS_Unique_ID,
			SCS_User_Name : this.isDelete.SCS_User_Name,
			SCS_Create_By_Type: this.isDelete.SCS_Create_By_Type,
			SCS_Is_Deleted: true,
			SCS_TimeZone :this.isDelete.SCS_TimeZone,
			Project_ID  : this.admin.Project_ID,
		}
		var SurgC_ContactSetting =  []
			SurgC_ContactSetting.push(obj)
			var newobj = {
				SurgC_Unique_ID:  this.surgeryUniqueId,
				SurgC_ContactSetting:SurgC_ContactSetting
			}

		this.UserService.updateSurgerySetting(newobj).subscribe((data)=>{
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
			SCS_Contact_Type : this.isDelete.SCS_Contact_Type,
			SCS_First_Name : this.isDelete.SCS_First_Name,
			SCS_Last_Name : this.isDelete.SCS_Last_Name,
			SCS_Phone_No : this.isDelete.SCS_Phone_No,
			SCS_Email : this.isDelete.SCS_Email,
			SCS_Create_By : this.isDelete.SCS_Create_By,
			SCS_Create_Date : this.isDelete.SCS_Create_Date,
			SCS_Is_Active :  this.isDelete.SCS_Is_Active,
			SCS_Modify_Date : new Date(),
			SCS_Unique_ID : this.isDelete.SCS_Unique_ID,
			SCS_User_Name : this.isDelete.SCS_User_Name,
			SCS_Create_By_Type: this.isDelete.SCS_Create_By_Type,
			SCS_Is_Deleted: false,
			SCS_TimeZone :this.isDelete.SCS_TimeZone,
			Project_ID  : this.admin.Project_ID,
		}
		var SurgC_ContactSetting =  []
			SurgC_ContactSetting.push(obj)
			var newobj = {
				SurgC_Unique_ID:  this.surgeryUniqueId,
				SurgC_ContactSetting:SurgC_ContactSetting
			}
		this.UserService.updateSurgerySetting(newobj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getRelationDeletedList(){
		$('#SCS_deleted_rc').dataTable().fnDestroy();
		this.showLoader = true
		this.UserService.getSurgerySetting(this.surgeryUniqueId).subscribe((data)=>{
			this.getDeletedSCSArray =data
			$(document).ready(function() {
				setTimeout(function(){
					$('#SCS_deleted_rc').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}