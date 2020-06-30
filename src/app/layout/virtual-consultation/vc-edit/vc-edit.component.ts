import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import {environment1} from '../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
import { ActivatedRoute } from '@angular/router';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import{ jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxdatetimeinput';           

@Component({
	selector: 'app-vc-edit',
	templateUrl: './vc-edit.component.html',
	styleUrls: ['./vc-edit.component.css']
})
export class VcEditComponent implements OnInit {
	@ViewChild('dateTimeInputReference', {static:false}) myDateTimeInput: jqxDateTimeInputComponent;
	getReligionArray
	getEthnicityArray
	getRaceArray
	getNationalityArray
	getLanguageArray
	getRelationshipArray
	mySlug
	patient_info
	getQueryStringID
	admin
	setAccToSurgery
	feet
	inch
	pound
	getBMI
	maxDate= new Date()
	bookingInfo
	getSlotsData
	showLoader
	checkEmail
	meridian = true;
	options = {
		componentRestrictions: { country: 'USA' }
	}
	patientUniqueId
	getbookingObject
	getPerDetails
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute, private ref: ChangeDetectorRef) {
		this.getQueryStringID = route.snapshot.params.id;
		console.log(this.getQueryStringID)
		this.getPerDetails = []
		// var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		// this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		// if(!this.getPerDetails[0].Is_View){
		// 	this.location.back()
		// }
	}

	ngOnInit() {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
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
		this.getSlotsData = {}
		this.getReligionArray = []
		this.getEthnicityArray = []
		this.getRaceArray = []
		this.getNationalityArray = []
		this.getLanguageArray = []
		this.getRelationshipArray = []
		this.patient_info = new FormGroup({
			// Patient_Incient_Detail:new FormControl({value: ''}),
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
			Patient_Body_Mass_Index : new FormControl(''),
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
		this.bookingInfo = new FormGroup({
			VCB_Doctor_Name: new FormControl('', [Validators.required]),
			VCB_Time_Slot: new FormControl('', [Validators.required]),
			VCB_Booking_Date: new FormControl('', [Validators.required]),
			VCB_Unique_ID: new FormControl({value: '', disabled: true},),
			VCB_Patient_ID: new FormControl({value: '', disabled: true},),
			VCB_Patient_Name: new FormControl(''),
			VCB_Patient_Last_Name: new FormControl(''),
			VCB_Booking_Time: new FormControl({value: '', disabled: true},),
			VCB_Booking_No: new FormControl({value: '', disabled: true},),
			VCB_Doctor_ID: new FormControl({value: '', disabled: true},),
			VCB_Doc_Uploaded_List: new FormControl({value: '', disabled: true},),
			VCB_Notifications: new FormControl({value: '', disabled: true},),
			VCB_Notifications_Array: new FormControl({value: '', disabled: true},),
			VCB_Booking_Physician_Office_ID: new FormControl({value: '', disabled: true},),
			VCB_Booking_Physician_Office_Name: new FormControl({value: '', disabled: true},),
			VCB_Created_By: new FormControl({value: '', disabled: true},),
			VCB_User_Name: new FormControl({value: '', disabled: true},),
			VCB_Create_Date: new FormControl({value: '', disabled: true},),
			VCB_Modify_Date: new FormControl({value: '', disabled: true},),
			VCB_Is_Active: new FormControl({value: '', disabled: true},),
			VCB_Is_Deleted: new FormControl({value: '', disabled: true},),
			VCB_Status: new FormControl({value: '', disabled: true},),
			VCB_Booked_From: new FormControl({value: '', disabled: true},),
			VCB_TimeZone: new FormControl({value: '', disabled: true},),
			VCB_Approved: new FormControl({value: '', disabled: true},),
			VCB_Draft: new FormControl({value: '', disabled: true},),
			VCB_Complete: new FormControl({value: '', disabled: true},),
			VCB_Cancelled: new FormControl({value: '', disabled: true},),
			Slug: new FormControl({value: '', disabled: true},),
		});
		this.bookingInfo.get('VCB_Time_Slot').setValue('')
		this.getAllList()
		
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
			this.findBooking()
		})
	}
	findBooking(){
		var obj = {
			VCB_Unique_ID: this.getQueryStringID,
			Slug: this.mySlug
		}
		this.UserService.findOneVcBooking(obj).pipe(map( bookingData => {
			const user = bookingData;
			console.log(bookingData.Data)
			this.getbookingObject = bookingData.Data
			this.patientUniqueId = bookingData.Data.VCB_Patient_ID
			this.bookingInfo.setValue(bookingData.Data);
			this.myDateTimeInput.val(new Date(bookingData.Data.VCB_Booking_Date))
			if(bookingData.Data.VCB_Booking_Time[0]){
				var time0 = bookingData.Data.VCB_Booking_Time[0].split(':')
				this.getSlotsData.date1 = {hour: parseInt(time0[0]), minute: parseInt(time0[1]), second: 0}
			}
			if(bookingData.Data.VCB_Booking_Time[1]){
				var time1 = bookingData.Data.VCB_Booking_Time[1].split(':')
				this.getSlotsData.date2 = {hour: parseInt(time1[0]), minute: parseInt(time1[1]), second: 0}
			}
			if (bookingData.Data.VCB_Booking_Time[2]) {
				var time2 = bookingData.Data.VCB_Booking_Time[2].split(':')
				this.getSlotsData.date3 =  {hour: parseInt(time2[0]), minute: parseInt(time2[1]), second: 0}
			}
			return user;
		}),
		mergeMap( user =>  this.UserService.getPatinetViaId({Patient_Unique_ID:user.Data.VCB_Patient_ID, Slug:'', })),take(1)
		).subscribe( patientData => {
			console.log(patientData.Data)
			this.patient_info.setValue(patientData.Data);
			this.showLoader = false
		});
	}
	goLastLocation(){
		this.location.back()
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
	EditPatientInfo(){
		if(new Date(this.bookingInfo.value.VCB_Booking_Date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
			this.toster.warning('Please select a valid date', 'Warning')
			return
		}
		this.patient_info.value.Patient_Unique_ID =  this.patientUniqueId
		this.patient_info.value.Patient_Is_Active = true
		this.patient_info.value.Patient_Created_By = this.admin.UM_Unique_ID
		this.patient_info.value.Patient_Modify_Date = new Date()
		this.patient_info.value.Patient_User_Name = this.admin.UM_Username
		this.patient_info.value.Patient_Is_Deleted = false
		this.patient_info.value.Patient_Surgery_Physician_Center_ID = this.admin.UM_Surgary_Physician_CenterID
		this.patient_info.value.Patient_Office_Type = this.admin.UM_Office_Type
		this.patient_info.value.Patient_TimeZone = this.admin.UM_TimeZone
		this.patient_info.value.Patient_Body_Mass_Index = $('#getmssindex').val() 
		this.patient_info.value.Slug = this.mySlug
		if(this.bookingInfo.value.VCB_Doctor_Name == ''){
			this.toster.warning('Please select doctor', 'Warning')
			return
		}
		if(this.bookingInfo.value.VCB_Time_Slot == ''){
			this.toster.warning('Please select time slot', 'Warning')
			return
		}
		if(this.getSlotsData.date1 == null){
			this.toster.warning('Please select option 1 time', 'Warning')
			return
		}
		console.log()

		if(this.getSlotsData.date1.hour.toString().length <= 1){
			this.getSlotsData.date1.hour = '0'+this.getSlotsData.date1.hour
		}
		if(this.getSlotsData.date1.minute.toString().length <= 1){
			this.getSlotsData.date1.minute = '0'+this.getSlotsData.date1.minute
		}
		if(this.getSlotsData.date2!= null && this.getSlotsData.date2.hour.toString().length <= 1){
			this.getSlotsData.date2.hour = '0'+this.getSlotsData.date2.hour
		}
		if(this.getSlotsData.date2!= null && this.getSlotsData.date2.minute.toString().length <= 1){
			this.getSlotsData.date2.minute = '0'+this.getSlotsData.date2.minute
		}
		if(this.getSlotsData.date3!= null && this.getSlotsData.date3.hour.toString().length <= 1){
			this.getSlotsData.date3.hour = '0'+this.getSlotsData.date3.hour
		}
		if(this.getSlotsData.date3!= null && this.getSlotsData.date3.minute.toString().length <= 1){
			this.getSlotsData.date3.minute = '0'+this.getSlotsData.date3.minute
		}
		var timeArr = []
		var time1 = this.getSlotsData.date1.hour +':'+this.getSlotsData.date1.minute
		timeArr.push(time1)
		if(this.getSlotsData.date2! = null){
			var time2 = this.getSlotsData.date2.hour +':'+this.getSlotsData.date2.minute
			timeArr.push(time2)
		}
		if( this.getSlotsData.date3! = null){
			var time3 = this.getSlotsData.date3.hour +':'+this.getSlotsData.date3.minute
			timeArr.push(time3)
		}
		console.log(timeArr)

		this.bookingInfo.value.VCB_Unique_ID = this.getQueryStringID
		this.bookingInfo.value.VCB_Patient_Name = this.patient_info.value.Patient_First_Name
		this.bookingInfo.value.VCB_Patient_Last_Name=  this.patient_info.value.Patient_Last_Name
		this.bookingInfo.value.VCB_Modify_Date = new Date()
		this.bookingInfo.value.VCB_TimeZone = this.admin.UM_TimeZone
		this.bookingInfo.value.VCB_Status = 'Action Required'
		this.bookingInfo.value.VCB_Booking_Time = timeArr

		let booking = this.UserService.editVCBooking(this.bookingInfo.value).map(res =>res)
		let patientedit = this.UserService.editPatientDetails(this.patient_info.value).map(res =>res)
		Observable.forkJoin([booking, patientedit]).subscribe(results =>{
			console.log(results)
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
			this.router.navigateByUrl('/vc-list')
		})
	}
	checkSSNData(ssn){
		console.log(ssn)
		if(ssn){
			var obj = {
				Slug: this.mySlug,
				Patient_SSN: ssn
			}
			this.UserService.checkSSN(obj).subscribe(data => {
				console.log(data)
				if(data.Result){
					this.toster.warning(this.translate.instant('SSN already exist'), this.translate.instant('Warning'))
				}
			}, err => {
				console.log(err);
			})

		}
	}
}

