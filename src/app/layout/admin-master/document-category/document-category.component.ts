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
 	selector: 'app-document-category',
 	templateUrl: './document-category.component.html',
 	styleUrls: ['./document-category.component.css']
 })
 export class DocumentCategoryComponent implements OnInit {

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
 		private location: Location, private title: Title, private toster: ToastrService,
 		private translate: TranslateService,) { 
 		this.getPerDetails = []
 		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
 		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
 		if(!this.getPerDetails[0].Is_View){
 			this.location.back()
 		}
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
 				this.title.setTitle('Document Category - ' +  this.setAccToSurgery.PhyO_DBA_Name)
 			}else if(this.setAccToSurgery.SurgC_DBA_Name){
 				this.title.setTitle('Document Category - ' +  this.setAccToSurgery.SurgC_DBA_Name)
 			}
 		}else{
 			this.title.setTitle('Document Category - The Cloud Health')
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
 			DOC_Category: new FormControl('',[Validators.required,]),
 			DOC_Description: new FormControl('',[Validators.required,]),
 			DOC_Sub_Category: new FormControl(''),
 		});
 		// this.form.get('DOC_Sub_Category').setValue('');
 		this.reqData = {}
 		this.getDataArray = []
 		this.getDeletedArrayList = []
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

 		this.getDataList()
 		this.getSubCategoryList()
 		this.hideShow()
 	}

 	addData(){
 		$("#submitbtn").modal("hide");
 		$('body').removeClass('modal-open');
 		if(this.getUniqueid){
 			console.log(';im in update')
 			// this.form.value.DOC_Unique_ID = this.getUniqueid
 			// this.form.value.DOC_Create_Date = this.getcreatedAt
 			// this.form.value.DOC_Created_By = this.admin.UM_Unique_ID
 			// this.form.value.DOC_Modify_Date = new Date()
 			// this.form.value.DOC_Create_By_Type = this.admin.UM_Office_Type
 			// this.form.value.DOC_User_Name = this.admin.UM_Username
 			// this.form.value.DOC_TimeZone = this.admin.UM_TimeZone
 			// this.form.value.Project_ID = this.admin.Project_ID
 			// this.form.value.Slug = this.mySlug 

 			var obj1:any = {}
 			if(this.form.value.DOC_Sub_Category == null || this.form.value.DOC_Sub_Category == undefined
 				|| this.form.value.DOC_Sub_Category == ''){
 				obj1.DOC_Category =  this.form.value.DOC_Category
 		}else{
 			// this.form.value.DOC_Category = this.form.value.DOC_Sub_Category
 			obj1.DOC_Category = this.form.value.DOC_Sub_Category
 			obj1.DOC_Sub_Category =  this.form.value.DOC_Category
 		}
 		obj1.DOC_Unique_ID = this.getUniqueid
 		obj1.DOC_Create_Date = this.getcreatedAt
 		obj1.DOC_Description=  this.form.value.DOC_Description
 		obj1.DOC_Is_Active = true
 		obj1.DOC_Created_By = this.admin.UM_Unique_ID
 		obj1.DOC_Create_Date = new Date()
 		obj1.DOC_Modify_Date = new Date()
 		obj1.DOC_Create_By_Type = this.admin.UM_Office_Type
 		obj1.DOC_User_Name = this.admin.UM_Username
 		obj1.DOC_Is_Deleted = false
 		obj1.DOC_TimeZone = this.admin.UM_TimeZone
 		obj1.Project_ID = this.admin.Project_ID
 		obj1.Slug = this.mySlug 

 		this.UserService.DocumentCatUpdate(obj1).subscribe((data)=>{
 			console.log(data)
 			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
 			this.ngOnInit()
 		},err=>{
 			console.log(err)
 		})
 	}else{
 		var obj:any = {}
 		if(this.form.value.DOC_Sub_Category == null || this.form.value.DOC_Sub_Category == undefined
 			|| this.form.value.DOC_Sub_Category == ''){
 			obj.DOC_Category =  this.form.value.DOC_Category
 	}else{
 		// this.form.value.DOC_Category = this.form.value.DOC_Sub_Category
 		obj.DOC_Category = this.form.value.DOC_Sub_Category
 		obj.DOC_Sub_Category =  this.form.value.DOC_Category
 	}
 	obj.DOC_Description=  this.form.value.DOC_Description
 	obj.DOC_Is_Active = true
 	obj.DOC_Created_By = this.admin.UM_Unique_ID
 	obj.DOC_Create_Date = new Date()
 	obj.DOC_Modify_Date = new Date()
 	obj.DOC_Create_By_Type = this.admin.UM_Office_Type
 	obj.DOC_User_Name = this.admin.UM_Username
 	obj.DOC_Is_Deleted = false
 	obj.DOC_TimeZone = this.admin.UM_TimeZone
 	obj.Project_ID = this.admin.Project_ID
 	obj.Slug = this.mySlug 
 	console.log(obj)
 	this.UserService.DocumentCatCreate(obj).subscribe((data)=>{
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
	this.getUniqueid = item.DOC_Unique_ID
	this.getcreatedAt = item.DOC_Create_Date
	this.isActiveOrDelete = item.DOC_Is_Active
	console.log(item.DOC_Sub_Category)
	this.form.get('DOC_Sub_Category').setValue(item.DOC_Category);
	this.form.get('DOC_Category').setValue(item.DOC_Sub_Category);
	this.form.get('DOC_Description').setValue(item.DOC_Description);
}

getDataList(){
	$('#doctcatgry').DataTable().destroy();
	this.showLoader = true
	var obj = {
		Slug: this.mySlug ,
	}
	this.UserService.DocumentCatList(obj).subscribe((data)=>{
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
		DOC_TimeZone: list.DOC_TimeZone,
		DOC_Modify_Date: new Date(),
		DOC_Is_Active:evt.checked,
		DOC_Unique_ID:list.DOC_Unique_ID,
	}
	console.log(obj)
	this.UserService.DocumentCatIsActive(obj).subscribe((data)=>{
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
	// this.dtTrigger.next();
	
}
goBack(){
	$("#cancelbtn").modal("hide");
	$('body').removeClass('modal-open');
	this.hideShow()
	this.form.reset()
	this.form.get('DOC_Sub_Category').setValue('');
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
		DOC_Modify_Date : new Date(),
		DOC_Category:this.isDelete.DOC_Category,
		DOC_Description:this.isDelete.DOC_Description,
		DOC_Unique_ID : this.isDelete.DOC_Unique_ID,
		DOC_Is_Deleted: true,
		DOC_TimeZone: this.isDelete.DOC_TimeZone,
		Project_ID: this.admin.Project_ID,
		Slug: this.mySlug
		
	}

	console.log(obj)
	this.UserService.DocumentCatIsDeleted(obj).subscribe((data)=>{
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
		DOC_Modify_Date : new Date(),
		DOC_Name : this.isDelete.DOC_Name,
		DOC_Unique_ID : this.isDelete.DOC_Unique_ID,
		DOC_Is_Deleted: false,
		DOC_TimeZone: this.isDelete.DOC_TimeZone,
		Project_ID: this.admin.Project_ID,
		Slug: this.mySlug
	}
	this.UserService.DocumentCatIsDeleted(obj).subscribe((data)=>{
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
	$('#DOCcat_deleted_rc').DataTable().destroy();
	var obj = {
		Slug: this.mySlug ,
	}
	this.UserService.DocumentCatDeletedList(obj).subscribe((data)=>{
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
	this.UserService.DocumentSubCatList(obj).subscribe((data)=>{
		console.log(data)
		this.subCategoryArray =data.DataList
	},err=>{
		console.log(err)
	})
}

}
