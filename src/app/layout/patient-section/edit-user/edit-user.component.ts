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
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
	maxDate = new Date()
	maxDate1 = new Date()
	patient_info
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
	getPerDetails
	primary_insurance
	secondary_insurance
	third_insurance
	forth_insurance
	DataString
	savePrimaryIncInfo
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private sanitizer:DomSanitizer, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private translate: TranslateService, private route: ActivatedRoute){ 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getQueryStringID = route.snapshot.params.id;
		this.patientUniqueId = route.snapshot.params.id;

		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
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
		// this.hideShow()
		this.getReligionArray = []
		this.getEthnicityArray = []
		this.getRaceArray = []
		this.getNationalityArray = []
		this.getLanguageArray = []
		this.getRelationshipArray = []
		this.getIncidentArray = []
		this.patient_info = new FormGroup({
			// Patient_Incient_Detail:new FormControl({value: ''}),
			Patient_Prefix : new FormControl('', [Validators.required]),
			Patient_First_Name : new FormControl('', [Validators.required]),
			Patient_Middle_Name : new FormControl(''),
			Patient_Last_Name : new FormControl('', [Validators.required]),
			Patient_DOB : new FormControl('', [Validators.required]),
			Patient_Sex : new FormControl('', [Validators.required]),
			Patient_SSN : new FormControl('', ),
			Patient_Address1 : new FormControl('', [Validators.required]),
			Patient_Address2 : new FormControl(''),
			Patient_City : new FormControl('', [Validators.required]),
			Patient_State : new FormControl('', [Validators.required]),
			Patient_Zipcode : new FormControl('', [Validators.required]),
			Patient_Primary_No : new FormControl('', [Validators.required]),
			Patient_Secondary_No : new FormControl(''),
			Patient_Work_No : new FormControl(''),
			Patient_Emergency_No : new FormControl('', [Validators.required]),
			Patient_Email : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
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
			Patient_Primary_Insurance_Details: new FormControl(''),
			Patient_Secondary1_Insurance_Details: new FormControl(''),
			Patient_Secondary2_Insurance_Details: new FormControl(''),
			Patient_Secondary3_Insurance_Details: new FormControl(''),
			Patient_Created_By:new FormControl({value: '', disabled: true},),
			Patient_User_Name:new FormControl({value: '', disabled: true},),
			Patient_Create_Date:new FormControl({value: '', disabled: true},),
			Patient_Modify_Date:new FormControl({value: '', disabled: true},),
			Patient_Is_Active:new FormControl({value: '', disabled: true},),
			Patient_Is_Deleted:new FormControl({value: '', disabled: true},),
			Patient_TimeZone:new FormControl({value: '', disabled: true},),
			Patient_Surgery_Physician_Center_ID:new FormControl(''),
			Patient_Office_Type:new FormControl(''),
			Patient_Data:new FormControl(''),
			Patient_Insurance_Type:new FormControl(''),
			Patient_Response_Data:new FormControl(''),
			Slug:new FormControl(''),
		});
		this.primary_insurance = new FormGroup({
			PPID_Relation_To_Patient : new FormControl('', ),
			PPID_Subscriber_Name : new FormControl('', ),
			PPID_Subscriber_SSN_No : new FormControl('', ),
			PPID_DOB : new FormControl('', ),
			PPID_Policy_No : new FormControl('', ),
			PPID_Primary_Insurance : new FormControl('', ),
			PPID_PO_Box_No : new FormControl('', ),
			PPID_Address : new FormControl('', ),
			PPID_State : new FormControl('', ),
			PPID_City : new FormControl('', ),
			PPID_Zip_Code : new FormControl('', ),
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
			PSID_Relation_To_Patient : new FormControl('', ),
			PSID_Subscriber_Name : new FormControl('', ),
			PSID_Subscriber_SSN_No : new FormControl('', ),
			PSID_DOB : new FormControl('', ),
			PSID_Policy_No : new FormControl('', ),
			PSID_Primary_Insurance : new FormControl('', ),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', ),
			PSID_Address2 : new FormControl('', ),
			PSID_State : new FormControl('', ),
			PSID_City : new FormControl('', ),
			PSID_Zip_Code : new FormControl('', ),
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
			PSID_Relation_To_Patient : new FormControl('', ),
			PSID_Subscriber_Name : new FormControl('', ),
			PSID_Subscriber_SSN_No : new FormControl('', ),
			PSID_DOB : new FormControl('', ),
			PSID_Policy_No : new FormControl('', ),
			PSID_Primary_Insurance : new FormControl('', ),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', ),
			PSID_State : new FormControl('', ),
			PSID_City : new FormControl('', ),
			PSID_Zip_Code : new FormControl('', ),
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
			PSID_Relation_To_Patient : new FormControl('', ),
			PSID_Subscriber_Name : new FormControl('', ),
			PSID_Subscriber_SSN_No : new FormControl('', ),
			PSID_DOB : new FormControl('', ),
			PSID_Policy_No : new FormControl('', ),
			PSID_Primary_Insurance : new FormControl('', ),
			PSID_PO_Box_No : new FormControl('', ),
			PSID_Address : new FormControl('', ),
			PSID_State : new FormControl('', ),
			PSID_City : new FormControl('', ),
			PSID_Zip_Code : new FormControl('', ),
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

		this.patient_info.get('Patient_Prefix').setValue('');
		this.patient_info.get('Patient_Sex').setValue('');
		this.patient_info.get('Patient_Religion').setValue('');
		this.patient_info.get('Patient_Ethinicity').setValue('');
		this.patient_info.get('Patient_Race').setValue('');
		this.patient_info.get('Patient_Marital_Status').setValue('');
		this.patient_info.get('Patient_Nationality').setValue('');
		this.patient_info.get('Patient_Language').setValue('');
		this.getAllList()
		this.validateSSN()
		this.validatphone()

	}
	getAllList(){
		var obj = {
			Slug: this.mySlug
		}
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
			Patient_Unique_ID:this.getQueryStringID,
			Slug:this.mySlug
		}
		this.UserService.getPatinetViaId(obj).subscribe((data)=>{
			console.log(data.Data)	
			this.getpatientCreatedDate = data.Data.Patient_Create_Date
			this.patient_info.setValue(data.Data);	
			this.primary_insurance.get('PPID_Subscriber_Name').setValue(data.Data.Patient_First_Name + ' ' + data.Data.Patient_Last_Name )
			this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue(data.Data.Patient_SSN)
			this.primary_insurance.get('PPID_DOB').setValue(data.Data.Patient_DOB)
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
				$(".remove-third-forth").show();
				this.third_insurance.setValue(data.Data.Patient_Secondary2_Insurance_Details)
			}
			if(data.Data.Patient_Secondary3_Insurance_Details){
				$(".forth-insr").show();
				$('.add-forth-insr').hide()
				$(".remove-forth-insr").show();
				this.forth_insurance.setValue(data.Data.Patient_Secondary3_Insurance_Details)
			}
			if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
			}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
			}else{
				$(".fa-check").css("background-color", 'green!important')
			}
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
		this.patient_info.value.Slug = this.mySlug

		console.log(this.patient_info.value)
		this.UserService.editPatientDetails(this.patient_info.value).subscribe((data)=>{
			console.log(data)
			this.patientUniqueId = data.Data.Patient_Unique_ID
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
			this.ngOnInit()
			// this.router.navigateByUrl('/dashboard')
		},err=>{
			console.log(err)
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
			}else if(ty == 'sec1'){
				cmptName = type	
			}else if(ty == 'sec2'){
				cmptName = type	
			}else if(ty == 'sec5'){
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
			this.primary_insurance.get('PPID_Primary_Insurance').setValue(object.INC_Company_Name)
		}
		if(type == 'sec1'){
			this.secondary_insurance.get('PSID_Primary_Insurance').setValue(object.INC_Company_Name)
		}
		if(type == 'sec2'){
			this.third_insurance.get('PSID_Primary_Insurance').setValue(object.INC_Company_Name)
		}
		if(type == 'sec5'){
			this.forth_insurance.get('PSID_Primary_Insurance').setValue(object.INC_Company_Name)
		}

	}
	verifyPrimaryInsurance(){
		this.primary_insurance.value.PPID_Subscriber_Name = this.patient_info.value.Patient_First_Name
		this.primary_insurance.value.PPID_DOB = new Date(this.patient_info.value.Patient_DOB)
		this.primary_insurance.value.PPID_Address = this.patient_info.value.Patient_Address1
		this.primary_insurance.value.PPID_Address2 = this.patient_info.value.Patient_Address
		this.primary_insurance.value.PPID_State = this.patient_info.value.Patient_State
		this.primary_insurance.value.PPID_City = this.patient_info.value.Patient_City
		this.primary_insurance.value.PPID_Zip_Code = this.patient_info.value.Patient_Zipcode
		if(this.patient_info.value.Patient_SSN){
			this.primary_insurance.value.PPID_Subscriber_SSN_No = this.patient_info.value.Patient_SSN
		}
		console.log(this.primary_insurance.value)
		if(this.primary_insurance.value.PPID_Relation_To_Patient == '' || this.primary_insurance.value.PPID_Relation_To_Patient == undefined || this.primary_insurance.value.PPID_Relation_To_Patient == null){
			this.toster.warning(this.translate.instant('Please fill relation'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_Subscriber_Name == '' || this.primary_insurance.value.PPID_Subscriber_Name == undefined || this.primary_insurance.value.PPID_Subscriber_Name == null){
			this.toster.warning('Please fill the name', 'Warning')
			return
		}
		if(this.primary_insurance.value.PPID_Subscriber_SSN_No == '' || this.primary_insurance.value.PPID_Subscriber_SSN_No == undefined || this.primary_insurance.value.PPID_Subscriber_SSN_No == null){
			this.toster.warning('Please fill the SSN no', 'Warning')
			return
		}
		if(this.primary_insurance.value.PPID_DOB == '' || this.primary_insurance.value.PPID_DOB == undefined || this.primary_insurance.value.PPID_DOB == null){
			this.toster.warning(this.translate.instant('Please fill the DOB'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_Policy_No == '' || this.primary_insurance.value.PPID_Policy_No == undefined || this.primary_insurance.value.PPID_Policy_No == null){
			this.toster.warning(this.translate.instant('Please fill the Policy no'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_Primary_Insurance == '' || this.primary_insurance.value.PPID_Primary_Insurance == undefined || this.primary_insurance.value.PPID_Primary_Insurance == null){
			this.toster.warning('Please fill the primary insurance', 'Warning')
			return
		}
		if(this.primary_insurance.value.PPID_Address == '' || this.primary_insurance.value.PPID_Address == undefined || this.primary_insurance.value.PPID_Address == null){
			this.toster.warning(this.translate.instant('Please fill the address'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_State == '' || this.primary_insurance.value.PPID_State == undefined || this.primary_insurance.value.PPID_State == null){
			this.toster.warning(this.translate.instant('Please fill the state'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_City == '' || this.primary_insurance.value.PPID_City == undefined || this.primary_insurance.value.PPID_City == null){
			this.toster.warning(this.translate.instant('Please fill the city'), this.translate.instant('Warning'))
			return
		}
		if(this.primary_insurance.value.PPID_Zip_Code == '' || this.primary_insurance.value.PPID_Zip_Code == undefined || this.primary_insurance.value.PPID_Zip_Code == null){
			this.toster.warning(this.translate.instant('Please fill the zip'), this.translate.instant('Warning'))
			return
		}
		$("#primary_insurance_open").modal("show");  
		return
		var clinic_name = this.admin.UM_Username +'|'
		var company_name = 'Humana' + '|'
		var policy_number = this.primary_insurance.value.PPID_Policy_No  + '|'
		var fullname = this.primary_insurance.value.PPID_Subscriber_Name.split(' ')
		var first_name = fullname[0] + '|'
		var last_name
		if(fullname[fullname.length - 1]){
			last_name = fullname[fullname.length - 1] + '|'
		}
		var dob = this.primary_insurance.value.PPID_DOB 
		var dd = dob.getDate();
		var mm = dob.getMonth() + 1; //January is 0!
		var yyyy = dob.getFullYear();
		dob = mm + '/' + dd + '/' + yyyy + '|'
		var relationship_with = this.primary_insurance.value.PPID_Relation_To_Patient + '|||'
		var get30 = '30' + '||'
		var compy_internal_id = '61101' + '||'
		var get1 = '1' + '|'
		var get1P = '1P' + '|||'
		var SSN =  this.primary_insurance.value.PPID_Subscriber_SSN_No + '||'
		var doc_hpiId = 'HPI-'+'1122334455'

		var data = clinic_name + company_name + policy_number + first_name + last_name + dob 
		+ relationship_with + get30 + compy_internal_id + get1 + get1P + SSN + doc_hpiId
		console.log(data)
		this.patientUniqueId = 'MF6W456b77e716e72'
		var obj = {
			// Patient_Unique_ID: this.patientUniqueId,
			// Patient_Data: 'ABC Clinic|Commercial Payer|12345678|John|Doe|01/15/2000|S|||30||66666||1|1P|||||HPI-1234567893',
			// Patient_TimeZone:this.admin.UM_TimeZone,
			// Patient_Modify_Date: new Date(),
			// Patient_Insurance_Type: '1',
			Patient_Unique_ID : "MF6W456b77e716e72",            
			Patient_Modify_Date : new Date(),            
			Patient_TimeZone : "US/Eastern (GMT-04:00)",
			Patient_Insurance_Type:"1",
			Patient_Data:"ABC Clinic|Commercial Payer|12345678|John|Doe|01/15/2000|S|||30||66666||1|1P|||||HPI-1234567893"

		}
		console.log(obj)
		//applyWayStarApi
		this.showLoader = true
		this.UserService.applyWayStarApi(obj).subscribe((data)=>{
			console.log(data)
			if(data.Message){
				this.DataString = this.sanitizer.bypassSecurityTrustHtml(data.DataString)
				this.savePrimaryIncInfo = data.Data
			}

			$(document).ready(function() {
				$("#primary_insurance_open").modal({
					show: false,
					backdrop: 'static'
				});

				$("#primary_insurance_open").modal("show");             

			});
			this.showLoader = false
			// this.getIncidentArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	savePrimaryInsurancePDF(){
		// let element = <HTMLInputElement>document.getElementById("pri_ins");
		// element.value = this.DataString;
		// var doc = new jsPDF()
		// console.log(element.value)
		// doc.text(this.DataString, 10, 10)
		// doc.save('a4.pdf')

	}
	reVerifyPrimaryInc(){
		this.DataString = ''
	}
	saveInfoOfPrimaryInc(){
		console.log(this.savePrimaryIncInfo)
		this.UserService.SaveInsuranceInformation(this.savePrimaryIncInfo).subscribe((data)=>{
			console.log(data)
		},err=>{
			console.log(err)
		})
	}
	verifySecondaryInsurance(){
		var clinic_name = this.admin.UM_Username +'|'
		var company_name = 'Humana' + '|'
		var policy_number = this.secondary_insurance.value.PSID_Policy_No  + '|'
		var fullname = this.secondary_insurance.value.PSID_Subscriber_Name.split(' ')
		var first_name = fullname[0] + '|'
		var last_name
		if(fullname[fullname.length - 1]){
			last_name = fullname[fullname.length - 1] + '|'
		}
		var dob = this.secondary_insurance.value.PSID_DOB 
		var dd = dob.getDate();
		var mm = dob.getMonth() + 1; //January is 0!
		var yyyy = dob.getFullYear();
		dob = mm + '/' + dd + '/' + yyyy + '|'
		var relationship_with = this.secondary_insurance.value.PSID_Relation_To_Patient + '|||'
		var get30 = '30' + '||'
		var compy_internal_id = '61101' + '||'
		var get1 = '1' + '|'
		var get1P = '1P' + '|||'
		var SSN =  this.secondary_insurance.value.PSID_Subscriber_SSN_No + '||'
		var doc_hpiId = 'HPI-'+'1122334455'

		var data = clinic_name + company_name + policy_number + first_name + last_name + dob 
		+ relationship_with + get30 + compy_internal_id + get1 + get1P + SSN + doc_hpiId
		console.log(data)
	}
	verifyThirdInsurance(){
		var clinic_name = this.admin.UM_Username +'|'
		var company_name = 'Humana' + '|'
		var policy_number = this.third_insurance.value.PSID_Policy_No  + '|'
		var fullname = this.third_insurance.value.PSID_Subscriber_Name.split(' ')
		var first_name = fullname[0] + '|'
		var last_name
		if(fullname[fullname.length - 1]){
			last_name = fullname[fullname.length - 1] + '|'
		}
		var dob = this.third_insurance.value.PSID_DOB 
		var dd = dob.getDate();
		var mm = dob.getMonth() + 1; //January is 0!
		var yyyy = dob.getFullYear();
		dob = mm + '/' + dd + '/' + yyyy + '|'
		var relationship_with = this.third_insurance.value.PSID_Relation_To_Patient + '|||'
		var get30 = '30' + '||'
		var compy_internal_id = '61101' + '||'
		var get1 = '1' + '|'
		var get1P = '1P' + '|||'
		var SSN =  this.third_insurance.value.PSID_Subscriber_SSN_No + '||'
		var doc_hpiId = 'HPI-'+'1122334455'

		var data = clinic_name + company_name + policy_number + first_name + last_name + dob 
		+ relationship_with + get30 + compy_internal_id + get1 + get1P + SSN + doc_hpiId
		console.log(data)
	}
	verifyFourthInsurance(){
		var clinic_name = this.admin.UM_Username +'|'
		var company_name = 'Humana' + '|'
		var policy_number = this.forth_insurance.value.PSID_Policy_No  + '|'
		var fullname = this.forth_insurance.value.PSID_Subscriber_Name.split(' ')
		var first_name = fullname[0] + '|'
		var last_name
		if(fullname[fullname.length - 1]){
			last_name = fullname[fullname.length - 1] + '|'
		}
		var dob = this.forth_insurance.value.PSID_DOB 
		var dd = dob.getDate();
		var mm = dob.getMonth() + 1; //January is 0!
		var yyyy = dob.getFullYear();
		dob = mm + '/' + dd + '/' + yyyy + '|'
		var relationship_with = this.forth_insurance.value.PSID_Relation_To_Patient + '|||'
		var get30 = '30' + '||'
		var compy_internal_id = '61101' + '||'
		var get1 = '1' + '|'
		var get1P = '1P' + '|||'
		var SSN =  this.forth_insurance.value.PSID_Subscriber_SSN_No + '||'
		var doc_hpiId = 'HPI-'+'1122334455'

		var data = clinic_name + company_name + policy_number + first_name + last_name + dob 
		+ relationship_with + get30 + compy_internal_id + get1 + get1P + SSN + doc_hpiId
		console.log(data)
	}

}

