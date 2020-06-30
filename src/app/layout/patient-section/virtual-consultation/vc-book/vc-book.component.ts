import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import {environment1} from '../../../../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
declare var moment: any;
declare var $:any
import { NgxXml2jsonService } from 'ngx-xml2json';
import { DomSanitizer } from '@angular/platform-browser';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HostListener } from '@angular/core';

@Component({
	selector: 'app-vc-book',
	templateUrl: './vc-book.component.html',
	styleUrls: ['./vc-book.component.css']
})
export class VcBookComponent implements OnInit {
	todayDate = new Date()
	maxDate = new Date()
	maxDate1 = new Date()
	patient_info
	getReligionArray
	getEthnicityArray
	DataString
	getRaceArray
	getNationalityArray
	getLanguageArray
	admin
	getRelationshipArray
	primary_insurance
	patientUniqueId
	secondary_insurance
	third_insurance
	forth_insurance
	incident_form
	getIncidentArray
	surgery_proc
	getSurgeryCenterArray
	getAnesthesiaArray
	getBlockArray
	getSelectedTimeZone
	getCPTArray
	pre_medical_clear
	getEquipmentArray
	getSuppliesArray
	getInstrumentsArray
	special_request_form
	insurence_pre_auth
	saveAlertsObject
	reqData
	totalTr
	myArr
	getDistImageName
	feet
	inch
	pound
	getBMI
	typePatientCode
	getQueryStringID
	getQueryStringName
	getBookingID
	getPatientName
	cptsearch
	getICDArray
	getAlertArray
	trysomeing
	saveAvocateCheckBox
	saveAlertsCheckBox
	getProcedureArray
	getZipCodeJSON
	getCPTArrayList
	getICDArrayList
	getProcArrayList
	setAccToSurgery
	imageLink
	options = {
		componentRestrictions: { country: 'USA' }
	}
	checkEmailAddress
	isFormDataNewData
	packesArray
	savePrimaryIncInfo
	showLoader
	searchTextForSSN
	productNameSuggestion
	getpatientNameFrompatientList
	getpatientLastNameFrompatientList
	getPatientLastName
	getPatientIdViaSearch
	getElementProcID
	getElementCPTID
	getElementICDID
	Proc_i
	Cpt_i
	Icd_i
	saveTemplateName
	spiNameIsExist
	GetTemplateFilterWithSurgeonArray
	defaultValue = new Date()
	getSpiTempId
	selectSPITempleteArray
	mySlug
	primaryInscArraySugg
	sureryCenterSlectedId
	sureryCenterSlectedName
	objforStatus
	getCompletedStatus
	getPatientEmailId
	getSlotsData
	meridian = true;
	bookingInfo
	siteLink
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private sanitizer:DomSanitizer) { 
		// console.log(localStorage.getItem('isLoggedin'))
		if(!localStorage.getItem('isLoggedin')){
			this.router.navigate(['/login'])
		}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.getQueryStringID = route.snapshot.queryParamMap.get('id');
		this.getQueryStringName = route.snapshot.queryParamMap.get('name');
		console.log(this.admin)
		this.siteLink = environment1.siteLink
		// this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.imageLink = environment1.image
		if(this.setAccToSurgery){
			this.loadDynamicCss()
		}

	}

	ngOnInit() {
		console.log(this.setAccToSurgery)
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Booking - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Booking - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Booking - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");

		this.totalTr = [1]
		this.reqData = {}
		this.reqData.name = []
		this.reqData.name[0] = ""
		this.reqData.file = []
		this.reqData.file[0] = ""
		this.reqData.pbStatus = []
		this.reqData.pbStatus[0] = ""
		this.getReligionArray = []
		this.getEthnicityArray = []
		this.getRaceArray = []
		this.getNationalityArray = []
		this.getLanguageArray = []
		this.getRelationshipArray = []
		this.getIncidentArray =[]
		this.getAnesthesiaArray = []
		this.getBlockArray = []
		this.getCPTArray = []
		this.getICDArray = []
		this.getEquipmentArray = []
		this.getSuppliesArray = []
		this.getInstrumentsArray = []
		this.myArr = []
		this.getAlertArray  =[]
		this.saveAlertsCheckBox = []
		this.saveAvocateCheckBox = []
		this.getProcedureArray = []
		this.saveAlertsObject = {}
		this.getDistImageName = {}
		this.getCPTArrayList  =[]
		this.getICDArrayList = []
		this.getProcArrayList = []
		this.packesArray = []
		this.GetTemplateFilterWithSurgeonArray = []
		this.feet = 0
		this.inch = 0
		this.pound = 0
		this.getBMI = 0
		this.getElementProcID="";
		this.getElementCPTID="";
		this.getElementICDID="";
		this.Proc_i = 0;
		this.Cpt_i = 0;
		this.Icd_i = 0;
		this.getSlotsData = {}
		this.selectSPITempleteArray = []
		this.getSlotsData.date1 = {hour: 10, minute: 0, second: 0}
		this.getSlotsData.date2 = {hour: 12, minute: 30, second: 0}
		this.getSlotsData.date3 = {hour: 14, minute: 0, second: 0}
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
			Patient_Primary_No : new FormControl(''),
			Patient_Secondary_No : new FormControl(''),
			Patient_Work_No : new FormControl(''),
			Patient_Emergency_No : new FormControl('',[Validators.required]),
			Patient_Email : new FormControl('', [Validators.required]),
			Patient_Religion : new FormControl('', [Validators.required]),
			Patient_Ethinicity : new FormControl('', [Validators.required]),
			Patient_Race : new FormControl('', [Validators.required]),
			Patient_Marital_Status : new FormControl('', [Validators.required]),
			Patient_Nationality : new FormControl('', [Validators.required]),
			Patient_Language : new FormControl('', [Validators.required]),
			Patient_Height_In_Ft : new FormControl(''),
			Patient_Height_In_Inch : new FormControl(''),
			Patient_Weight : new FormControl(0),
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

		this.bookingInfo = new FormGroup({
			VCB_Doctor_Name: new FormControl('', [Validators.required]),
			VCB_Time_Slot: new FormControl('', [Validators.required]),
			VCB_Booking_Date: new FormControl('', [Validators.required]),
		});
		
		this.patient_info.get('Patient_Prefix').setValue('');
		this.patient_info.get('Patient_Sex').setValue('');
		this.patient_info.get('Patient_Religion').setValue('');
		this.patient_info.get('Patient_Ethinicity').setValue('');
		this.patient_info.get('Patient_Race').setValue('');
		this.patient_info.get('Patient_Marital_Status').setValue('');
		this.patient_info.get('Patient_Nationality').setValue('');
		this.patient_info.get('Patient_Language').setValue('');
		if(this.getQueryStringID){
			this.getPatientInfoViaId()
		}
		// this.goWithScript()
		this.hidemenu()
		this.getReligion()
		this.getEthnicity()
		this.getRace()
		this.getNationality()
		this.getLanguage()
		this.getRelationship()
		this.validateSSN()
		this.validatphone()
		this.getSurgeryCenters()
	}
	getPatientInfoViaId(){
		var obj  = {
			Patient_Unique_ID:this.getQueryStringID,
			Slug:this.mySlug
		}
		this.UserService.getPatinetViaId(obj).subscribe((data)=>{
			console.log(data)  
			this.getPatientName = data.Data.Patient_First_Name
			this.getPatientLastName = data.Data.Patient_Last_Name
			this.getPatientEmailId = data.Data.Patient_Email
			this.patient_info.setValue(data.Data);  
			if(data.Data.Patient_Primary_Insurance_Details){
				this.primary_insurance.setValue(data.Data.Patient_Primary_Insurance_Details);
			}
			if(data.Data.Patient_Secondary1_Insurance_Details){
				this.secondary_insurance.setValue(data.Data.Patient_Secondary1_Insurance_Details);  
			}
			if(data.Data.Patient_Secondary2_Insurance_Details){
				this.third_insurance.setValue(data.Data.Patient_Secondary2_Insurance_Details);  
			}
			if(data.Data.Patient_Secondary3_Insurance_Details){
				this.forth_insurance.setValue(data.Data.Patient_Secondary3_Insurance_Details);  
			}
		},err=>{
			console.log(err)
		})
	}
	onLoggedout() {
		localStorage.removeItem ('isLoggedin');
		localStorage.removeItem('loginData');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('setAccToSurgery');

		$("#logout").modal("hide");
		$('body').removeClass('modal-open');

		var uurrll = localStorage.getItem('getUrl')
		if(uurrll){
			localStorage.removeItem('getUrl');
			//window.location.href = 'http://localhost:4200/#'+uurrll
			window.location.href = this.siteLink+uurrll
		}else{
			this.router.navigate(['/login'])
		}
	}

	getReligion(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getReligionListDD(obj).subscribe((data)=>{
			this.getReligionArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getEthnicity(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.EthinicityListDD(obj).subscribe((data)=>{
			this.getEthnicityArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getRace(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getRaceListDD(obj).subscribe((data)=>{
			this.getRaceArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getNationality(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getNationalityListDD(obj).subscribe((data)=>{
			this.getNationalityArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getLanguage(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getLanguageListDD(obj).subscribe((data)=>{
			this.getLanguageArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getRelationship(){
		var obj = {
			Slug: this.mySlug
		}
		this.UserService.getRelationList(obj).subscribe((data)=>{
			this.getRelationshipArray = data.DataList
		},err=>{
			console.log(err)
		})
	}
	getSurgeryCenters(){
		var offid
		if(this.admin.UM_Office_Type == 'S'){
			offid = this.setAccToSurgery.SurgC_Unique_ID
		}else{
			offid = this.setAccToSurgery.PhyO_Surgery_Center_ID
		}
		var obj = {
			Slug: this.mySlug,
			SurgC_Unique_ID: offid
		} 
		this.UserService.GetScListFilterWithPO(obj).subscribe((data)=>{
			console.log('Get Surgery center',data)
			if(!data.DataList[0].SurgC_Unique_ID){
				this.ngOnInit()
			}
			this.sureryCenterSlectedId = data.DataList[0].SurgC_Unique_ID
			this.getSurgeryCenterArray = data.DataList[0]
			this.sureryCenterSlectedName = data.DataList[0].SurgC_DBA_Name
			// this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(this.sureryCenterSlectedId)

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

	onTextChangeOfMedName(type, observation) {
		if (type != "") {
			var obj = {
				Patient_Surgery_Physician_Center_ID: this.setAccToSurgery.PhyO_Unique_ID, 
				Patient_First_Name: this.searchTextForSSN, 
				Slug: this.mySlug, 
			}
			this.UserService.searchWithSSNOrPatient(obj).subscribe(data => {
				this.productNameSuggestion = []
				this.productNameSuggestion = data.DataList
				// console.log(this.productNameSuggestion)
			}, err => {
				console.log(err);
			})
		}
	}
	searchBackSpace(){
		this.productNameSuggestion= []
	}

	getAllDataOfSearch(object){
		console.log(object)
		this.getPatientName = object.Patient_First_Name
		this.getPatientLastName = object.Patient_Last_Name
		this.getQueryStringID = object.Patient_Unique_ID
		this.patient_info.setValue(object);  
		if(object.Patient_Primary_Insurance_Details){
			this.primary_insurance.setValue(object.Patient_Primary_Insurance_Details);
		}
		if(object.Patient_Secondary1_Insurance_Details){
			this.secondary_insurance.setValue(object.Patient_Secondary1_Insurance_Details);  
		}
		if(object.Patient_Secondary2_Insurance_Details){
			this.third_insurance.setValue(object.Patient_Secondary2_Insurance_Details);  
		}
		if(object.Patient_Secondary3_Insurance_Details){
			this.forth_insurance.setValue(object.Patient_Secondary3_Insurance_Details);  
		}

		//Patient_Unique_ID
		//Patient_First_Name

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
			this.primary_insurance.value.PPID_Address = $('#inscPri').val()
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
			this.secondary_insurance.value.PSID_Address = Secstreet+ ', '+Secaddresss
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
				this.third_insurance.get('PSID_Address').setValue(thirdaddresss);
			}else{
				this.third_insurance.get('PSID_Address').setValue(thirdstreet+', ' + thirdaddresss);
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
				this.forth_insurance.get('PSID_Address').setValue(forthaddresss);
			}else{
				this.forth_insurance.get('PSID_Address').setValue(forthstreet+', ' + forthaddresss);
			}
			this.forth_insurance.get('PSID_State').setValue(forthstate)
			this.forth_insurance.get('PSID_City').setValue(forthcity)
			this.forth_insurance.get('PSID_Zip_Code').setValue(forthzipcodes)
			this.forth_insurance.value.PSID_Address = forthstreet+', '+forthaddresss
		}
	}
	checkEmail(eml){
		var obj = {
			UM_Email: eml,
			// Slug:this.mySlug,
			// Patient_Surgery_Physician_Center_ID:this.admin.UM_Surgary_Physician_CenterID

		}
		console.log(obj)
		this.UserService.checkEmail(obj).subscribe((data)=>{
			console.log(data)
			if(!this.getPatientEmailId){
				if(data.Result == false){
					this.checkEmailAddress = false
					this.toster.error(this.translate.instant('Email Address already exist'), this.translate.instant('Error'))
				}else{
					this.checkEmailAddress = true
					this.toster.success(this.translate.instant('Email Address available'), this.translate.instant('Success'))
				}

			}

		},err=>{
			console.log(err)
		})

	}
	isFormData(topic){
		if(this.isFormDataNewData){
			return this.isFormDataNewData.indexOf(topic.Spec_Name) >= 0;

		}
	}




	hidemenu(){
		$(".sidebar-dropdown > a").click(function() {
			$(".side-nav-dropdown").slideUp(200);
			if ($(this).parent().hasClass("active")) {
				$(".sidebar-dropdown").removeClass("active");
				$(this)
				.parent()
				.removeClass("active");
			} else {
				$(".sidebar-dropdown").removeClass("active");
				$(this)
				.next(".side-nav-dropdown")
				.slideDown(200);
				$(this)
				.parent()
				.addClass("active");
			}
		});
	}
	addToggle(){
		$('.header .nav-toggle').on('click', function () {

			$(".left-bar").toggleClass('show-side-nav');
			$(".home").toggleClass('show-full');
			$(".right-bar .section-container").toggleClass('padding-full');


		});
	}
	removeTildSign(data){
		if(data){

			var getnew = data.replace("~", "");
		}
		return (getnew)
	}

	sectionScroll1(el: HTMLElement) {
		// console.log(el)
		// console.log(HTMLElement)
		el.scrollIntoView({behavior: 'smooth'});
	}

	sectionScrollActive(id){
		$('#'+id).on('click', function () {
			$('.make_it_active').removeClass('active');
			$(this).addClass('active');


		});



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
			});


		});
	}
	saveFinalBooing(getid){
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

		console.log(this.patient_info.value)    

		this.UserService.createPatientInOne(this.patient_info.value).subscribe((data)=>{
			console.log(data)
			this.patientUniqueId = data.Data.Patient_Unique_ID
			this.getPatientName = data.Data.Patient_First_Name
			this.getPatientLastName = data.Data.Patient_Last_Name
			this.addBooking(getid)      
		},err=>{
			console.log(err)
		})
	}
	addBooking(getid){
		if(this.patient_info.value.Patient_DOB){
			this.patient_info.value.Patient_DOB = new Date(this.patient_info.value.Patient_DOB);
			this.patient_info.value.Patient_DOB.setHours( this.patient_info.value.Patient_DOB.getHours() + 7 )
		}

		var getmainId
		if(this.patientUniqueId){
			getmainId = this.patientUniqueId
		}else if(this.getQueryStringID){
			getmainId = this.getQueryStringID
		}else if(this.getPatientIdViaSearch){
			getmainId = this.getPatientIdViaSearch
		}else{
			this.toster.warning(this.translate.instant('Please add patient'), this.translate.instant('Warning'))
			return
		}
		var timeArr = []
		var time1 = this.getSlotsData.date1.hour +':'+this.getSlotsData.date1.minute
		timeArr.push(time1)
		var time2 = this.getSlotsData.date2.hour +':'+this.getSlotsData.date2.minute
		timeArr.push(time2)
		var time3 = this.getSlotsData.date3.hour +':'+this.getSlotsData.date3.minute
		timeArr.push(time3)
		var vcBook = {
			VCB_Patient_ID: this.patientUniqueId,
			VCB_Patient_Name: this.getPatientName,
			VCB_Patient_Last_Name: this.getPatientLastName ,
			VCB_Booking_Date: this.bookingInfo.value.VCB_Booking_Date ,
			VCB_Booking_Time: timeArr,
			VCB_Booking_No: '',
			VCB_Doctor_ID: this.bookingInfo.value.VCB_Doctor_Name,
			VCB_Doctor_Name: this.bookingInfo.value.VCB_Doctor_Name,
			VCB_Doc_Uploaded_List: [],
			VCB_Notifications: [],
			VCB_Notifications_Array: [],
			VCB_Booking_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID,
			VCB_Booking_Physician_Office_Name: this.admin.UM_Username,
			VCB_Created_By: this.admin.UM_Unique_ID,
			VCB_User_Name: this.admin.UM_Username,
			VCB_Create_Date: new Date(),
			VCB_Modify_Date: new Date(),
			VCB_Is_Active: true,
			VCB_Is_Deleted: false,
			VCB_Status: 'Action Required',
			VCB_Booked_From: 'VC',
			VCB_TimeZone: this.admin.UM_TimeZone,
			VCB_Approved:  [],
			VCB_Draft: [],
			VCB_Complete:[] ,
			VCB_Cancelled:[] ,
			Slug: this.mySlug,
		}

		console.log(vcBook)
		this.UserService.addVCBooking(vcBook).subscribe((data1)=>{
			console.log(data1)
			this.getBookingID = data1.Data.VCB_Unique_ID
			console.log(this.getBookingID)
			this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
			if(getid == '1'){
				this.router.navigate(['/vc-list'])
			}else if(getid == '2'){
				this.router.navigate(['/vc-list'])
			}
		},err=>{
			console.log(err)
		})
	}  
	goLastLocation(){
		this.location.back()
	}
	getAge(DOB) {
		var today = new Date();
		var birthDate = new Date(DOB);
		var age:any = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			// console.log(m)
			age = age-1
		}
		if(age === 0){
			age  = '<1'
		}

		return age;
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
	loadDynamicCss(){
		var aa  = this
		setTimeout(function(){
			if(aa.admin){
				if(aa.admin.UM_Office_Type == 'S'){
					if(aa.setAccToSurgery){
						if(aa.setAccToSurgery.SurgC_Appearance){
							$(".header").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorDark_Hax)
						}else{
							$(".header").css("background-color", '#006400')
						}
						if(aa.setAccToSurgery.SurgC_Appearance){

							$("h1").css("color", aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax);
							$(".menu li a").hover(function(){
								$(this).css("backgroundColor", aa.setAccToSurgery.SurgC_Appearance.App_HyperlinkHoverText_Hax);
							},
							function(){
								$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax);
							});
							$(".mh-right a").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{

									$(this).css("background",'#fff');
									$(this).css("color", "");
								}
							},

							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
									$(this).css("color", "");
								}
							}
							);
						}
					}else{
						$("h1").css("color", "#2ca36c");
					}
				}else if(aa.admin.UM_Office_Type == 'P'){
					if(aa.setAccToSurgery){
						if(aa.setAccToSurgery.PhyO_Appearance){
							$(".mh-left h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax)
							$(".main-heading h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax)
							$(".header").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorDark_Hax)
							$(".btnsubmit").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
							// $(".btntext").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
						}else{
							$(".mh-left h1").css("color", '#006400')
							$(".main-heading h1").css("color", '#006400')
							$(".header").css("background-color", '#006400')
							$(".btnsubmit").css("background-color",'#04a8c5');
							$(".btntext").css("background-color",'#04a8c5');
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
						}
					}else{
						$("h1").css("color", "#2ca36c");
					}
				}else{
					$(".header").css("background-color", '#006400')
				}
			}
		}, 1);
}



}
//btntext