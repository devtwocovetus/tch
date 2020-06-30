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
	selector: 'app-kb-category',
	templateUrl: './kb-category.component.html',
	styleUrls: ['./kb-category.component.css']
})
export class KbCategoryComponent implements OnInit {

	reqData
	admin
	getDataArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedArrayList
	isActiveOrDelete
	setAccToSurgery
	mySlug
	subCategorrArray
	hideSubcat:boolean = false
	subCategoryArray = []
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
				this.title.setTitle('KB Category - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('KB Category - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('KB Category - The Cloud Health')
		}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.subCategorrArray = []
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			KBC_Category: new FormControl('',[Validators.required,]),
			KBC_Description: new FormControl('',[Validators.required,]),
			KBC_Sub_Category: new FormControl(''),
		});
		this.form.get('KBC_Sub_Category').setValue('');
		this.reqData = {}
		this.getDataArray = []
		this.getDeletedArrayList = []
		
		this.getDataList()
		this.getSubCategoryList()
		this.hideShow()
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

	addData(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update')
			// this.form.value.KBC_Unique_ID = this.getUniqueid
			// this.form.value.KBC_Create_Date = this.getcreatedAt
			// this.form.value.KBC_Created_By = this.admin.UM_Unique_ID
			// this.form.value.KBC_Modify_Date = new Date()
			// this.form.value.KBC_Create_By_Type = this.admin.UM_Office_Type
			// this.form.value.KBC_User_Name = this.admin.UM_Username
			// this.form.value.KBC_TimeZone = this.admin.UM_TimeZone
			// this.form.value.Project_ID = this.admin.Project_ID
			// this.form.value.Slug = this.mySlug 

			var obj1:any = {}
			if(this.form.value.KBC_Sub_Category == null || this.form.value.KBC_Sub_Category == undefined
				|| this.form.value.KBC_Sub_Category == ''){
				obj1.KBC_Category =  this.form.value.KBC_Category
		}else{
			// this.form.value.KBC_Category = this.form.value.KBC_Sub_Category
			obj1.KBC_Category = this.form.value.KBC_Sub_Category
			obj1.KBC_Sub_Category =  this.form.value.KBC_Category
		}
		obj1.KBC_Unique_ID = this.getUniqueid
		obj1.KBC_Create_Date = this.getcreatedAt
		obj1.KBC_Description=  this.form.value.KBC_Description
		obj1.KBC_Is_Active = true
		obj1.KBC_Created_By = this.admin.UM_Unique_ID
		obj1.KBC_Create_Date = new Date()
		obj1.KBC_Modify_Date = new Date()
		obj1.KBC_Create_By_Type = this.admin.UM_Office_Type
		obj1.KBC_User_Name = this.admin.UM_Username
		obj1.KBC_Is_Deleted = false
		obj1.KBC_TimeZone = this.admin.UM_TimeZone
		obj1.Project_ID = this.admin.Project_ID
		obj1.Slug = this.mySlug 

		this.UserService.KbCategoryUpdate(obj1).subscribe((data)=>{
			console.log(data)
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
	}else{
		var obj:any = {}
		if(this.form.value.KBC_Sub_Category == null || this.form.value.KBC_Sub_Category == undefined
			|| this.form.value.KBC_Sub_Category == ''){
			obj.KBC_Category =  this.form.value.KBC_Category
	}else{
		// this.form.value.KBC_Category = this.form.value.KBC_Sub_Category
		obj.KBC_Category = this.form.value.KBC_Sub_Category
		obj.KBC_Sub_Category =  this.form.value.KBC_Category
	}
	obj.KBC_Description=  this.form.value.KBC_Description
	obj.KBC_Is_Active = true
	obj.KBC_Created_By = this.admin.UM_Unique_ID
	obj.KBC_Create_Date = new Date()
	obj.KBC_Modify_Date = new Date()
	obj.KBC_Create_By_Type = this.admin.UM_Office_Type
	obj.KBC_User_Name = this.admin.UM_Username
	obj.KBC_Is_Deleted = false
	obj.KBC_TimeZone = this.admin.UM_TimeZone
	obj.Project_ID = this.admin.Project_ID
	obj.Slug = this.mySlug 
	console.log(obj)
	this.UserService.KbCategoryCreate(obj).subscribe((data)=>{
		console.log(data)
		this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
		this.ngOnInit()
	},err=>{
		console.log(err)
	})
}

}
editList(item){
	this.hideSubcat = true
	console.log(item)
	$(".edit-button").click(function(){
		$(".add-table").hide();
		$(".hide-from").show();
		$(".add-button").hide();
		$(".edit-data").show();
		$("#again-Back").show();
	});
	this.getUniqueid = item.KBC_Unique_ID
	this.getcreatedAt = item.KBC_Create_Date
	this.isActiveOrDelete = item.KBC_Is_Active
	console.log(item.KBC_Sub_Category)
	this.form.get('KBC_Sub_Category').setValue(item.KBC_Category);
	this.form.get('KBC_Category').setValue(item.KBC_Sub_Category);
	this.form.get('KBC_Description').setValue(item.KBC_Description);
}

getDataList(){
	$('#addaletss').dataTable().fnDestroy();
	this.showLoader = true
	var obj = {
		Slug: this.mySlug ,
	}
	this.UserService.KbCategoryList(obj).subscribe((data)=>{
		console.log(data)
		this.getDataArray = data.DataList
		this.dtTrigger.next();
		this.showLoader = false
	},err=>{
		console.log(err)
	})
}
UpdateStatus(list, evt){
	var obj = {
		Slug: this.mySlug ,
		KBC_TimeZone: list.KBC_TimeZone,
		KBC_Modify_Date: new Date(),
		KBC_Is_Active:evt.checked,
		KBC_Unique_ID:list.KBC_Unique_ID,
	}
	console.log(obj)
	this.UserService.KbCategoryIsActive(obj).subscribe((data)=>{
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
	this.getDeletedList()
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
	this.form.reset()
	this.form.get('KBC_Sub_Category').setValue('');
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
		KBC_Modify_Date : new Date(),
		KBC_Category:this.isDelete.KBC_Category,
		KBC_Description:this.isDelete.KBC_Description,
		KBC_Unique_ID : this.isDelete.KBC_Unique_ID,
		KBC_Is_Deleted: true,
		KBC_TimeZone: this.isDelete.KBC_TimeZone,
		Project_ID: this.admin.Project_ID,
		Slug: this.mySlug
		
	}

	console.log(obj)
	this.UserService.KbCategoryIsDeleted(obj).subscribe((data)=>{
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
		KBC_Modify_Date : new Date(),
		KBC_Name : this.isDelete.KBC_Name,
		KBC_Unique_ID : this.isDelete.KBC_Unique_ID,
		KBC_Is_Deleted: false,
		KBC_TimeZone: this.isDelete.KBC_TimeZone,
		Project_ID: this.admin.Project_ID,
		Slug: this.mySlug
	}
	this.UserService.KbCategoryIsDeleted(obj).subscribe((data)=>{
		console.log(data)
		this.ngOnInit()
	},err=>{
		console.log(err)
	})
	$("#revertDelete").modal("hide");
	$('body').removeClass('modal-open');
}

getDeletedList(){
	this.showLoader = true
	$('#KBC_deleted_rc').dataTable().fnDestroy();
	var obj = {
		Slug: this.mySlug ,
	}
	this.UserService.KbCategoryDeletedList(obj).subscribe((data)=>{
		console.log(data)
		this.getDeletedArrayList =data.DataList
		this.dtTrigger1.next();
		this.showLoader = false
	},err=>{
		console.log(err)
	})
}
getSubCategoryList(){
	var obj = {
		Slug: this.mySlug
	}
	this.UserService.getKBSubCategoryList(obj).subscribe((data)=>{
		console.log(data)
		this.subCategoryArray =data.DataList
	},err=>{
		console.log(err)
	})
}

}


