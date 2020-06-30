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
	selector: 'app-master-procedure',
	templateUrl: './master-procedure.component.html',
	styleUrls: ['./master-procedure.component.css']
})
export class MasterProcedureComponent implements OnInit {

	reqData
	admin
	getRaceArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedProArray
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
				this.title.setTitle('Procedure - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Procedure - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Procedure - The Cloud Health')
		}
		this.hideShow()
		this.form = new FormGroup({
			Pro_Procedure_Code_Category: new FormControl('',[Validators.required]),
			Pro_Name: new FormControl('',[Validators.required]),
			Pro_Description: new FormControl('',[Validators.required]),
		});
		this.reqData = {}
		this.getRaceArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getProthesiaList()
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
	addProthesia(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update', this.form.value)
			this.form.value.Pro_Unique_ID = this.getUniqueid
			this.form.value.Pro_Create_Date = this.getcreatedAt
			this.form.value.Pro_Is_Active = true
			this.form.value.Pro_Create_By = this.admin.UM_Unique_ID
			this.form.value.Pro_Modify_Date = new Date()
			this.form.value.Pro_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Pro_User_Name = this.admin.UM_Username
			this.form.value.Pro_Is_Deleted = false
			this.form.value.Pro_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug

			this.UserService.updateProcedures(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Pro_Is_Active = true
			this.form.value.Pro_Create_By = this.admin.UM_Unique_ID
			this.form.value.Pro_Create_Date = new Date()
			this.form.value.Pro_Modify_Date = new Date()
			this.form.value.Pro_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Pro_User_Name = this.admin.UM_Username
			this.form.value.Pro_Is_Deleted = false
			this.form.value.Pro_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			console.log(this.form.value)
			this.UserService.addProcedures(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editProthesiaList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		console.log(item)

		this.getUniqueid = item.Pro_Unique_ID
		this.getcreatedAt = item.Pro_Create_Date
		this.form.get('Pro_Name').setValue(item.Pro_Name);
		this.form.get('Pro_Description').setValue(item.Pro_Description);
		this.form.get('Pro_Procedure_Code_Category').setValue(item.Pro_Procedure_Code_Category)

	}

	getProthesiaList(){
		this.showLoader  =true
		var obj = {
			Slug: this.mySlug
		}
		$('#mstrprcdr').DataTable().destroy();
		this.UserService.getProceduresList(obj).subscribe((data)=>{
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
			Pro_Create_By : list.Pro_Create_By,
			Pro_Create_Date : list.Pro_Create_Date,
			Pro_Is_Active : evt.checked,
			Pro_Modify_Date : new Date(),
			Pro_Name : list.Pro_Name,
			Pro_Description : list.Pro_Description,
			Pro_Unique_ID : list.Pro_Unique_ID,
			Pro_Create_By_Type: list.Pro_Create_By_Type,
			Pro_User_Name: list.Pro_User_Name,
			Pro_Is_Deleted: list.Pro_Is_Deleted,
			Pro_TimeZone:list.Pro_TimeZone,
			Project_ID  : this.admin.Project_ID,
			Slug: this.mySlug,
		}
		console.log(obj)
		this.UserService.proceduresIsActive(obj).subscribe((data)=>{
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
		this.getProDeletedList()
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
			Pro_Modify_Date : new Date(),
			Pro_Unique_ID : this.isDelete.Pro_Unique_ID,
			Pro_Is_Deleted: true,
			Pro_TimeZone : this.isDelete.Pro_TimeZone,
			Project_ID  : this.admin.Project_ID,
			Slug: this.mySlug
		}

		this.UserService.proceduresIsDelete(obj).subscribe((data)=>{
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
			Pro_Modify_Date : new Date(),
			Pro_Unique_ID : this.isDelete.Pro_Unique_ID,
			Pro_Is_Deleted: false,
			Pro_TimeZone : this.isDelete.Pro_TimeZone,
			Project_ID  : this.admin.Project_ID,
			Slug: this.mySlug

		}
		this.UserService.proceduresIsDelete(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getProDeletedList(){
		this.showLoader = true
		$('#Pro_deleted_rc').DataTable().destroy();
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getProceduresDeletedList(obj).subscribe((data)=>{
			this.getDeletedProArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}
