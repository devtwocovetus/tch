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
  selector: 'app-kb-attachment',
  templateUrl: './kb-attachment.component.html',
  styleUrls: ['./kb-attachment.component.css']
})
export class KbAttachmentComponent implements OnInit {

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
	getUniqueId
	totalTr:any = []
	myArr
	getDistImageName
	getDocArray
	imageLink
	getPatientBookingId
	getpatientName
	getpatietnLastName
	getLinkOfDoc
	testNew 
	mySlug
	getListArray
	constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private sanitizer:DomSanitizer, private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getUniqueId = route.snapshot.params.id;
		console.log(this.getUniqueId)
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
		this.getDocArray = []
		this.myArr = []
		this.getListArray = []
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
	chekcupload(id){
		var abcd = $('#uploadAtchm'+id)[0].files[0]
		this.storeData(abcd, id)
	}
	storeData(aa, ii){
		var pushdata = []
		this.myArr[ii] = aa

	}

	uploadImages(){
		this.showLoader = true
		console.log(this.myArr)
		var data  = new FormData()
		for (var i = 0; i < this.myArr.length; i++) {
			data.append('file'+i, this.myArr[i])
			console.log(this.myArr[i].name)
			this.getDistImageName[i] = this.reqData.name[i]

		}
		// debugger
		if (Object.entries(this.getDistImageName).length === 0 && this.getDistImageName.constructor === Object) {
			this.toster.warning('Please upload image', 'Warning')
			return
		}
		console.log(this.getDistImageName)
		data.append('Description',JSON.stringify(this.getDistImageName));

		var objArr = [];
		var userName 
		if(this.admin.UM_Office_Type == 'P'){
			userName = 'Physician Office'
		}else{
			userName = 'Surgery Center'
		}
		objArr.push({
			KNB_Unique_ID :this.getUniqueId,
			KNB_Modify_Date:new Date(),
			KNB_TimeZone: this.admin.UM_TimeZone,
			KNB_Created_By: this.admin.UM_Unique_ID,
			KNB_User_Name: this.admin.UM_Username,
			Slug:this.mySlug,
		});   
		if(objArr == null || objArr == undefined ){
			this.toster.warning('Please upload images')
			return
		}
		data.append('objArr', JSON.stringify(objArr)); 

		this.showLoader = true
		var thismeans = this 
		$.ajax({
			//url: 'http://tchapi.thecloudhealth.com/API/SurgeryCenter/AddLogo',
			url: environment1.endPoint+'KnowledgeBase/AddAttachment',
			processData: false,
			contentType: false,
			data: data,
			type: 'POST',
			success: function (response) {
				// debugger;
				thismeans.showLoader = true
				thismeans.toster.success('Data uploaded successfully','Success')
				thismeans.showLoader = false
				thismeans.ngOnInit()
			},
			failure: function (response) {
				// debugger;
				alert(response.responseText);
			},
			error: function (response) {
				// debugger;
				alert(response.responseText);
			}
		});

	}

	getDataViaId(){

		this.showLoader = true
		var obj = {
			Slug: this.mySlug,
			KNB_Unique_ID: this.getUniqueId
		} 
		this.UserService.getKBViaId(obj).subscribe((data)=>{
			console.log(data)
			this.getListArray = data.Data.KNB_Document

			// $('#atchtbleggg').dataTable().fnDestroy();;
			$(document).ready(function() {
				setTimeout(function(){
					$('#atchtbleggg').DataTable();
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
getLinkOfDOc(link){
	this.testNew = link
	var linknew  = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageLink + this.removeTildSign(link));
	this.getLinkOfDoc  =linknew
}
getLastLocation(){
	this.location.back()
}

}

