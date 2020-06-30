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
		selector: 'app-religion-master',
		templateUrl: './religion-master.component.html',
		styleUrls: ['./religion-master.component.css']
	})
	export class ReligionMasterComponent implements OnInit {

		reqData
		admin
		getReligionArray
		getUniqueid
		form
		getcreatedAt
		showLoader
		isDelete
		getDeletedReligionArray
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
					this.title.setTitle('Religion - ' +  this.setAccToSurgery.PhyO_DBA_Name)
				}else if(this.setAccToSurgery.SurgC_DBA_Name){
					this.title.setTitle('Religion - ' +  this.setAccToSurgery.SurgC_DBA_Name)
				}
			}else{
				this.title.setTitle('Religion - The Cloud Health')
			}
			this.getUniqueid = ''
			this.getDeletedReligionArray = []
			this.isDelete = {}
			this.form = new FormGroup({
				Reli_Name: new FormControl('',[Validators.required]),
			});
			this.hideShow()
			this.reqData = {}
			this.getReligionArray = []
			this.admin = JSON.parse(localStorage.getItem('loginData'))
			this.getReligionList()
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

		addReligion(){
			$("#submitbtn").modal("hide");
			$('body').removeClass('modal-open');
			if(this.getUniqueid){
				console.log(';im in update', this.form.value)
				this.form.value.Reli_Unique_ID = this.getUniqueid
				this.form.value.Reli_Create_Date = this.getcreatedAt
				this.form.value.Reli_Is_Active = true
				this.form.value.Reli_Create_By = this.admin.UM_Unique_ID
				this.form.value.Reli_Create_By_Type = this.admin.UM_Office_Type
				this.form.value.Reli_User_Name = this.admin.UM_Username
				this.form.value.Reli_Modify_Date = new Date()
				this.form.value.Reli_Is_Deleted = false
				this.form.value.Reli_TimeZone = this.admin.UM_TimeZone
				this.form.value.Project_ID  = this.admin.Project_ID
				this.form.value.Slug = this.mySlug

				this.UserService.updateReligion(this.form.value).subscribe((data)=>{
					console.log(data)
					this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
					$('body').removeClass('modal-backdrop fade in');
					this.ngOnInit()
				},err=>{
					console.log(err)
				})
			}else{
				this.form.value.Reli_Is_Active = true
				this.form.value.Reli_Create_By = this.admin.UM_Unique_ID
				this.form.value.Reli_User_Name = this.admin.UM_Username
				this.form.value.Reli_Create_By_Type = this.admin.UM_Office_Type
				this.form.value.Reli_Create_Date = new Date()
				this.form.value.Reli_Modify_Date = new Date()
				this.form.value.Reli_Is_Deleted = false
				this.form.value.Reli_TimeZone = this.admin.UM_TimeZone
				this.form.value.Project_ID  = this.admin.Project_ID
				this.form.value.Slug = this.mySlug

				this.UserService.addReligion(this.form.value).subscribe((data)=>{
					console.log(data)
					this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
					$('body').removeClass('modal-backdrop fade in');
					this.ngOnInit()
				},err=>{
					console.log(err)
				})
			}

		}
		editReligionList(item){
			$(".edit-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".add-button").hide();
				$(".edit-data").show();
				$("#again-Back").show();
			});
			this.getUniqueid = item.Reli_Unique_ID
			this.getcreatedAt = item.Reli_Create_Date
			this.form.get('Reli_Name').setValue(item.Reli_Name);

		}
		GetReligionDeletedList(){
			$('#relitableDel').DataTable().destroy();
			this.showLoader = true
			var obj = {
				Slug: this.mySlug
			}
			this.UserService.getReligionDeletedList(obj).subscribe((data)=>{
				this.getDeletedReligionArray =data.DataList
				this.dtTrigger1.next();
				this.showLoader = false
			},err=>{
				console.log(err)
			})
		}

		getReligionList(){
			this.showLoader = true
			var obj = {
				Slug: this.mySlug
			}
			$('#relitable_new').DataTable().destroy();
			this.UserService.getReligionList(obj).subscribe((data)=>{
				this.getReligionArray = data.DataList
				this.dtTrigger.next();
				this.showLoader = false
			},err=>{
				console.log(err)
			})
		}
		//getDeletedReligionArray
		UpdateStatus(list, evt){
			var obj = {
				Reli_Create_By : list.Reli_Create_By,
				Reli_Create_Date : list.Reli_Create_Date,
				Reli_Is_Active : evt.checked,
				Reli_Modify_Date : new Date(),
				Reli_Name : list.Reli_Name,
				Reli_Unique_ID : list.Reli_Unique_ID,
				Reli_User_Name : list.Reli_User_Name,
				Reli_Create_By_Type: list.Reli_Create_By_Type,
				Reli_Is_Deleted: list.Reli_Is_Deleted,
				Reli_TimeZone:list.Reli_TimeZone,
				Project_ID  : this.admin.Project_ID,
				Slug: this.mySlug

			}
			console.log(obj)
			this.UserService.religionIsActive(obj).subscribe((data)=>{
				console.log(data)
				// this.ngOnInit()
			},err=>{
				console.log(err)
			})
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
				Reli_Create_By : this.isDelete.Reli_Create_By,
				Reli_Create_Date : this.isDelete.Reli_Create_Date,
				Reli_Is_Active :  this.isDelete.Reli_Is_Active,
				Reli_Modify_Date : new Date(),
				Reli_Name : this.isDelete.Reli_Name,
				Reli_Unique_ID : this.isDelete.Reli_Unique_ID,
				Reli_User_Name : this.isDelete.Reli_User_Name,
				Reli_Create_By_Type: this.isDelete.Reli_Create_By_Type,
				Reli_Is_Deleted: true,
				Reli_TimeZone: this.isDelete.Reli_TimeZone,
				Project_ID  : this.admin.Project_ID,
				Slug: this.mySlug

			}

			this.UserService.religionIsDelete(obj).subscribe((data)=>{
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
				Reli_Create_By : this.isDelete.Reli_Create_By,
				Reli_Create_Date : this.isDelete.Reli_Create_Date,
				Reli_Is_Active :  this.isDelete.Reli_Is_Active,
				Reli_Modify_Date : new Date(),
				Reli_Name : this.isDelete.Reli_Name,
				Reli_Unique_ID : this.isDelete.Reli_Unique_ID,
				Reli_User_Name : this.isDelete.Reli_User_Name,
				Reli_Create_By_Type: this.isDelete.Reli_Create_By_Type,
				Reli_Is_Deleted: false,
				Reli_TimeZone: this.isDelete.Reli_TimeZone,
				Project_ID  : this.admin.Project_ID,
				Slug: this.mySlug

			}
			this.UserService.religionIsDelete(obj).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
			$("#revertDelete").modal("hide");
			$('body').removeClass('modal-open');
		}
		goBack(){
			$("#cancelbtn").modal("hide");
			$('body').removeClass('modal-open');
			this.hideShow()
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
			$('#reli_deleted_rc').DataTable().destroy();
			this.GetReligionDeletedList()
			$(".view-delete-button").show();
			$(".hide-from").hide();
			$(".view-button").hide();
			$(".add-table").hide();
			$(".add-button").hide();
			$(".view-deleted").show();
			$("#again-Back").show();
			
		}

	}
