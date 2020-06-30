import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import {environment1} from '../../../../environments/environment.prod';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-kb-reference',
	templateUrl: './kb-reference.component.html',
	styleUrls: ['./kb-reference.component.css']
})
export class KbReferenceComponent implements OnInit {

	reqData:any = {}
	admin
	getLanguageArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedLangArray
	setAccToSurgery
	getUnique
	totalTr:any = []
	myArr
	getDistImageName
	getListArray
	imageLink
	getPatientBookingId
	getpatientName
	getpatietnLastName
	getLinkOfDoc
	testNew 
	mySlug
	constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private sanitizer:DomSanitizer,
		private translate: TranslateService) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getUnique = route.snapshot.params.id;
		console.log(this.getUnique)
		this.totalTr = [1]
		// this.totalTr[0] = 1
		// this.ref.detectChanges()
	}

	ngOnInit() {
		this.reqData = {}
		this.reqData.name = []
		this.reqData.name[0] = ""
		this.reqData.file = []
		this.reqData.file[0] = ""
		this.getListArray = []
		this.myArr = []
		this.getDistImageName = {}
		this.imageLink = environment1.image
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Add Attachments - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Add Attachments - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Add Attachments - The Cloud Health')
		}
		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Lang_Name: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
			// Lang_Shotname: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
		});
		this.getLanguageArray = []
		this.getDataViaId()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
	}

	addRow() {
		this.totalTr.push(1)
		this.reqData.name[this.totalTr.length - 1] = ""
		this.reqData.file[this.totalTr.length - 1] = ""

	}
	removeRow(i) {
		if (this.totalTr.length == 1) {
			this.totalTr = []
			this.totalTr.push(1)
			this.reqData.name[0] = ""
			this.reqData.file[0] = ""
			this.myArr[0]= ""
		} else {
			this.totalTr.splice(i, 1)
			this.reqData.name.splice(i, 1) // = ""
			this.reqData.file.splice(i, 1) // = ""
			this.myArr.splice(i, 1)

		}

	}

	uploadData(){
		var arrr = []
		for (var i = 0; i < this.reqData.name.length; i++) {				
			arrr.push({
				KBR_Description:this.reqData.name[i],
				KBR_Link: this.reqData.file[i],
				KBR_Is_Active: true,
				KBR_Is_Deleted: false,
				KBR_Create_Date: new Date(),
				KBR_Modify_Date: new Date(),
				KBR_TimeZone: this.admin.UM_TimeZone,
			})
		}
		var addObj = {
			Slug: this.mySlug,
			KNB_Unique_ID: this.getUnique,
			KNB_References: arrr,
			KNB_Modify_Date: new Date(),
			KNB_TimeZone: this.admin.UM_TimeZone,
		}
		console.log(addObj)
		this.UserService.KBAddReference(addObj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})

	}

	getDataViaId(){

		this.showLoader = true
		var obj = {
			Slug: this.mySlug,
			KNB_Unique_ID: this.getUnique
		} 
		this.UserService.getKBViaId(obj).subscribe((data)=>{
			console.log(data)
			this.getListArray = data.Data.KNB_References
			$(document).ready(function() {
				setTimeout(function(){
					$('#kbknwldge').DataTable();
				}, 100);
			} );
			this.showLoader = false
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

	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
	}
	removeTildSign(data){
		if(data){

			var getnew = data.replace("~", "");
		}
		return (getnew)
	}
	getLastLocation(){
		this.location.back()
	}
	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data
	}
	isDeletedYes(){
		
		console.log(this.isDelete)
		var myarr = []
		myarr.push({KBR_Unique_ID:this.isDelete.KBR_Unique_ID})
		var obj = {
			KNB_Unique_ID:this.getUnique,
			KNB_Modify_Date : new Date(),
			KNB_References:myarr,
			KNB_TimeZone: this.isDelete.KBR_TimeZone,
			Slug: this.mySlug,
		}
		console.log(obj)
		this.UserService.IsDeletedReference(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}

}
