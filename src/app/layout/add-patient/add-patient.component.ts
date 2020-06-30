import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
// import { } from 'googlemaps';
// @ViewChild('dataContainer') dataContainer: ElementRef;
@Component({
	selector: 'app-add-patient',
	templateUrl: './add-patient.component.html',
	styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
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
	DataString
	savePrimaryIncInfo
	getZipCodeJSON
	myAddress
	emailvalidate
	options = {
		componentRestrictions: { country: 'USA' }
	}
	checkEmailAddress
	getPrimaryNum
	setAccToSurgery
	mySlug
	primaryInscArraySugg
	getPerDetails
	User_Unique_ID
	User_Passcode
	registerForm: FormGroup;
	getpatientFinalUniqueId
	siteLink
	User_Password
	getActiveationEmail
	getPasscodeEmail
	checkBtn:boolean = false
	@Input() adressType: string;
	@Output() setAddress: EventEmitter<any> = new EventEmitter();
	@ViewChild('addresstext',{static:false}) addresstext: any;
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private sanitizer:DomSanitizer, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private translate: TranslateService) { 
		
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		this.siteLink = environment1.siteLink
		// if(!this.getPerDetails[0].Is_View){
			// 	this.location.back()
			// }
		}

		ngOnInit() {
			this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
			if(this.setAccToSurgery){
				if(this.setAccToSurgery.PhyO_DBA_Name){
					this.title.setTitle('Add Patient - ' +  this.setAccToSurgery.PhyO_DBA_Name)
				}else if(this.setAccToSurgery.SurgC_DBA_Name){
					this.title.setTitle('Add Patient - ' +  this.setAccToSurgery.SurgC_DBA_Name)
				}
			}else{
				this.title.setTitle('Add Patient - The Cloud Health')
			}

			$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
			this.hideShow()
			this.emailvalidate = 1
			this.getReligionArray = []
			this.getEthnicityArray = []
			this.getRaceArray = []
			this.getNationalityArray = []
			this.getLanguageArray = []
			this.getRelationshipArray = []
			this.getIncidentArray = []
			this.getZipCodeJSON = {}
			this.patient_info = new FormGroup({
				Patient_Prefix : new FormControl('', [Validators.required]),
				Patient_First_Name : new FormControl('', [Validators.required]),
				Patient_Middle_Name : new FormControl(''),
				Patient_Last_Name : new FormControl('', [Validators.required]),
				Patient_DOB : new FormControl('', [Validators.required]),
				Patient_Sex : new FormControl('', [Validators.required]),
				Patient_SSN : new FormControl('',),
				Patient_Address1 : new FormControl('', [Validators.required]),
				Patient_Address2 : new FormControl(''),
				Patient_City : new FormControl('', [Validators.required]),
				Patient_State : new FormControl('', [Validators.required]),
				Patient_Zipcode : new FormControl('', [Validators.required]),
				Patient_Primary_No : new FormControl('', [Validators.required]),
				Patient_Secondary_No : new FormControl(''),
				Patient_Work_No : new FormControl(''),
				Patient_Emergency_No : new FormControl('',[Validators.required]),
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
				Patient_Body_Mass_Index : new FormControl({value: 0, disabled: true},),
				Patient_Unique_ID: new FormControl({value: '', disabled: true},),
				Patient_Code: new FormControl({value: '', disabled: true},),
				Patient_Spouse_No : new FormControl(''),
			});
			this.primary_insurance = new FormGroup({
				PPID_Relation_To_Patient : new FormControl('', [Validators.required]),
				PPID_Subscriber_Name : new FormControl('',),
				PPID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
				PPID_DOB : new FormControl('', [Validators.required]),
				PPID_Policy_No : new FormControl('', [Validators.required]),
				PPID_Primary_Insurance : new FormControl('', [Validators.required]),
				PPID_PO_Box_No : new FormControl('', [Validators.required]),
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
				PSID_Subscriber_Name : new FormControl('',),
				PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
				PSID_DOB : new FormControl('', [Validators.required]),
				PSID_Policy_No : new FormControl('', [Validators.required]),
				PSID_Primary_Insurance : new FormControl('', [Validators.required]),
				PSID_PO_Box_No : new FormControl('', [Validators.required]),
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
			this.third_insurance = new FormGroup({
				PSID_Relation_To_Patient : new FormControl('', [Validators.required]),
				PSID_Subscriber_Name : new FormControl('',),
				PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
				PSID_DOB : new FormControl('', [Validators.required]),
				PSID_Policy_No : new FormControl('', [Validators.required]),
				PSID_Primary_Insurance : new FormControl('', [Validators.required]),
				PSID_PO_Box_No : new FormControl('', [Validators.required]),
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
				PSID_Subscriber_Name : new FormControl('',),
				PSID_Subscriber_SSN_No : new FormControl('', [Validators.required]),
				PSID_DOB : new FormControl('', [Validators.required]),
				PSID_Policy_No : new FormControl('', [Validators.required]),
				PSID_Primary_Insurance : new FormControl('', [Validators.required]),
				PSID_PO_Box_No : new FormControl('', [Validators.required]),
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
			this.loadDynamicCss()
			if(this.admin.UM_Office_Type == 'P'){
				this.mySlug = this.admin.UM_Slug_PO
			}else{
				this.mySlug = this.admin.UM_Slug_SC
			}
		}
		getAllList(){
			var obj = {
				Slug: this.mySlug
			}
			var sys = {
				Slug: this.mySlug,
				SET_Name:'Account Activation'
			}
			var sys1 = {
				Slug: this.mySlug,
				SET_Name:'Activation Passcode'
			}
			

			let religion = this.UserService.getReligionListDD(obj).map(res =>res)
			let ethenicity = this.UserService.EthinicityListDD(obj).map(res =>res)
			let race = this.UserService.getRaceListDD(obj).map(res =>res)
			let nationality = this.UserService.getNationalityListDD(obj).map(res =>res)
			let language = this.UserService.getLanguageList(obj).map(res =>res)
			let realtion = this.UserService.getRelationList(obj).map(res =>res)
			let getSyslist = this.UserService.seletEmailViaName(sys).map(res =>res)
			let getpassCode = this.UserService.seletEmailViaName(sys1).map(res =>res)
			Observable.forkJoin([religion, ethenicity, race, nationality, language, realtion, getSyslist, getpassCode]).subscribe(results =>{
				this.getReligionArray = results[0].DataList
				this.getEthnicityArray = results[1].DataList
				this.getRaceArray = results[2].DataList
				this.getNationalityArray = results[3].DataList
				this.getLanguageArray = results[4].DataList
				this.getRelationshipArray = results[5].DataList
				this.getActiveationEmail = results[6].Data
				this.getPasscodeEmail = results[7].Data
				// this.findBooking()
				console.log(this.getPasscodeEmail)
			})
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
						if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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
						if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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
						if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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
						if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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
						if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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

		verifyPrimaryInsurance(){
			this.primary_insurance.value.PPID_Subscriber_Name = this.patient_info.value.Patient_First_Name
			this.primary_insurance.value.PPID_DOB = new Date(this.patient_info.value.Patient_DOB)
			this.primary_insurance.value.PPID_Address = this.patient_info.value.Patient_Address1
			this.primary_insurance.value.PPID_Address2 = this.patient_info.value.Patient_Address
			this.primary_insurance.value.PPID_State = this.patient_info.value.Patient_State
			this.primary_insurance.value.PPID_City = this.patient_info.value.Patient_City
			this.primary_insurance.value.PPID_Zip_Code = this.patient_info.value.Patient_Zipcode
			this.primary_insurance.value.PPID_Subscriber_SSN_No = this.patient_info.value.Patient_SSN
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
		checkEmail(eml){
			console.log(eml)
			// if(eml){
				this.emailvalidate = 1
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				if(!re.test(String(eml).toLowerCase())){
					this.emailvalidate = 0
					return false	
				}

				var obj = {
					UM_Email: eml
				}
				console.log(obj)
				this.UserService.checkEmail(obj).subscribe((data)=>{
					console.log(data)
					if(data.Result == false){
						this.checkEmailAddress = false
						this.toster.error(this.translate.instant('Email Address already exist'), this.translate.instant('Error'))
					}else{
						this.checkEmailAddress = true
						this.toster.success(this.translate.instant('Email Address available'), this.translate.instant('Success'))
					}

				},err=>{
					console.log(err)
				})
			// }

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
					// console.log(this.value)
					return this.value
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
		saveFinalBooing(){
			if(this.checkBtn == true){
				return
			}
			this.checkBtn = true
			this.showLoader = true
			// this.getPasscodeEmail.
			
			// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
			// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
			// // this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("http://link.com", "<a href="  +this.User_Unique_ID + ">Link</a>");
			// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
			// this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("<strong>passcode</strong>", this.User_Passcode);
			console.log(this.patient_info.value)

			//<Physician office name>.  http://link.com
			// var accSub = this.getActiveationEmail
			if(this.patient_info.value.Patient_Prefix == ''){
				this.toster.warning(this.translate.instant('please select Prefix'), this.translate.instant('Warning'))
				return

			}
			if(this.patient_info.value.Patient_Sex == ''){
				this.toster.warning(this.translate.instant('please select Gender'), this.translate.instant('Warning'))
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
			if(this.checkEmailAddress == false){
				this.toster.error(this.translate.instant('Email address alredy exist'), this.translate.instant('Error'))
				return
			}
			this.patient_info.value.Patient_Is_Active = true
			this.patient_info.value.Patient_Created_By = this.admin.UM_Unique_ID
			this.patient_info.value.Patient_Create_Date = new Date()
			this.patient_info.value.Patient_Modify_Date = new Date()
			this.patient_info.value.Patient_User_Name = this.admin.UM_Username
			this.patient_info.value.Patient_Is_Deleted = false
			this.patient_info.value.Patient_Surgery_Physician_Center_ID = this.admin.UM_Surgary_Physician_CenterID
			this.patient_info.value.Patient_Office_Type = this.admin.UM_Office_Type
			this.patient_info.value.Patient_TimeZone = this.admin.UM_TimeZone
			this.patient_info.value.Patient_Body_Mass_Index = $('#lblBMIText').val()

			// this.primary_insurance.get('PPID_Subscriber_Name').setValue($('#primarynamevalue').val())
			this.primary_insurance.get('PPID_DOB').setValue(new Date($('#getdob').val()))
			this.primary_insurance.get('PPID_Address').setValue($('#inscPri').val())
			this.primary_insurance.get('PPID_Address2').setValue($('#inscPri2').val())
			this.primary_insurance.get('PPID_State').setValue($('#getstate').val())
			this.primary_insurance.get('PPID_City').setValue($('#getcity').val())
			this.primary_insurance.get('PPID_Zip_Code').setValue($('#getzipcde').val())
			this.primary_insurance.value.PPID_Created_By= this.admin.UM_Unique_ID
			this.primary_insurance.value.PPID_User_Name = this.admin.UM_Username
			this.primary_insurance.value.PPID_Create_Date = new Date()
			this.primary_insurance.value.PPID_Modify_Date = new Date()
			this.primary_insurance.value.PPID_Is_Active = true
			this.primary_insurance.value.PPID_Is_Deleted = false
			this.primary_insurance.value.PPID_TimeZone = this.admin.UM_TimeZone
			this.primary_insurance.value.PPID_V_Start_Date = new Date()
			this.primary_insurance.value.PPID_V_End_Date = new Date()

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

			if(this.primary_insurance.value.PPID_Subscriber_Name && this.primary_insurance.value.PPID_Primary_Insurance){

				this.patient_info.value.Patient_Primary_Insurance_Details = this.primary_insurance.value
			}
			if(this.secondary_insurance.value.PSID_Subscriber_Name && this.secondary_insurance.value.PSID_Primary_Insurance){

				this.patient_info.value.Patient_Secondary1_Insurance_Details = this.secondary_insurance.value
			}

			if(this.third_insurance.value.PSID_Subscriber_Name && this.third_insurance.value.PSID_Relation_To_Patient){


				this.patient_info.value.Patient_Secondary2_Insurance_Details = this.third_insurance.value
			}
			if(this.forth_insurance.value.PSID_Subscriber_Name && this.forth_insurance.value.PSID_Relation_To_Patient){

				this.patient_info.value.Patient_Secondary3_Insurance_Details = this.forth_insurance.value
			}    

			console.log(this.patient_info.value)		
			this.UserService.createPatientInOne(this.patient_info.value).subscribe((data)=>{
				console.log(data)
				this.getpatientFinalUniqueId = data.Data.Patient_Unique_ID
				this.showLoader = false
				this.CreateUserandSendMail()
				// this.goLastLocation()

			},err=>{
				console.log(err)
			})
		}
		CreateUserandSendMail(){
			this.showLoader = true

			this.User_Password=this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			this.User_Passcode=this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			var UserObj = {
				UM_Member_ID:this.getpatientFinalUniqueId,
				UM_Username: this.patient_info.value.Patient_First_Name,
				UM_Password: this.User_Password,
				UM_Passcode:this.User_Passcode,
				UM_Email: this.patient_info.value.Patient_Email,
				UM_PhoneNo: this.patient_info.value.Patient_Primary_No,
				UM_Surgary_Physician_CenterID: this.admin.UM_Surgary_Physician_CenterID,
				UM_Office_Type: 'PA',
				UM_Role_Type: 'Patient',
				UM_Created_By: this.admin.UM_Unique_ID,
				UM_Create_Date: new Date(),
				UM_Modify_Date: new Date(),
				UM_Is_Active: true,
				UM_TimeZone:this.admin.UM_TimeZone,
				UM_User_Name :this.admin.UM_Username,			
				Slug: this.mySlug
			};

			this.UserService.addUser(UserObj).subscribe((UserResponse)=>{
				console.log("UserResponse" +  JSON.stringify( UserResponse));
				if(UserResponse.Message='Ok' && UserResponse.Status==1){
					this.User_Unique_ID=UserResponse.Data.UM_Unique_ID

					//SMS Section
					var Sms = {   
						Receiver_Contact_No:'+'   + this.patient_info.value.Patient_Primary_No,
						Message_Body: 'Your Email is : ' + this.patient_info.value.Patient_Email + ' and passcode is : ' 
						+ this.User_Passcode  +" "  +""+
						" "  + "\ To get the information on whatsapp send text" + " 'Join strength-cat' on +1(415) 523-8886 ",
						Message_Date:new Date(),
						Message_Title: 'Login Credential'
					}
					console.log(Sms)

					this.showLoader = true
					this.UserService.sendsms(Sms).subscribe((SMSResponse)=>{
						console.log('Response :' +  JSON.stringify(SMSResponse))

						this.showLoader = false
					},err=>{
						console.log(err)
					})  




					var link  = this.siteLink+'/notification-passcode/'
					
					var Sms = {   
						Receiver_Contact_No:'+'   + this.patient_info.value.Patient_Primary_No,
						Message_Body: 'Please Update your Passcode'+ "<a href=" + link +this.User_Unique_ID + ">Link</a>",
						Message_Date:new Date(),
						Message_Title: 'Passcode Link'
					}
					console.log(Sms)

					this.showLoader = true
					this.UserService.sendsms(Sms).subscribe((SMSResponse)=>{
						console.log('Response :' +  JSON.stringify(SMSResponse))

						this.showLoader = false
					},err=>{
						console.log(err)
					})  



					//End of SMS Section

					//Email Section
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("http://link.com", "<a href="+link  +this.User_Unique_ID + ">Link</a>");
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					var tomail = []
					tomail.push(this.patient_info.value.Patient_Email)
					var Email:any= {};
					Email.to_email=tomail;
					Email.To_Name=this.patient_info.value.Patient_First_Name
					Email.Bcc_Email=this.getActiveationEmail.SET_Bcc,
					Email.Cc_Email=this.getActiveationEmail.SET_CC,
					Email.Subject=this.getActiveationEmail.SET_Name;
					Email.From_Email = this.getActiveationEmail.SET_From_Email;
					Email.From_Name = this.getActiveationEmail.SET_From_Name
					Email.PlainTextContent = "";
					Email.HtmlContent = '<img src='+environment1.image+this.getActiveationEmail.SET_Header+' height="47.58px" width="115px" alt="logo">' + "<br><br><br>" + this.getActiveationEmail.SET_Message + "<br><br><br>" + this.getActiveationEmail.SET_Footer
					//"<p>Your Email is : " + this.patient_info.value.Patient_Email + 
					//" and passcode is : " + this.User_Passcode   +" "  +" "  +" "  +" "  +" "  +
					//" "  + "To get the information on whatsapp send text"  + " Join strength-cat  on +1(415) 523-8886 </p>";

					console.log(Email)

					this.showLoader = true
					this.UserService.sendemail(Email).subscribe((data2)=>{
						console.log(data2)
					},err=>{
						console.log(err)
					})
					var link  = this.siteLink+'/notification-passcode/'
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("<strong>passcode</strong>", "<strong>"+this.User_Passcode+"</strong>");
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);

					console.log(this.User_Unique_ID)
					var Email1:any= {};
					Email1.to_email=tomail;
					Email1.To_Name=this.patient_info.value.Patient_First_Name
					Email1.Bcc_Email=this.getPasscodeEmail.SET_Bcc,
					Email1.Cc_Email=this.getPasscodeEmail.SET_CC,
					Email1.From_Email = this.getPasscodeEmail.SET_From_Email;
					Email1.From_Name = this.getPasscodeEmail.SET_From_Name
					Email1.Subject = this.getPasscodeEmail.SET_Name;
					Email1.PlainTextContent = "";
					Email1.HtmlContent = '<img src='+environment1.image+this.getPasscodeEmail.SET_Header+' height="47.58px" width="115px" alt="logo">'+ "<br><br><br>" + this.getPasscodeEmail.SET_Message + "<br><br><br>" + this.getPasscodeEmail.SET_Footer
					//"<p>This is your account link, Please click here </p>" + "<a href=" + link +this.User_Unique_ID+ ">Link</a> ";
					console.log(Email1)

					this.showLoader = true
					this.UserService.sendemail(Email1).subscribe((data1)=>{
						console.log('Response :' +  JSON.stringify(data1))

						this.showLoader = false
					},err=>{
						console.log(err)
					})
				}
				

				this.router.navigateByUrl('/patient-list')
				this.showLoader = false
			},err=>{
				console.log(err)
			})
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
checkSSNData(ssn){
	this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue(ssn)
	console.log(ssn)
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
goLastLocation(){
	this.location.back()
}
getFiratName(fname){
	this.primary_insurance.get('PPID_Subscriber_Name').setValue(this.patient_info.value.Patient_First_Name + ' ' + this.patient_info.value.Patient_Last_Name)

}
randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
}
loadDynamicCss(){
	var aa  = this
	setTimeout(function(){
		if(aa.admin){
			if(aa.admin.UM_Office_Type == 'P'){
				if(aa.setAccToSurgery){
					if(aa.setAccToSurgery.PhyO_Appearance){
						$(".mh-left h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax)
						$(".main-heading h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax)
						$(".header").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorDark_Hax)
						$(".btnsubmit").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
						// $(".btntext").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
						$(".btntext").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax)
						// $(".btntext1").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
						$(".btntext1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax)
						$(".clsleft").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
						$(".clsleft").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax)
						$(".btnsubmit").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax)
					}else{
						$(".mh-left h1").css("color", '#006400')
						$(".main-heading h1").css("color", '#006400')
						$(".header").css("background-color", '#006400')
						$(".btnsubmit").css("background-color",'#04a8c5');
						// $(".btntext").css("background-color",'#04a8c5');
						// $(".btntext1").css("background-color",'#04a8c5');
					}
					if(aa.setAccToSurgery.PhyO_Appearance){
						$(".menu li a").hover(function(){
							$(this).css("backgroundColor", aa.setAccToSurgery.PhyO_Appearance.App_HyperlinkHoverText_Hax);
						},
						function(){
							$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax);
						});
						$(".mh-right a").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});
						$(".btnsubmit").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});
						$(".btntext").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});

						$(".btntext1").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});

						$(".clsleft").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});
					}
				}else{
					$("h1").css("color", "#2ca36c");
				}
			}else{
				$(".header").css("background-color", '#006400')
			}
		}
	}, 100);
}
}