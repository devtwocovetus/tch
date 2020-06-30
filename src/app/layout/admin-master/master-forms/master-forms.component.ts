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
	selector: 'app-master-forms',
	templateUrl: './master-forms.component.html',
	styleUrls: ['./master-forms.component.css']
})
export class MasterFormsComponent implements OnInit {

	reqData
	admin
	getRaceArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedFormArray
	getPackArray
	Pack_Name
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
				this.title.setTitle('Forms - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Forms - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Forms - The Cloud Health')
		}
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			// Pack_ID: new FormControl(''),
			Pack_Name: new FormControl('', [Validators.required]),
			// Pack_Name: new FormControl(''),
		});
		this.reqData = {}
		this.getRaceArray = []
		this.getPackArray  = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getFormthesiaList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		// this.form.get('Pack_ID').setValue('slctpack');
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
	addFormthesia(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			this.form.value.Pack_Unique_ID = this.getUniqueid
			this.form.value.Pack_Create_Date = this.getcreatedAt
			this.form.value.Pack_Is_Active = true
			this.form.value.Pack_Create_By = this.admin.UM_Unique_ID
			this.form.value.Pack_Modify_Date = new Date()
			this.form.value.Pack_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Pack_User_Name = this.admin.UM_Username
			this.form.value.Pack_Is_Deleted = false
			this.form.value.Pack_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug,
			this.form.value.Pack_Surgery_Physician_Id = this.admin.UM_Surgary_Physician_CenterID,
			this.form.value.Pack_Office_Type =  this.admin.UM_Office_Type

			console.log(';im in update', this.form.value)

			this.UserService.updatePack(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Pack_Is_Active = true
			this.form.value.Pack_Create_By = this.admin.UM_Unique_ID
			this.form.value.Pack_Create_Date = new Date()
			this.form.value.Pack_Modify_Date = new Date()
			this.form.value.Pack_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Pack_User_Name = this.admin.UM_Username
			this.form.value.Pack_Is_Deleted = false
			this.form.value.Pack_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Pack_Created_By= this.admin.UM_Unique_ID,
			this.form.value.Slug = this.mySlug,
			this.form.value.Pack_Surgery_Physician_Id = this.admin.UM_Surgary_Physician_CenterID,
			this.form.value.Pack_Office_Type =  this.admin.UM_Office_Type


			console.log(this.form.value)
			this.UserService.addPack(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editFormthesiaList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		console.log(item)

		this.getUniqueid = item.Pack_Unique_ID
		this.getcreatedAt = item.Pack_Create_Date
		this.form.get('Pack_Name').setValue(item.Pack_Name);

	}

	getFormthesiaList(){
		this.showLoader  =true
		$('#pcktable').dataTable().fnDestroy();
		var obj = {
			Slug: this.mySlug,
			Pack_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID
		}
		this.UserService.getPackList(obj).subscribe((data)=>{
			console.log(data)
			this.getRaceArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			Pack_Is_Active : evt.checked,
			Pack_Modify_Date : new Date(),
			Pack_Unique_ID : list.Pack_Unique_ID,
			Pack_TimeZone:list.Pack_TimeZone,
			Slug: this.mySlug

		}
		console.log(obj)
		this.UserService.updateFromsStatus(obj).subscribe((data)=>{
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
		this.getFormDeletedList()
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

			Pack_Modify_Date : new Date(),
			Pack_Unique_ID : this.isDelete.Pack_Unique_ID,
			Pack_Is_Deleted: true,
			Pack_TimeZone : this.isDelete.Pack_TimeZone,
			Slug: this.mySlug

		}

		this.UserService.deleteFromsStatus(obj).subscribe((data)=>{
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
			Pack_Modify_Date : new Date(),
			Pack_Unique_ID : this.isDelete.Pack_Unique_ID,
			Pack_Is_Deleted: false,
			Pack_TimeZone : this.isDelete.Pack_TimeZone,
			Slug: this.mySlug

		}
		this.UserService.deleteFromsStatus(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getFormDeletedList(){
		this.showLoader = true
		$('#Pack_deleted_rc').dataTable().fnDestroy();
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getPackDeletedList(obj).subscribe((data)=>{
			this.getDeletedFormArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	

}
