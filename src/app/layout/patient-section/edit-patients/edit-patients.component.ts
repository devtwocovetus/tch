
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import {environment1} from '../../../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-edit-patients',
	templateUrl: './edit-patients.component.html',
	styleUrls: ['./edit-patients.component.css']
})
export class EditPatientsComponent implements OnInit {

	maxDate = new Date()
	maxDate1 = new Date()
	patient_info
	primary_insurance
	secondary_insurance
	third_insurance
	forth_insurance
	admin
	getReligionArray
	getEthnicityArray
	getRaceArray
	getNationalityArray
	getLanguageArray
	getRelationshipArray
	getIncidentArray
	patientUniqueId
	feet
	inch
	pound
	getBMI
	showLoader
	getQueryStringID
	getpatientCreatedDate
	setAccToSurgery
	mySlug
	primaryInscArraySugg
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute, private ref: ChangeDetectorRef) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getQueryStringID = route.snapshot.params.bookID;
		this.patientUniqueId = route.snapshot.params.id;
		console.log(this.patientUniqueId);
		
	}

	ngOnInit() {
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Edit Patient - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Edit Patient - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Edit Patient - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
		this.hideShow()
		this.getReligionArray = []
		this.getEthnicityArray = []
		this.getRaceArray = []
		this.getNationalityArray = []
		this.getLanguageArray = []
		this.getRelationshipArray = []
		this.getIncidentArray = []
		this.patient_info = new FormGroup({
			Patient_Prefix : new FormControl('', [Validators.required]),
			Patient_First_Name : new FormControl('', [Validators.required]),
			Patient_Middle_Name : new FormControl(''),
			Patient_Last_Name : new FormControl('', [Validators.required]),
			Patient_DOB : new FormControl('', [Validators.required]),
			Patient_Sex : new FormControl('', [Validators.required]),
			Patient_SSN : new FormControl('', [Validators.required]),
			Patient_Address1 : new FormControl('', [Validators.required]),
			Patient_Address2 : new FormControl(''),
			Patient_City : new FormControl('', [Validators.required]),
			Patient_State : new FormControl('', [Validators.required]),
			Patient_Zipcode : new FormControl('', [Validators.required]),
			Patient_Primary_No : new FormControl('', [Validators.required]),
			Patient_Secondary_No : new FormControl(''),
			Patient_Work_No : new FormControl(''),
			Patient_Emergency_No : new FormControl('', [Validators.required]),
			Patient_Email : new FormControl('', [Validators.required]),
			Patient_Religion : new FormControl('', [Validators.required]),
			Patient_Ethinicity : new FormControl('', [Validators.required]),
			Patient_Race : new FormControl('', [Validators.required]),
			Patient_Marital_Status : new FormControl('', [Validators.required]),
			Patient_Nationality : new FormControl('', [Validators.required]),
			Patient_Language : new FormControl('', [Validators.required]),
			Patient_Height_In_Ft : new FormControl(''),
			Patient_Height_In_Inch : new FormControl(''),
			Patient_Weight : new FormControl(''),
			Patient_Spouse_No : new FormControl(''),
			Patient_Body_Mass_Index : new FormControl({value: 0, disabled: true},),
			Patient_Unique_ID: new FormControl({value: '', disabled: true},),
			Patient_Code: new FormControl({value: '', disabled: true},),
			Patient_Primary_Insurance_Details: new FormControl({value: '', disabled: true},),
			Patient_Secondary1_Insurance_Details: new FormControl({value: '', disabled: true},),
			Patient_Secondary2_Insurance_Details: new FormControl({value: '', disabled: true},),
			Patient_Secondary3_Insurance_Details: new FormControl({value: '', disabled: true},),
			Patient_Created_By:new FormControl({value: '', disabled: true},),
			Patient_User_Name:new FormControl({value: '', disabled: true},),
			Patient_Create_Date:new FormControl({value: '', disabled: true},),
			Patient_Modify_Date:new FormControl({value: '', disabled: true},),
			Patient_Is_Active:new FormControl({value: '', disabled: true},),
			Patient_Is_Deleted:new FormControl({value: '', disabled: true},),
			Patient_TimeZone:new FormControl({value: '', disabled: true},),
			Patient_Surgery_Physician_Center_ID:new FormControl({value: '', disabled: true},),
			Patient_Office_Type:new FormControl({value: '', disabled: true},),
			Patient_Data:new FormControl({value: '', disabled: true},),
			Patient_Insurance_Type:new FormControl({value: '', disabled: true},),
			Patient_Response_Data:new FormControl({value: '', disabled: true},),
			Slug:new FormControl({value: '', disabled: true},),
		});
		this.primary_insurance = new FormGroup({
			PPID_Relation_To_Patient : new FormControl('', [Validators.required]),
			PPID_Subscriber_Name : new FormControl('', [Validators.required]),
			PPID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
			PPID_DOB : new FormControl('', [Validators.required]),
			PPID_Policy_No : new FormControl('', [Validators.required]),
			PPID_Primary_Insurance : new FormControl('', [Validators.required]),
			PPID_PO_Box_No : new FormControl('', ),
			PPID_Address : new FormControl('', [Validators.required]),
			PPID_State : new FormControl('', [Validators.required]),
			PPID_City : new FormControl('', [Validators.required]),
			PPID_Zip_Code : new FormControl('', [Validators.required]),
			PPID_Unique_ID: new FormControl({value: '', disabled: true},),
			PPID_DocPath: new FormControl({value: '', disabled: true},),
			PPID_Created_By:new FormControl({value: '', disabled: true},),
			PPID_User_Name:new FormControl({value: '', disabled: true},),
			PPID_Create_Date:new FormControl({value: '', disabled: true},),
			PPID_Modify_Date:new FormControl({value: '', disabled: true},),
			PPID_Is_Active:new FormControl({value: '', disabled: true},),
			PPID_Is_Deleted:new FormControl({value: '', disabled: true},),
			PPID_TimeZone:new FormControl({value: '', disabled: true},),
			PPID_V_Start_Date: new FormControl({value: '', disabled: true},),
			PPID_V_End_Date: new FormControl({value: '', disabled: true},),
			PPID_Trace_Number: new FormControl({value: '', disabled: true},),
			PPID_Address2 : new FormControl('', ),
			// PPID_Primary_Insurance: new FormControl({value: '', disabled: true},),
		})
		this.secondary_insurance = new FormGroup({
			PSID_Relation_To_Patient : new FormControl('', [Validators.required]),
			PSID_Subscriber_Name : new FormControl('', [Validators.required]),
			PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
			PSID_DOB : new FormControl('', [Validators.required]),
			PSID_Policy_No : new FormControl('', [Validators.required]),
			PSID_Primary_Insurance : new FormControl('', [Validators.required]),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', [Validators.required]),
			PSID_Address2 : new FormControl('', ),
			PSID_State : new FormControl('', [Validators.required]),
			PSID_City : new FormControl('', [Validators.required]),
			PSID_Zip_Code : new FormControl('', [Validators.required]),
			PSID_Unique_ID: new FormControl({value: '', disabled: true},),
			PSID_Created_By:new FormControl({value: '', disabled: true},),
			PSID_User_Name:new FormControl({value: '', disabled: true},),
			PSID_Create_Date:new FormControl({value: '', disabled: true},),
			PSID_Modify_Date:new FormControl({value: '', disabled: true},),
			PSID_Is_Active:new FormControl({value: '', disabled: true},),
			PSID_Is_Deleted:new FormControl({value: '', disabled: true},),
			PSID_TimeZone:new FormControl({value: '', disabled: true},),
			PSID_DocPath: new FormControl({value: '', disabled: true},),
			PSID_V_Start_Date: new FormControl({value: '', disabled: true},),
			PSID_V_End_Date: new FormControl({value: '', disabled: true},),
			PSID_Trace_Number: new FormControl({value: '', disabled: true},),
		})
		this.third_insurance = new FormGroup({
			PSID_Relation_To_Patient : new FormControl('', [Validators.required]),
			PSID_Subscriber_Name : new FormControl('', [Validators.required]),
			PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
			PSID_DOB : new FormControl('', [Validators.required]),
			PSID_Policy_No : new FormControl('', [Validators.required]),
			PSID_Primary_Insurance : new FormControl('', [Validators.required]),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', [Validators.required]),
			PSID_State : new FormControl('', [Validators.required]),
			PSID_City : new FormControl('', [Validators.required]),
			PSID_Zip_Code : new FormControl('', [Validators.required]),
			PSID_Unique_ID: new FormControl({value: '', disabled: true},),
			PSID_Created_By:new FormControl({value: '', disabled: true},),
			PSID_User_Name:new FormControl({value: '', disabled: true},),
			PSID_Create_Date:new FormControl({value: '', disabled: true},),
			PSID_Modify_Date:new FormControl({value: '', disabled: true},),
			PSID_Is_Active:new FormControl({value: '', disabled: true},),
			PSID_Is_Deleted:new FormControl({value: '', disabled: true},),
			PSID_TimeZone:new FormControl({value: '', disabled: true},),
			PSID_DocPath: new FormControl({value: '', disabled: true},),
			PSID_V_Start_Date: new FormControl({value: '', disabled: true},),
			PSID_V_End_Date: new FormControl({value: '', disabled: true},),
			PSID_Trace_Number: new FormControl({value: '', disabled: true},),
			PSID_Address2 : new FormControl('', ),
		})

		this.forth_insurance = new FormGroup({
			PSID_Relation_To_Patient : new FormControl('', [Validators.required]),
			PSID_Subscriber_Name : new FormControl('', [Validators.required]),
			PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
			PSID_DOB : new FormControl('', [Validators.required]),
			PSID_Policy_No : new FormControl('', [Validators.required]),
			PSID_Primary_Insurance : new FormControl('', [Validators.required]),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', [Validators.required]),
			PSID_State : new FormControl('', [Validators.required]),
			PSID_City : new FormControl('', [Validators.required]),
			PSID_Zip_Code : new FormControl('', [Validators.required]),
			PSID_Unique_ID: new FormControl({value: '', disabled: true},),
			PSID_Created_By:new FormControl({value: '', disabled: true},),
			PSID_User_Name:new FormControl({value: '', disabled: true},),
			PSID_Create_Date:new FormControl({value: '', disabled: true},),
			PSID_Modify_Date:new FormControl({value: '', disabled: true},),
			PSID_Is_Active:new FormControl({value: '', disabled: true},),
			PSID_Is_Deleted:new FormControl({value: '', disabled: true},),
			PSID_TimeZone:new FormControl({value: '', disabled: true},),
			PSID_DocPath: new FormControl({value: '', disabled: true},),
			PSID_V_Start_Date: new FormControl({value: '', disabled: true},),
			PSID_V_End_Date: new FormControl({value: '', disabled: true},),
			PSID_Trace_Number: new FormControl({value: '', disabled: true},),
			PSID_Address2 : new FormControl('', ),

		})
		
		this.getAllList()
		this.validateSSN()
		this.validatphone()
		this.patient_info.get('Patient_Prefix').setValue('');
		this.patient_info.get('Patient_Sex').setValue('');
		this.patient_info.get('Patient_Religion').setValue('');
		this.patient_info.get('Patient_Ethinicity').setValue('');
		this.patient_info.get('Patient_Race').setValue('');
		this.patient_info.get('Patient_Marital_Status').setValue('');
		this.patient_info.get('Patient_Nationality').setValue('');
		this.patient_info.get('Patient_Language').setValue('');
		// this.getPatientInfoViaId()
		
	}
	getAllList(){
		var obj = {
			Slug: this.mySlug
		}
		this.showLoader = true
		let religion = this.UserService.getReligionListDD(obj).map(res =>res)
		let ethenicity = this.UserService.EthinicityListDD(obj).map(res =>res)
		let race = this.UserService.getRaceListDD(obj).map(res =>res)
		let nationality = this.UserService.getNationalityListDD(obj).map(res =>res)
		let language = this.UserService.getLanguageList(obj).map(res =>res)
		let realtion = this.UserService.getRelationList(obj).map(res =>res)
		Observable.forkJoin([religion, ethenicity, race, nationality, language, realtion]).subscribe(results =>{
			this.getReligionArray = results[0].DataList
			this.getEthnicityArray = results[1].DataList
			this.getRaceArray = results[2].DataList
			this.getNationalityArray = results[3].DataList
			this.getLanguageArray = results[4].DataList
			this.getRelationshipArray = results[5].DataList
			this.getPatientInfoViaId()
		})
	}
	getPatientInfoViaId(){
		
		var obj  = {
			Patient_Unique_ID:this.patientUniqueId,
			Slug:this.mySlug
		}
		this.UserService.getPatinetViaId(obj).subscribe((data)=>{
			console.log(data.Data)	
			this.getpatientCreatedDate = data.Data.Patient_Create_Date

			this.patient_info.setValue(data.Data);	

			// this.patient_info.setValue(data.Data);	
			if(data.Data.Patient_Primary_Insurance_Details){
				this.primary_insurance.setValue(data.Data.Patient_Primary_Insurance_Details);	
			}
			if(data.Data.Patient_Secondary1_Insurance_Details){
				$(".sec-insr").show();
				$('.add-sec-insr').hide()
				this.secondary_insurance.setValue(data.Data.Patient_Secondary1_Insurance_Details)
			}
			if(data.Data.Patient_Secondary2_Insurance_Details){
				$(".third-insr").show();
				$('.add-third-insr').hide()
				this.third_insurance.setValue(data.Data.Patient_Secondary2_Insurance_Details)
			}
			if(data.Data.Patient_Secondary3_Insurance_Details){
				$(".forth-insr").show();
				$('.add-forth-insr').hide()
				this.forth_insurance.setValue(data.Data.Patient_Secondary3_Insurance_Details)
			}
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

	EditPatientInfo(){
	console.log('editPAT')
	if(this.patient_info.value.Patient_Prefix == ''){
		this.toster.warning(this.translate.instant('please select Prefix'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Sex == ''){
		this.toster.warning(this.translate.instant('please select Sex'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Religion == ''){
		this.toster.warning(this.translate.instant('please select Religion'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Ethinicity == ''){
		this.toster.warning(this.translate.instant('please select Ethinicity'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Race == ''){
		this.toster.warning(this.translate.instant('please select Race'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Marital_Status == ''){
		this.toster.warning(this.translate.instant('please select Marital Status'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Nationality == ''){
		this.toster.warning(this.translate.instant('please select Nationality'), this.translate.instant('Warning'))
		return

	}
	if(this.patient_info.value.Patient_Language == ''){
		this.toster.warning(this.translate.instant('please select Language'), this.translate.instant('Warning'))
		return

	}
	this.patient_info.value.Patient_Unique_ID =  this.patientUniqueId
	this.patient_info.value.Patient_Is_Active = true
	this.patient_info.value.Patient_Created_By = this.admin.UM_Unique_ID
	this.patient_info.value.Patient_Create_Date = this.getpatientCreatedDate
	this.patient_info.value.Patient_Modify_Date = new Date()
	this.patient_info.value.Patient_User_Name = this.admin.UM_Username
	this.patient_info.value.Patient_Is_Deleted = false
	this.patient_info.value.Patient_Surgery_Physician_Center_ID = this.admin.UM_Surgary_Physician_CenterID
	this.patient_info.value.Patient_Office_Type = this.admin.UM_Office_Type
	this.patient_info.value.Patient_TimeZone = this.admin.UM_TimeZone
	this.patient_info.value.Patient_Body_Mass_Index = $('#getmssindex').val() 

	this.primary_insurance.value.PPID_Created_By= this.admin.UM_Unique_ID
	this.primary_insurance.value.PPID_User_Name = this.admin.UM_Username
	this.primary_insurance.value.PPID_Create_Date = new Date()
	this.primary_insurance.value.PPID_Modify_Date = new Date()
	this.primary_insurance.value.PPID_Is_Active = true
	this.primary_insurance.value.PPID_Is_Deleted = false
	this.primary_insurance.value.PPID_TimeZone = this.admin.UM_TimeZone
	this.primary_insurance.value.PPID_V_Start_Date = new Date()
	this.primary_insurance.value.PPID_V_End_Date = new Date()
	this.primary_insurance.value.PPID_DocPath = ''
	this.primary_insurance.value.PPID_Trace_Number = ''
	// this.primary_insurance.value.PPID_Unique_ID = ''


	// this.secondary_insurance.get('PSID_Subscriber_Name').setValue($('#secondnamevalue').val())
	this.secondary_insurance.value.PSID_Created_By= this.admin.UM_Unique_ID
	this.secondary_insurance.value.PSID_User_Name = this.admin.UM_Username
	this.secondary_insurance.value.PSID_Create_Date = new Date()
	this.secondary_insurance.value.PSID_Modify_Date = new Date()
	this.secondary_insurance.value.PSID_Is_Active = true
	this.secondary_insurance.value.PSID_Is_Deleted = false
	this.secondary_insurance.value.PSID_TimeZone = this.admin.UM_TimeZone
	this.secondary_insurance.value.PSID_V_Start_Date = new Date()
	this.secondary_insurance.value.PSID_V_End_Date = new Date()
	this.secondary_insurance.value.PSID_DocPath = ''
	this.secondary_insurance.value.PSID_Trace_Number = ''

	// this.third_insurance.get('PSID_Subscriber_Name').setValue($('#thirdnamevalue').val())
	this.third_insurance.value.PSID_Created_By= this.admin.UM_Unique_ID
	this.third_insurance.value.PSID_User_Name = this.admin.UM_Username
	this.third_insurance.value.PSID_Create_Date = new Date()
	this.third_insurance.value.PSID_Modify_Date = new Date()
	this.third_insurance.value.PSID_Is_Active = true
	this.third_insurance.value.PSID_Is_Deleted = false
	this.third_insurance.value.PSID_TimeZone = this.admin.UM_TimeZone
	this.third_insurance.value.PSID_V_Start_Date = new Date()
	this.third_insurance.value.PSID_V_End_Date = new Date()
	this.third_insurance.value.PSID_DocPath = ''
	this.third_insurance.value.PSID_Trace_Number = ''

	// this.forth_insurance.get('PSID_Subscriber_Name').setValue($('#forthnamevalue').val())
	this.forth_insurance.value.PSID_Created_By= this.admin.UM_Unique_ID
	this.forth_insurance.value.PSID_User_Name = this.admin.UM_Username
	this.forth_insurance.value.PSID_Create_Date = new Date()
	this.forth_insurance.value.PSID_Modify_Date = new Date()
	this.forth_insurance.value.PSID_Is_Active = true
	this.forth_insurance.value.PSID_Is_Deleted = false
	this.forth_insurance.value.PSID_TimeZone = this.admin.UM_TimeZone
	this.forth_insurance.value.PSID_V_Start_Date = new Date()
	this.forth_insurance.value.PSID_V_End_Date = new Date()
	this.forth_insurance.value.PSID_DocPath = ''
	this.forth_insurance.value.PSID_Trace_Number = ''

	if(this.primary_insurance.value.PPID_Subscriber_Name && this.primary_insurance.value.PPID_Primary_Insurance){
		this.patient_info.value.Patient_Primary_Insurance_Details = this.primary_insurance.value
	}
	console.log(this.secondary_insurance.value.PSID_Subscriber_Name , this.secondary_insurance.value.PSID_Primary_Insurance)
	if(this.secondary_insurance.value.PSID_Subscriber_Name && this.secondary_insurance.value.PSID_Primary_Insurance){
		this.patient_info.value.Patient_Secondary1_Insurance_Details = this.secondary_insurance.value
	}

	if(this.third_insurance.value.PSID_Subscriber_Name && this.third_insurance.value.PSID_Subscriber_SSN_No){

		this.patient_info.value.Patient_Secondary2_Insurance_Details = this.third_insurance.value
	}
	if(this.forth_insurance.value.PSID_Subscriber_Name && this.forth_insurance.value.PSID_Subscriber_SSN_No){

		this.patient_info.value.Patient_Secondary3_Insurance_Details = this.forth_insurance.value
	}    
	this.patient_info.value.Slug = this.mySlug
	console.log(this.patient_info.value)
	this.UserService.editPatientDetails(this.patient_info.value).subscribe((data)=>{
		console.log(data)
		this.patientUniqueId = data.Data.Patient_Unique_ID
		this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
		this.router.navigateByUrl('/patient-dashboard')
	},err=>{
		console.log(err)
	})
}
	editBooking(){
		var Booking:any = {
			PB_Unique_ID:this.getQueryStringID,
			PB_Patient_ID:this.patientUniqueId,
			PB_Patient_Name:this.patient_info.value.Patient_First_Name,
			PB_Patient_Last_Name:this.patient_info.value.Patient_Last_Name,
			PB_Modify_Date: new Date(),
			PB_TimeZone : this.admin.UM_TimeZone,
			Slug: this.mySlug,
		}
		this.UserService.EditBookigInOne(Booking).subscribe((data1)=>{
			console.log(data1)
			// this.getBookingID = data1.Data.PB_Unique_ID
			this.router.navigateByUrl('/patient-dashboard')

		},err=>{
			console.log(err)
		})
	}	
	hideShow(){
		var myThisFucn = this
		$(".sec-insr").hide();
		$(".third-insr").hide();
		$(".forth-insr").hide();
		$(".remove-third-forth").hide();
		$(".remove-forth-insr").hide();
		$(document).ready(function(){
			$(".add-sec-insr").click(function(){
				$(".sec-insr").show();
				$(".add-sec-insr").hide();
				$(".remove-sec-third").show();
				myThisFucn.secondary_insurance.get('PSID_Subscriber_Name').setValue(myThisFucn.patient_info.value.Patient_First_Name + ' ' + myThisFucn.patient_info.value.Patient_Last_Name)
				myThisFucn.secondary_insurance.get('PSID_Subscriber_SSN_No').setValue(myThisFucn.patient_info.value.Patient_SSN)
				myThisFucn.secondary_insurance.get('PSID_DOB').setValue(myThisFucn.patient_info.value.Patient_DOB)

			});
			$(".add-third-insr").click(function(){
				$(".third-insr").show();
				$(".add-third-insr").hide();
				$(".remove-third-forth").show();
				myThisFucn.third_insurance.get('PSID_Subscriber_Name').setValue(myThisFucn.patient_info.value.Patient_First_Name + ' ' + myThisFucn.patient_info.value.Patient_Last_Name)
				myThisFucn.third_insurance.get('PSID_Subscriber_SSN_No').setValue(myThisFucn.patient_info.value.Patient_SSN)
				myThisFucn.third_insurance.get('PSID_DOB').setValue(myThisFucn.patient_info.value.Patient_DOB)
			});
			$(".add-forth-insr").click(function(){
				$(".forth-insr").show();
				$(".add-forth-insr").hide();
				$(".remove-third-forth").show();
				$(".remove-forth-insr").show();
				myThisFucn.forth_insurance.get('PSID_Subscriber_Name').setValue(myThisFucn.patient_info.value.Patient_First_Name + ' ' + myThisFucn.patient_info.value.Patient_Last_Name)
				myThisFucn.forth_insurance.get('PSID_Subscriber_SSN_No').setValue(myThisFucn.patient_info.value.Patient_SSN)
				myThisFucn.forth_insurance.get('PSID_DOB').setValue(myThisFucn.patient_info.value.Patient_DOB)
			});
			$(".remove-sec-third").click(function(){
				$(".third-insr").hide();
				$(".add-third-insr").hide();
				$(".remove-sec-third").hide();
				$(".sec-insr").hide();
				$(".add-sec-insr").show();
				$(".add-third-insr").show();
				myThisFucn.secondary_insurance.reset()
				myThisFucn.secondary_insurance.get('PSID_Relation_To_Patient').setValue('')

			});
			$(".remove-third-forth").click(function(){
				$(".forth-insr").hide();
				$(".add-forth-insr").hide();
				$(".remove-third-forth").hide();
				$(".third-insr").hide();
				$(".add-third-insr").show();
				$(".add-forth-insr").show();
				myThisFucn.third_insurance.reset()
				myThisFucn.third_insurance.get('PSID_Relation_To_Patient').setValue('')
			});
			$(".remove-forth-insr").click(function(){
				$(".forth-insr").hide();
				$(".add-forth-insr").hide();
				$(".remove-third-forth").show();
				$(".remove-forth-insr").hide();
				myThisFucn.forth_insurance.reset()
				myThisFucn.forth_insurance.get('PSID_Relation_To_Patient').setValue('')
			});

		})
	}
	blurweight(i){
		this.feet = parseInt(this.patient_info.value.Patient_Height_In_Ft)*12
		this.inch = parseInt(this.patient_info.value.Patient_Height_In_Inch)
		var con_ich = this.feet + this.inch
		this.pound = parseInt(i)
		this.getBMI = Math.round((this.pound)/(con_ich*con_ich)*703)
		this.patient_info.value.Patient_Body_Mass_Index = this.getBMI
		this.patient_info.get('Patient_Body_Mass_Index').setValue(this.getBMI)
		if(isNaN(this.getBMI)){
			this.patient_info.get('Patient_Body_Mass_Index').setValue(0)
			this.patient_info.value.Patient_Body_Mass_Index = 0
		}
	}

	handleAddressChange(address, type) {
		console.log(address, type)
		
		if(type == 'patient'){
			var city
			var state
			var zipcodes
			var street
			var addresss
			// this.patient_info.value.Patient_Address1 = $('#addrs1').val()
			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						city = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						state = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						zipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						street = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						addresss = address.address_components[i].long_name
					}
				}
			}
			if(street == 'undefined' || street == undefined || street == ''){
				this.patient_info.get('Patient_Address1').setValue(addresss);
			}else{
				this.patient_info.get('Patient_Address1').setValue(street+', ' + addresss);
			}
			this.patient_info.get('Patient_City').setValue(city);
			this.patient_info.get('Patient_State').setValue(state);
			this.patient_info.get('Patient_Zipcode').setValue(zipcodes);
			this.patient_info.value.Patient_Address1 = street+', ' + addresss
			this.patient_info.value.Patient_City = city
			this.patient_info.value.Patient_State = state
			this.patient_info.value.Patient_Zipcode = zipcodes
		}else if(type == 'primary'){
			console.log('in primary')
			// this.primary_insurance.value.PPID_Address = $('#inscPri').val()
			var Pricity
			var Pristate
			var Prizipcodes
			var Pristreet
			var Priaddresss
			
			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						Pricity = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						Pristate = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						Prizipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						Pristreet = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						Priaddresss = address.address_components[i].long_name
					}
				}
			}

			if(Pristreet == 'undefined' || Pristreet == undefined || Pristreet == ''){
				this.primary_insurance.get('PPID_Address').setValue(Priaddresss);
			}else{
				this.primary_insurance.get('PPID_Address').setValue(Pristreet+', ' + Priaddresss);
			}
			this.primary_insurance.get('PPID_State').setValue(Pristate)
			this.primary_insurance.get('PPID_City').setValue(Pricity)
			this.primary_insurance.get('PPID_Zip_Code').setValue(Prizipcodes)
			this.primary_insurance.value.Patient_Address1 = Pristreet+', '+Priaddresss
		}else if(type == 'second'){
			console.log('in second')
			var Seccity
			var Secstate
			var Seczipcodes
			var Secstreet
			var Secaddresss
			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						Seccity = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						Secstate = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						Seczipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						Secstreet = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						Secaddresss = address.address_components[i].long_name
					}

				}
			}
			if(Secstreet == 'undefined' || Secstreet == undefined || Secstreet == ''){
				this.secondary_insurance.get('PSID_Address').setValue(Secaddresss);
			}else{
				this.secondary_insurance.get('PSID_Address').setValue(Secstreet+', ' + Secaddresss);
			}
			this.secondary_insurance.get('PSID_City').setValue(Seccity)
			this.secondary_insurance.get('PSID_State').setValue(Secstate)
			this.secondary_insurance.get('PSID_Zip_Code').setValue(Seczipcodes)
		}else if(type == 'third'){
			console.log('in third')
			
			var thirdcity
			var thirdstate
			var thirdzipcodes
			var thirdstreet
			var thirdaddresss
			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						thirdcity = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						thirdstate = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						thirdzipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						thirdstreet = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						thirdaddresss = address.address_components[i].long_name
					}

				}
			}

			if(thirdstreet == 'undefined' || thirdstreet == undefined || thirdstreet == ''){
				this.secondary_insurance.get('PSID_Address').setValue(thirdaddresss);
			}else{
				this.secondary_insurance.get('PSID_Address').setValue(thirdstreet+', ' + thirdaddresss);
			}
			this.third_insurance.get('PSID_State').setValue(thirdstate)
			this.third_insurance.get('PSID_City').setValue(thirdcity)
			this.third_insurance.get('PSID_Zip_Code').setValue(thirdzipcodes)
			this.third_insurance.value.PSID_Address = thirdstreet+', '+thirdaddresss
		}else if(type == 'forth'){
			
			var forthcity
			var forthstate
			var forthzipcodes
			var forthstreet
			var forthaddresss
			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						forthcity = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						forthstate = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						forthzipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						forthstreet = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						forthaddresss = address.address_components[i].long_name
					}
				}
			}
			if(forthstreet == 'undefined' || forthstreet == undefined || forthstreet == ''){
				this.secondary_insurance.get('PSID_Address').setValue(forthaddresss);
			}else{
				this.secondary_insurance.get('PSID_Address').setValue(forthstreet+', ' + forthaddresss);
			}
			this.forth_insurance.get('PSID_State').setValue(forthstate)
			this.forth_insurance.get('PSID_City').setValue(forthcity)
			this.forth_insurance.get('PSID_Zip_Code').setValue(forthzipcodes)
			this.forth_insurance.value.PSID_Address = forthstreet+', '+forthaddresss
		}
	}
	validateSSN(){
		// SSN validation
		// trap keypress - only allow numbers
		$(document).ready(function () {
			//your code here

			$('input.ssn').on('keypress', function(event){
				// trap keypress
				var character = String.fromCharCode(event.which);
				if(!isInteger(character)){
					return false;
				}    
			});

			// checks that an input string is an integer, with an optional +/- sign character
			function isInteger (s) {
				if(s === '-') return true;
				var isInteger_re     = /^\s*(\+|-)?\d+\s*$/;
				return String(s).search (isInteger_re) != -1
			}

			// format SSN 
			$('input.ssn').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				if(val.length > 4) {
					this.value = val;
				}
				if((val.length > 3) && (val.length < 6)) {
					newVal += val.substr(0, 3) + '-';
					val = val.substr(3);
				}
				if (val.length > 5) {
					newVal += val.substr(0, 3) + '-';
					newVal += val.substr(3, 2) + '-';
					val = val.substr(5);
				}
				newVal += val;
				this.value = newVal;   
			});
		});

	}
	formatPhone(obj) {
		console.log(obj)
		var numbers = obj.value.replace(/\D/g, ''),
		char = {0:'(',3:')-',6:'-'};
		obj.value = '';
		for (var i = 0; i < numbers.length; i++) {
			obj.value += (char[i]||'') + numbers[i];
		}
	}
	goLastLocation(){
		this.location.back();
	}
	validatphone(){
		$(document).ready(function () {
			// format SSN 
			$('input.phoneno').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   

			});
			$('input.phoneno1').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno1').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno2').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno2').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});

			$('input.phoneno3').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno3').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno4').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno4').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno5').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno5').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno6').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno6').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno7').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno7').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});
			$('input.phoneno8').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno8').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal;   
				// console.log(this.value)
				// return this.value
			});


		});
	}
	searchInscCompany(type, observation, ty) {
			if(type.length>3){
				var cmptName
				if(ty == 'pri'){
					cmptName = type
				}if(ty == 'sec1'){
					cmptName = type
				}if(ty == 'sec2'){
					cmptName = type
				}if(ty == 'sec3'){
					cmptName = type
				}
				if (type != "") {
					var obj = {
						INC_Company_Name: cmptName,
						Slug: this.mySlug, 
					}
					this.UserService.GetInsurCompanyFilterWithName(obj).subscribe(data => {
						console.log(data)
						this.primaryInscArraySugg = []
						this.primaryInscArraySugg = data.DataList
					}, err => {
						console.log(err);
					})
				}
			}
		}
	searchBackSpaceforInsc(){
		this.primaryInscArraySugg= []
	}

	getAllDataOfInscCmpy(object, type){
		console.log(object, type)
		if(type == 'pri'){
			this.primary_insurance.get('PPID_Primary_Insurance').setValue(object)
		} if(type == 'sec1'){
			this.secondary_insurance.get('PSID_Primary_Insurance').setValue(object)
		} if(type == 'sec2'){
			this.third_insurance.get('PSID_Primary_Insurance').setValue(object)
		} if(type == 'sec3'){
			this.forth_insurance.get('PSID_Primary_Insurance').setValue(object)
		}

	}

}



//this.patient_info.value.Patient_Body_Mass_Index = $('#lblBMIText').val()