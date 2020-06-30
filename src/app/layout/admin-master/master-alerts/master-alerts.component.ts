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
	selector: 'app-master-alerts',
	templateUrl: './master-alerts.component.html',
	styleUrls: ['./master-alerts.component.css']
})
export class MasterAlertsComponent implements OnInit {

	reqData
	admin
	getAlertArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedAlertArray
	isActiveOrDelete
	setAccToSurgery
	slug	
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
				this.title.setTitle('Alerts - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Alerts - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Alerts - The Cloud Health')
		}
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Alert_Name: new FormControl('',[Validators.required,]),
			// Alert_Shotname: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
		});
		this.reqData = {}
		this.getAlertArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getAlertList()
		if(this.admin.UM_Office_Type == 'P'){
			this.slug = this.admin.UM_Slug_PO
		}else{
			this.slug = this.admin.UM_Slug_SC
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

	addAlert(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){

			console.log(';im in update')
			this.form.value.Alert_Unique_ID = this.getUniqueid
			this.form.value.Alert_Create_Date = this.getcreatedAt
			this.form.value.Alert_Is_Active = this.isActiveOrDelete
			this.form.value.Alert_Create_By = this.admin.UM_Unique_ID
			this.form.value.Alert_Modify_Date = new Date()
			this.form.value.Alert_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Alert_User_Name = this.admin.UM_Username
			this.form.value.Alert_Is_Deleted = false
			this.form.value.Alert_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.slug 

			this.UserService.updateAlert(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{

			this.form.value.Alert_Is_Active = true
			this.form.value.Alert_Create_By = this.admin.UM_Unique_ID
			this.form.value.Alert_Create_Date = new Date()
			this.form.value.Alert_Modify_Date = new Date()
			this.form.value.Alert_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Alert_User_Name = this.admin.UM_Username
			this.form.value.Alert_Is_Deleted = false
			this.form.value.Alert_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.slug 
			this.form.value.Alert_Surgery_Physician_Id = this.admin.UM_Surgary_Physician_CenterID
			this.form.value.Alert_Office_Type =this.admin.UM_Office_Type
			this.UserService.addAlert(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editAlertList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.Alert_Unique_ID
		this.getcreatedAt = item.Alert_Create_Date
		this.isActiveOrDelete = item.Alert_Is_Active
		this.form.get('Alert_Name').setValue(item.Alert_Name);
		// this.form.get('Alert_Shotname' ).setValue(item.Alert_Shotname);
	}

	getAlertList(){
		$('#addaletss').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug: this.slug ,
			Alert_Create_By:this.admin.UM_Unique_ID
		}
		this.UserService.getAlertList(obj).subscribe((data)=>{
			console.log(data)
			this.getAlertArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			Slug: this.slug ,
			Alert_TimeZone: list.Alert_TimeZone,
			Alert_Modify_Date: new Date(),
			Alert_Is_Active:evt.checked,
			Alert_Unique_ID:list.Alert_Unique_ID,
		}
		console.log(obj)
		this.UserService.alertIsActive(obj).subscribe((data)=>{
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
		this.getAlertDeletedList()
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
		this.isDelete = data
	}
	revertDeleted(data){
		$("#revertDelete").modal("show");
		// console.log(data)
		this.isDelete = data
	}

	isDeletedYes(){
		
		var obj = {
			Alert_Modify_Date : new Date(),
			Alert_Name : this.isDelete.Alert_Name,
			Alert_Unique_ID : this.isDelete.Alert_Unique_ID,
			Alert_Is_Deleted: true,
			Alert_TimeZone: this.isDelete.Alert_TimeZone,
			Project_ID: this.admin.Project_ID,
			Slug: this.slug
			
		}

		console.log(obj)
		this.UserService.alertIsDelete(obj).subscribe((data)=>{
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
			Alert_Modify_Date : new Date(),
			Alert_Name : this.isDelete.Alert_Name,
			Alert_Unique_ID : this.isDelete.Alert_Unique_ID,
			Alert_Is_Deleted: false,
			Alert_TimeZone: this.isDelete.Alert_TimeZone,
			Project_ID: this.admin.Project_ID,
			Slug: this.slug
		}
		this.UserService.alertIsDelete(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getAlertDeletedList(){
		this.showLoader = true
		$('#Alert_deleted_rc').DataTable().destroy();
		var obj = {
			Slug: this.slug ,
			Alert_Create_By:this.admin.UM_Unique_ID
		}
		this.UserService.getAlertDeletedList(obj).subscribe((data)=>{
			this.getDeletedAlertArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}


