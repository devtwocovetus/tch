
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-language-phrase',
	templateUrl: './language-phrase.component.html',
	styleUrls: ['./language-phrase.component.css']
})
export class LanguagePhraseComponent implements OnInit {
	getQueryStringID
	reqData:any = []
	totalTr = new Array(5)
	admin
	getEthinicityArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedEthinicityArray
	activeClass
	myArr:any
	setAccToSurgery
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private translate: TranslateService) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getQueryStringID = route.snapshot.params.id;
	}

	ngOnInit() {
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Language Phrase - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Language Phrase - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Language Phrase - The Cloud Health')
		}
		this.totalTr.length = 5
		console.log(this.totalTr.length)
		// this.totalTr = [1]
		// this.reqData = {}
		this.reqData = []
		this.reqData[0] = ""	
		this.activeClass = 'General'
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Ethi_Name: new FormControl('',),
			
		});
		this.getEthinicityArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		// this.getEthinicityList()
		console.log(typeof this.reqData)
	}

	addEthincity(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update')
			this.form.value.Ethi_Unique_ID = this.getUniqueid
			this.form.value.Ethi_Is_Active = true
			this.form.value.Ethi_Create_By = this.admin.UM_Unique_ID
			this.form.value.Ethi_Create_Date = this.getcreatedAt
			this.form.value.Ethi_Modify_Date = new Date()
			this.form.value.Ethi_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Ethi_User_Name = this.admin.UM_Username
			this.form.value.Ethi_Is_Deleted = false
			this.form.value.Ethi_TimeZone = this.admin.UM_TimeZone
			this.UserService.updateEthinicity(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Ethi_Is_Active = true
			this.form.value.Ethi_Create_By = this.admin.UM_Unique_ID
			this.form.value.Ethi_Create_Date = new Date()
			this.form.value.Ethi_Modify_Date = new Date()
			this.form.value.Ethi_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Ethi_User_Name = this.admin.UM_Username
			this.form.value.Ethi_Is_Deleted = false
			this.form.value.Ethi_TimeZone = this.admin.UM_TimeZone
			this.UserService.addEthinicity(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editEthinicityList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		this.getUniqueid = item.Ethi_Unique_ID
		this.getcreatedAt = item.Ethi_Create_Date
		this.form.get('Ethi_Name').setValue(item.Ethi_Name);
		this.form.get('Ethi_Type' ).setValue(item.Ethi_Type)
	}

	// getEthinicityList(){
	// 	this.showLoader = true
	// 	this.UserService.getEthinicityList().subscribe((data)=>{
	// 		console.log(data)
	// 		this.getEthinicityArray = data.DataList
	// 		$(document).ready(function() {
	// 			setTimeout(function(){
	// 				$('#Ethitable').DataTable();
	// 			}, 100);
	// 		} );
	// 		this.showLoader  = false
	// 	},err=>{
	// 		console.log(err)
	// 	})
	// }
	UpdateStatus(list, evt){
		var obj = {
			Ethi_Create_By : list.Ethi_Create_By,
			Ethi_Create_Date : list.Ethi_Create_Date,
			Ethi_Is_Active : evt.checked,
			Ethi_Modify_Date : new Date(),
			Ethi_Surgery_Physician_Id : list.Ethi_Surgery_Physician_Id,
			Ethi_Name : list.Ethi_Name,
			Ethi_Type : list.Ethi_Type,
			Ethi_Unique_ID : list.Ethi_Unique_ID,
			Ethi_Create_By_Type: list.Ethi_Create_By_Type,
			Ethi_User_Name: list.Ethi_User_Name,
			Ethi_TimeZone:list.Ethi_TimeZone,
			Ethi_Is_Deleted: list.Ethi_Is_Deleted,
		}
		console.log(obj)
		// this.showLoader = true
		this.UserService.updateEthinicity(obj).subscribe((data)=>{
			console.log(data)
			// this.showLoader  = false
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
		// this.GetDeletedEthinicityList()
		$('#Ethi_deleted_rc').dataTable().fnDestroy();
		$(".view-delete-button").show();
		$(".hide-from").hide();
		$(".view-button").hide();
		$(".add-table").hide();
		$(".add-button").hide();
		$(".view-deleted").show();
		$("#again-Back").show();
		$(document).ready(function() {
			setTimeout(function(){
				$('#Ethi_deleted_rc').DataTable();
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
			Ethi_Create_By : this.isDelete.Ethi_Create_By,
			Ethi_Create_Date : this.isDelete.Ethi_Create_Date,
			Ethi_Is_Active :  this.isDelete.Ethi_Is_Active,
			Ethi_Modify_Date : new Date(),
			Ethi_Name : this.isDelete.Ethi_Name,
			Ethi_Type : this.isDelete.Ethi_Type,
			Ethi_Unique_ID : this.isDelete.Ethi_Unique_ID,
			Ethi_User_Name : this.isDelete.Ethi_User_Name,
			Ethi_Create_By_Type: this.isDelete.Ethi_Create_By_Type,
			Ethi_TimeZone: this.isDelete.Ethi_TimeZone,
			Ethi_Is_Deleted: true
		}

		this.UserService.updateEthinicity(obj).subscribe((data)=>{
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
			Ethi_Name : this.isDelete.Ethi_Name,
			Ethi_Create_By : this.isDelete.Ethi_Create_By,
			Ethi_Create_Date : this.isDelete.Ethi_Create_Date,
			Ethi_Is_Active :  this.isDelete.Ethi_Is_Active,
			Ethi_Modify_Date : new Date(),
			Ethi_Type : this.isDelete.Ethi_Type,
			Ethi_Unique_ID : this.isDelete.Ethi_Unique_ID,
			Ethi_User_Name : this.isDelete.Ethi_User_Name,
			Ethi_Create_By_Type: this.isDelete.Ethi_Create_By_Type,
			Ethi_TimeZone: this.isDelete.Ethi_TimeZone,
			Ethi_Is_Deleted: false
		}
		this.UserService.updateEthinicity(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	// GetDeletedEthinicityList(){
	// 	this.showLoader = true
	// 	this.UserService.GetDeletedEthinicityList().subscribe((data)=>{
	// 		this.getDeletedEthinicityArray =data.DataList
	// 		$(document).ready(function() {
	// 			setTimeout(function(){
	// 				$('#Ethi_deleted_rc').DataTable();
	// 			}, 100);
	// 		} );
	// 		this.showLoader = false
	// 	},err=>{
	// 		console.log(err)
	// 	})
	// }
	getActiveClass(data){
		console.log(data)
		this.activeClass = data
	}
	addRow() {
		this.totalTr.push(5)
		this.totalTr.length +=4
		console.log(this.totalTr.length)
		// this.reqData[this.totalTr.length - 1] = ""
	}
	removeRow(i) {
		if (this.totalTr.length == 1) {
			this.totalTr = []
			this.totalTr.push(1)
			this.reqData[0] = ""
			this.myArr[0]= ""
		} else {
			this.totalTr.splice(i, 1)
			this.reqData.splice(i, 1) // = ""

		}

	}

}

