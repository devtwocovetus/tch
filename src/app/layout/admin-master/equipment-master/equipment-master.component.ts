import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-equipment-master',
	templateUrl: './equipment-master.component.html',
	styleUrls: ['./equipment-master.component.css']
})
export class EquipmentMasterComponent implements OnInit {
	equipment
	admin
	getEquiListArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedEquipArray
	estDate
	setAccToSurgery
	mySlug
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService, private translate: TranslateService,) { 
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
				this.title.setTitle('Equipment - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Equipment - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Equipment - The Cloud Health')
		}
		// this.estDate
		this.getUniqueid = ''
		
		this.hideShow()
		this.form = new FormGroup({
			Equip_Name: new FormControl('',[Validators.required]),
			// Equip_Type: new FormControl('',[Validators.required ,  Validators.pattern('^[^]+[a-zA-Z ]*')]),
			Equip_Description: new FormControl('',[Validators.required]),
		});
		this.getEquiListArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.equipment = {}
		this.getEquipmentList()
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

	submitEquipment (){
		$("#submitbtn").modal("hide");
		if(this.getUniqueid){
			console.log('im in update', this.equipment)
			this.form.value.Equip_Unique_ID = this.getUniqueid
			this.form.value.Equip_Is_Active =true
			this.form.value.Equip_Create_By = this.admin.UM_Unique_ID
			this.form.value.Equip_User_ID = this.admin.UM_Unique_ID
			this.form.value.Equip_Modify_Date = this.ConvertDate(new Date)
			this.form.value.Equip_Create_Date =this.getcreatedAt
			this.form.value.Equip_Surgery_Physician_Id = this.admin.UM_Unique_ID
			this.form.value.Equip_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Equip_User_Name = this.admin.UM_Username
			this.form.value.Equip_Is_Deleted = false
			this.form.value.Equip_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.updateEquipment(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			console.log('im in create')
			this.form.value.Equip_Create_By = this.admin.UM_Unique_ID
			this.form.value.Equip_User_ID = this.admin.UM_Unique_ID
			this.form.value.Equip_Create_Date = this.ConvertDate(new Date)
			this.form.value.Equip_Modify_Date = this.ConvertDate(new Date)
			this.form.value.Equip_Surgery_Physician_Id = this.admin.UM_Unique_ID
			this.form.value.Equip_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Equip_User_Name = this.admin.UM_Username
			this.form.value.Equip_Is_Active =true
			this.form.value.Equip_Is_Deleted = false
			this.form.value.Equip_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			console.log(this.form.value)
			this.UserService.addEquipment(this.form.value).subscribe((data)=>{
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				console.log(data)
				this.ngOnInit()
			},err=>{
				console.log(err)
			})	
		}

	}
	getEquipmentList(){
		$('#getEqupmnt').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getEquipmentList(obj).subscribe((data)=>{
			console.log(data)
			this.getEquiListArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
			
		},err=>{
			console.log(err)
		})
	}
	editEquipmentList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		console.log("aa")
		console.log(item)
		this.getUniqueid = item.Equip_Unique_ID
		this.getcreatedAt = item.Equip_Create_Date
		this.form.get('Equip_Name').setValue(item.Equip_Name);
		// this.form.get('Equip_Type' ).setValue(item.Equip_Type);
		this.form.get('Equip_Description').setValue(item.Equip_Description);
	}

	UpdateStatus(list, evt){
		var obj = {
			Equip_Is_Active : evt.checked,
			Equip_Modify_Date : new Date(),
			Equip_Unique_ID : list.Equip_Unique_ID,
			Equip_TimeZone:list.Equip_TimeZone,
			Slug: this.mySlug,
		}
		console.log(obj)
		// this.showLoader  = true
		this.UserService.equipmentIsActive(obj).subscribe((data)=>{
			console.log(data)
			// this.showLoader = false
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
		this.getEquipDeletedList()
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

			Equip_Modify_Date : new Date(),
			Equip_Unique_ID : this.isDelete.Equip_Unique_ID,
			Equip_Is_Deleted: true,
			Equip_TimeZone:this.isDelete.Equip_TimeZone,
			Slug: this.mySlug,
		}

		this.UserService.equipmentIsDeleted(obj).subscribe((data)=>{
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
			Equip_Modify_Date : new Date(),
			Equip_Unique_ID : this.isDelete.Equip_Unique_ID,
			Equip_Is_Deleted: false,
			Equip_TimeZone:this.isDelete.Equip_TimeZone,
			Slug: this.mySlug,
		}
		this.UserService.equipmentIsDeleted(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getEquipDeletedList(){
		this.showLoader = true
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getEquipDeletedList(obj).subscribe((data)=>{
			this.getDeletedEquipArray =data.DataList
			$('#Equip_deleted_rc').DataTable().destroy();
			this.dtTrigger1.next();
			$(document).ready(function() {
				
				$('#Equip_deleted_rc').on('draw.dt', function() {
					$('.ui-button.ui-state-disabled').each(function() {
						$(this).css("background", "blue");
					})
				});
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	ConvertDate(date)
	{
		return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	}
	estFunction(date){
		console.log(date)
		var nwq = new Date(date)
		return nwq.getFullYear()+ "-" + nwq.getMonth()+ "-" + nwq.getDate()+ " , " +  nwq.getHours()+ " : " + nwq.getMinutes()
	}
	reset(){
		this.form.reset()
	}

}
