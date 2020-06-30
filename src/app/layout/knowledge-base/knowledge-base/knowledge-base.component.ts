import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
declare var $:any
declare var CKEDITOR:any
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-knowledge-base',
	templateUrl: './knowledge-base.component.html',
	styleUrls: ['./knowledge-base.component.css']
})
export class KnowledgeBaseComponent implements OnInit {

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
	newCKEditor: string = ''
	dropdownList
	selectedItems
	dropdownSettings
	language_option: any=[];
	drophere: any;
	dummyArray
	newSubListArray
	objArrayForSubList
	onDeselectObjArray
	sendCategoryArray
	sendCategoryArrayFinal
	trysomeing
	saveSubCatCheckBox
	getSubCheckedArray
	specilitiesArray
	trysomeingForSpec
	selectedSpecCheckBox
	getSpecCheckedArray
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	config:any = {
		width:980,
		height : 400,
		placeholder : 'some value',
		// extraPlugins: 'divarea',
		toolbar : [
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
		{ name: 'insert', items: [ 'Image'] },
		'/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		]
	}




	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private translate: TranslateService) { 
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
				this.title.setTitle('Knowledge Base - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Knowledge Base - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Knowledge Base - The Cloud Health')
		}
		this.reqData = {}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.subCategorrArray = []
		this.objArrayForSubList = []
		this.selectedItems = []
		this.getUniqueid = ''
		this.dummyArray = []
		this.newSubListArray = []
		this.onDeselectObjArray = []
		this.sendCategoryArray = []
		this.sendCategoryArrayFinal = []
		this.saveSubCatCheckBox = []
		this.getSubCheckedArray = []
		this.specilitiesArray = []
		this.selectedSpecCheckBox = []
		this.getSpecCheckedArray = []
		this.trysomeingForSpec = []
		this.hideShow()
		this.dropdownList  =[]
		this.form = new FormGroup({
			KNB_Category: new FormControl('',),//[Validators.required,]
			KBC_Description: new FormControl('',),
			KBC_Sub_Category: new FormControl(''),
			KNB_Long_Description: new FormControl(''),
		});
		this.form.get('KBC_Sub_Category').setValue('');
		this.reqData = {}
		this.getDataArray = []
		this.getDeletedArrayList = []
		// this.getSubCategoryList()
		this.getSubCategoryList()
		this.getDataList()
		
		
		this.hideShow()
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_SpecilitiesList){
				this.specilitiesArray = this.setAccToSurgery.PhyO_SpecilitiesList
			}else{
				this.specilitiesArray = this.setAccToSurgery.SurgC_SpecilitiesList
			}
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

			$('.multigrp .dropdown-btn').css("padding-left", "20px");
			$('.multigrp .dropdown-btn').css("padding", "9px 12px");
			$('.multigrp .dropdown-btn').css("height", "40px");
			$('.multigrp .dropdown-btn').css("border-radius", "0px");
			// $(".mat-accent .mat-slide-toggle-thumb").css("background-color", '#ffffff!important')
			// var str = str.replace(";", "");
			$(".add-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".view-button").show();
				$(".add-button").hide();
				
			});
		}, 2500);


	}
	onItemSelect(item: any) {
		this.objArrayForSubList.push(item.text)
		this.sendCategoryArrayFinal.push(item.id)
		this.sendCategoryArray.push(item)
		var newobj = {
			KBC_Categories:this.objArrayForSubList,
			Slug:this.mySlug
		}
		console.log(newobj)
		this.UserService.kBSubCategoryListDD(newobj).subscribe((data)=>{
			this.newSubListArray  = data.DataList
		},err=>{
			console.log(err)
		})
	}
	onItemDeSelect(item: any){
		console.log('im in de slect', item)
		var newrr = []
		var newrr1 = []
		for (var i = 0; i < this.objArrayForSubList.length; i++) {
			console.log(this.objArrayForSubList[i])
			if(this.objArrayForSubList[i] != item.text){
				newrr.push(this.objArrayForSubList[i])
			}
		}
		for (var j = 0; j < this.selectedItems.length; j++) {
			if(this.selectedItems[j].text != item.text && this.selectedItems[j].id != item.id){
				// console.log(this.sendCategoryArray[j].text)
				newrr1.push(this.selectedItems[j].id)
			}
		}
		this.sendCategoryArrayFinal = []
		this.sendCategoryArrayFinal = newrr1
		console.log(this.sendCategoryArrayFinal)
		// return
		this.objArrayForSubList =[]
		this.objArrayForSubList =newrr
		var newobj = {
			KBC_Categories:newrr,
			Slug:this.mySlug
		}
		console.log(newobj);	
		// return
		this.UserService.kBSubCategoryListDD(newobj).subscribe((data)=>{
			console.log(data)
			this.newSubListArray  = data.DataList
		},err=>{
			console.log(err)
		})

	}
	addData(){
		console.log(this.selectedItems)
		// return
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update')
			var updateObj:any = {}

			updateObj.KNB_Unique_ID = this.getUniqueid
			updateObj.KNB_Create_Date = this.getcreatedAt
			updateObj.KNB_Is_Active = true
			updateObj.KNB_Created_By = this.admin.UM_Unique_ID
			updateObj.KNB_Create_Date = new Date()
			updateObj.KNB_Modify_Date = new Date()
			updateObj.KNB_Create_By_Type = this.admin.UM_Office_Type
			updateObj.KNB_User_Name = this.admin.UM_Username
			updateObj.KNB_Is_Deleted = false
			updateObj.KNB_TimeZone = this.admin.UM_TimeZone
			updateObj.Project_ID = this.admin.Project_ID
			updateObj.Slug = this.mySlug 
			updateObj.KNB_Long_Description = this.reqData.newCKEditor
			updateObj.KNB_Category= this.sendCategoryArrayFinal
			updateObj.KNB_Sub_Category = this.saveSubCatCheckBox
			updateObj.KNB_Short_Description = this.reqData.KBC_Description
			updateObj.KNB_Name = this.reqData.KNB_Name
			updateObj.KNB_Speciality = this.selectedSpecCheckBox

			this.UserService.updateReference(updateObj).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			var muObj:any = {}
			muObj.KNB_Is_Active = true
			muObj.KNB_Created_By = this.admin.UM_Unique_ID
			muObj.KNB_Create_Date = new Date()
			muObj.KNB_Modify_Date = new Date()
			muObj.KNB_Create_By_Type = this.admin.UM_Office_Type
			muObj.KNB_User_Name = this.admin.UM_Username
			muObj.KNB_Is_Deleted = false
			muObj.KNB_TimeZone = this.admin.UM_TimeZone
			muObj.Project_ID = this.admin.Project_ID
			muObj.Slug = this.mySlug 
			muObj.KNB_Long_Description = this.reqData.newCKEditor
			muObj.KNB_Category= this.sendCategoryArrayFinal
			muObj.KNB_Sub_Category = this.saveSubCatCheckBox
			muObj.KNB_Short_Description = this.reqData.KBC_Description
			muObj.KNB_Name = this.reqData.KNB_Name
			muObj.KNB_Speciality = this.selectedSpecCheckBox
			console.log(muObj)
			this.UserService.KnowledgeBaseCreate(muObj).subscribe((data)=>{
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
		var myNewArr = []
		var putonArray = []
		var specsArray = []
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		for (var i = 0; i < this.drophere.length; i++) {
			for (var j = 0; j < item.KNB_Category.length; j++) {
				if(this.drophere[i].id == item.KNB_Category[j]){
					myNewArr.push({
						id:this.drophere[i].id,
						text:this.drophere[i].text
					})
					putonArray.push(this.drophere[i].text)
				}
			}
		}
		for (var i = 0; i < this.specilitiesArray.length; i++) {
			for (var j = 0; j < item.KNB_Speciality.length; j++) {
				if(this.specilitiesArray[i].Spec_Unique_ID == item.KNB_Speciality[j].SPE_Unique_ID){
					this.trysomeingForSpec.push(this.specilitiesArray[i].Spec_Name)
					specsArray.push({
						SPE_Unique_ID:this.specilitiesArray[i].Spec_Unique_ID,
						SPE_Name:this.specilitiesArray[i].Spec_Name
					})
					// putonArray.push(this.specilitiesArray[i].text)
				}
			}
		}
		console.log(specsArray)
		this.selectedSpecCheckBox = specsArray

		this.getUniqueid = item.KNB_Unique_ID
		this.getcreatedAt = item.KNB_Create_Date
		this.isActiveOrDelete = item.KNB_Is_Active
		this.reqData.KNB_Name = item.KNB_Name
		this.reqData.KBC_Description = item.KNB_Short_Description
		this.reqData.newCKEditor = item.KNB_Long_Description
		this.sendCategoryArrayFinal = item.KNB_Category
		console.log(item.KNB_Category)
		this.selectedItems = myNewArr
		var newOj = {
			KBC_Categories: putonArray,
			Slug:this.mySlug
		}
		console.log(newOj)
		this.UserService.kBSubCategoryListDD(newOj).subscribe((data)=>{
			console.log(data)
			this.newSubListArray  = data.DataList
			if(putonArray){
				this.trysomeing= []
				for (var i = 0; i < data.DataList.length; i++) {	
					for (var j = 0; j < item.KNB_Sub_Category.length; j++) {
						if(data.DataList[i].KBC_Unique_ID == item.KNB_Sub_Category[j]){
							this.trysomeing.push(data.DataList[i].KBC_Sub_Category)
							this.getSubCheckedArray.push(data.DataList[i].KBC_Unique_ID)
						}
					}
				}
				this.saveSubCatCheckBox = this.getSubCheckedArray
			}
		},err=>{
			console.log(err)
		})


	}

	getDataList(){
		$('#addknwlist').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug: this.mySlug ,
		}
		this.UserService.knowlwdgeBaseList(obj).subscribe((data)=>{
			this.getDataArray = data.DataList
			console.log(this.getDataArray)
			this.dtTrigger.next();
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#addknwlist').DataTable();
			// 	}, 100);
			// } );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			Slug: this.mySlug ,
			KNB_TimeZone: list.KNB_TimeZone,
			KNB_Modify_Date: new Date(),
			KNB_Is_Active:evt.checked,
			KNB_Unique_ID:list.KNB_Unique_ID,
		}
		console.log(obj)
		this.UserService.IsActiveKB(obj).subscribe((data)=>{
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
		// $(document).ready(function() {
		// 	setTimeout(function(){
		// 		$('#KBC_deleted_rc').DataTable();
		// 	}, 100);
		// } );

	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
		this.form.reset()
		this.form.get('KBC_Sub_Category').setValue('');
		this.reqData = {}
		this.selectedItems = []
	}
	dataDeleted(data){
		console.log(data)
		this.isDelete = data
		$("#trash").modal("show");
	}
	revertDeleted(data){
		$("#revertDelete").modal("show");
		this.isDelete = data
		// console.log(data)
	}

	isDeletedYes(){

		var obj = {
			Slug: this.mySlug,
			KNB_Is_Deleted: true,
			KNB_Modify_Date: new Date(),
			KNB_TimeZone: this.admin.UM_TimeZone,
			KNB_Unique_ID:this.isDelete.KNB_Unique_ID 

		}

		console.log(obj)
		this.UserService.IsDeletedKB(obj).subscribe((data)=>{
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
			Slug: this.mySlug,
			KNB_Is_Deleted: false,
			KNB_Modify_Date: new Date(),
			KNB_TimeZone: this.admin.UM_TimeZone,
			KNB_Unique_ID:this.isDelete.KNB_Unique_ID
		}
		this.UserService.IsDeletedKB(obj).subscribe((data)=>{
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
		$('#KNB_deleted_rc11').DataTable().destroy();
		var obj = {
			Slug: this.mySlug ,
		}
		this.UserService.getKnowlwdgeBaseDeletedList(obj).subscribe((data)=>{
			console.log(data)
			this.getDeletedArrayList =data.DataList
			this.dtTrigger1.next();
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#KNB_deleted_rc').DataTable();
			// 	}, 100);
			// } );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	getSubCategoryList(){
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'text',
			uniqueId:'uniqueId',
			enableCheckAll:false,
			allowSearchFilter: true
		};
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getKBSubCategoryList(obj).subscribe((data)=>{
			console.log(data)
			this.subCategoryArray =data.DataList
			for (var i = 0; i <this.subCategoryArray.length; i++) {
				this.dummyArray.push({
					id:this.subCategoryArray[i].KBC_Unique_ID,
					text:this.subCategoryArray[i].KBC_Category,
				})
			}
			this.drophere = this.dummyArray
			console.log(this.drophere )
			console.log('koiujhyt',this.selectedItems)

		},err=>{
			console.log(err)
		})
	}
	isSelected(topic){
		if(this.trysomeing){
			return this.trysomeing.indexOf(topic.KBC_Sub_Category) >= 0;

		}
	}
	onChange(category, isChecked: boolean) {
		console.log(this.getSubCheckedArray)
		this.saveSubCatCheckBox = this.getSubCheckedArray
		if(isChecked) {
			if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
			}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
			}else{
				$(".fa-check").css("background-color", 'green!important')
			}
			console.log(category.KBC_Sub_Category)
			this.saveSubCatCheckBox.push(category.KBC_Unique_ID);
		} else {
			var index = this.saveSubCatCheckBox.findIndex(x => x.KBC_Unique_ID == category.KBC_Unique_ID);
			this.saveSubCatCheckBox.splice(index,1);
		}	
		console.log(this.saveSubCatCheckBox)	
	}

	isSelectedSpecs(topic){
		if(this.trysomeingForSpec){
			return this.trysomeingForSpec.indexOf(topic.Spec_Name) >= 0;

		}
	}
	onChangeSpecs(category, isChecked: boolean) {
		console.log(this.getSpecCheckedArray)
		// this.selectedSpecCheckBox = this.getSpecCheckedArray
		if(isChecked) {
			console.log(category.Spec_Name)
			this.selectedSpecCheckBox.push({
				SPE_Unique_ID:category.Spec_Unique_ID,
				SPE_Name:category.Spec_Name
			});
		} else {
			var index = this.selectedSpecCheckBox.findIndex(x => x.Spec_Unique_ID == category.Spec_Unique_ID);
			this.selectedSpecCheckBox.splice(index,1);
		}	
		console.log(this.selectedSpecCheckBox)	
	}
}


