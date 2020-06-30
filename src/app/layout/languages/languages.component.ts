import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare var $:any
@Component({
	selector: 'app-languages',
	templateUrl: './languages.component.html',
	styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

	reqData
	admin
	getLanguageArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	getQueryStringLang
	isDelete
	getDeletedLangArray
	setAccToSurgery
	mySlug
	getPerDetails
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private translate: TranslateService) { 
	}

	ngOnInit() {
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
			Loc_Resource_ID : new FormControl('',[Validators.required]),
			Loc_Value : new FormControl('',[Validators.required]),
			Loc_Language_Shortname : new FormControl('',[Validators.required]),
			Loc_Resource_Type : new FormControl('',[Validators.required]),
		});
		this.reqData = {}
		this.getLanguageArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		// this.getQueryStringLang = this.route.snapshot.queryParamMap.get('lang');
		// console.log(this.getQueryStringLang)
		this.getLanguageList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
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
			this.form.value.Loc_Unique_ID = this.getUniqueid
			this.form.value.Loc_Create_Date = this.getcreatedAt
			this.form.value.Loc_Is_Active = true
			this.form.value.Loc_Create_By = this.admin.UM_Unique_ID
			this.form.value.Loc_Modify_Date = new Date()
			this.form.value.Loc_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Loc_User_Name = this.admin.UM_Username
			this.form.value.Loc_Is_Deleted = false
			this.form.value.Loc_TimeZone = this.admin.UM_TimeZone
			this.UserService.updateMultiLang(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Loc_Create_Date = new Date()
			this.form.value.Loc_Is_Active = true
			this.form.value.Loc_Create_By = this.admin.UM_Unique_ID
			this.form.value.Loc_Modify_Date = new Date()
			this.form.value.Loc_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Loc_User_Name = this.admin.UM_Username
			this.form.value.Loc_Is_Deleted = false
			this.form.value.Loc_TimeZone = this.admin.UM_TimeZone

			this.form.value.Slug = this.mySlug
			this.UserService.addMultiLang(this.form.value).subscribe((data)=>{
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

		this.getUniqueid = item.Loc_Unique_ID
		this.getcreatedAt = item.Loc_Create_Date
		// this.form.get('Lang_Name').setValue(item.Lang_Name);
		this.form.get('Loc_Resource_ID').setValue(item.Loc_Resource_ID)
		this.form.get('Loc_Value').setValue(item.Loc_Value)
		this.form.get('Loc_Language_Shortname').setValue(item.Loc_Language_Shortname)
		this.form.get('Loc_Resource_Type').setValue(item.Loc_Resource_Type)
		// this.form.get('Lang_Shotname' ).setValue(item.Lang_Shotname);
	}

	getLanguageList(){
		
		this.showLoader = true
		var obj = {
			Slug: ''
		}
		$('#multlanghye').dataTable().fnDestroy();
		this.UserService.multiLangList(obj).subscribe((data)=>{
			console.log(data)
			this.getLanguageArray = data.DataList
			$(document).ready(function() {
				setTimeout(function(){
					$('#multlanghye').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {
			Loc_Unique_ID:list.LOC_Unique_ID,
			Loc_Is_Active: evt.checked,
			Loc_Modify_Date: new Date(),
			Loc_TimeZone:list.Lang_TimeZone,
			Slug: list.Slug
		}
		console.log(obj)
		this.UserService.IsActiveMultiLang(obj).subscribe((data)=>{
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
		$(document).ready(function() {
			setTimeout(function(){
				$('#Lang_deleted_rc').DataTable();
			}, 100);
		} );
		
	}
	goBack(){
		this.form.reset()
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
			Loc_Unique_ID:this.isDelete.LOC_Unique_ID,
			Loc_Is_Deleted: true,
			Loc_Modify_Date: new Date(),
			Loc_TimeZone:this.isDelete.Lang_TimeZone,
			Slug: this.isDelete.Slug
		}

		this.UserService.IsDeleteMultiLang(obj).subscribe((data)=>{
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
			Loc_Unique_ID:this.isDelete.LOC_Unique_ID,
			Loc_Is_Deleted: false,
			Loc_Modify_Date: new Date(),
			Loc_TimeZone:this.isDelete.Lang_TimeZone,
			Slug: this.isDelete.Slug
		}
		this.UserService.IsDeleteMultiLang(obj).subscribe((data)=>{
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
		var obj = {
			Slug: this.mySlug
		}
		$('#Lang_deleted_rc').dataTable().fnDestroy();
		this.UserService.getLanguageDeletedList(obj).subscribe((data)=>{
			this.getDeletedLangArray =data.DataList
			$(document).ready(function() {
				setTimeout(function(){
					$('#Lang_deleted_rc').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	showPhrases(data){
		// $(".icofont-speech-comments").click(function(){
			$(".view-phrases").show();
			$( ".view-list-language" ).show();
			$( ".hide-from" ).hide();
			$(".view-button").hide();
			$(".add-table").hide();
			$(".add-button").hide();
			// });
			this.router.navigate(['/languages'], { queryParams: { lang:data.Lang_Name } });
		}

	}

