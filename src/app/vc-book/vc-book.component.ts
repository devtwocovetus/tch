import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
declare var moment: any;
declare var $:any
import { NgxXml2jsonService } from 'ngx-xml2json';
import { DomSanitizer } from '@angular/platform-browser';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface,PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';

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
	User_Password
	User_Passcode
	User_Unique_ID
	getpatientFinalUniqueId
	patIdAlreadyExist: boolean  = true
	siteLink
	getActiveationEmail
	getPasscodeEmail
	public config2: PerfectScrollbarConfigInterface = {};

	@ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: false }) directiveRef?: PerfectScrollbarDirective;
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private sanitizer:DomSanitizer, private translate: TranslateService) { 
		// console.log(localStorage.getItem('isLoggedin'))
		if(!localStorage.getItem('isLoggedin')){
			this.router.navigate(['/login'])
		}
		if(localStorage.getItem('lang')){
			console.log(localStorage.getItem('lang'))
			this.translate.use(localStorage.getItem('lang'));
			localStorage.removeItem('lang')
		}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.getQueryStringID = route.snapshot.queryParamMap.get('id');
		this.getQueryStringName = route.snapshot.queryParamMap.get('name');
		console.log(this.admin)
		// this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.imageLink = environment1.image
		this.siteLink = environment1.siteLink
		if(this.setAccToSurgery){
			this.loadDynamicCss()
		}

	}

	ngOnInit() {
		console.log(this.setAccToSurgery)
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Virtual Booking - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Virtual Booking - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Virtual Booking - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
		// $(".required2").after("<span class='text-danger' style='margin-top: 26%;color:red;'>*</span>");
		/*$(".left_alin_float_body span.text-danger").css({right: '47%',top: '70%', position:'absolute'});*/
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
		var newDate = new Date()

		this.getSlotsData.date1 = {hour: newDate.getHours(), minute: newDate.getMinutes(), second: 0}
		// this.getSlotsData.date2 = {hour: 0, minute: 0, second: 0}
		// this.getSlotsData.date3 = {hour: 0, minute: 0, second: 0}

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
		this.bookingInfo.get('VCB_Booking_Date').setValue(new Date())
		
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
		this.getActEmail()
		this.getActPass()
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
			// this.CheckPatientBooking(this.getQueryStringID)
			// return
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
	getActEmail(){
		var sys = {
			Slug: this.mySlug,
			SET_Name:'Account Activation'
		}

		this.UserService.seletEmailViaName(sys).subscribe((data)=>{
			this.getActiveationEmail = data.Data
		},err=>{
			console.log(err)
		})
	}
	getActPass(){

		var sys1 = {
			Slug: this.mySlug,
			SET_Name:'Activation Passcode'
		}
		this.UserService.seletEmailViaName(sys1).subscribe((data)=>{
			this.getPasscodeEmail = data.Data
		},err=>{
			console.log(err)
		})
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
		this.CheckPatientBooking(this.getQueryStringID)
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
		if(eml){

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
	saveFinalBooing(status){

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
		this.checkEmail(this.patient_info.value.Patient_Email)
		if(this.checkEmailAddress == false){
			this.toster.error(this.translate.instant('Email address alredy exist'), this.translate.instant('Error'))
			return
		}
		if(new Date(this.bookingInfo.value.VCB_Booking_Date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
			this.toster.warning(this.translate.instant('Please select a valid date'), this.translate.instant('Warning'))
			return
		}
		if(this.getQueryStringID){
			this.editPatientDetails(status)
		}else{
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
				this.addBooking(status)      
			},err=>{
				console.log(err)
			})
		}
	}
	editPatientDetails(status){
		this.patient_info.value.Patient_Unique_ID =  this.getQueryStringID
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
		this.patient_info.value.Slug = this.mySlug

		console.log(this.patient_info.value)    

		this.UserService.editPatientDetails(this.patient_info.value).subscribe((data)=>{
			this.addBooking(status)      
		},err=>{
			console.log(err)
		})
	}
	addBooking(status){

		if(this.bookingInfo.value.VCB_Doctor_Name == ''){
			this.toster.warning(this.translate.instant('Please select doctor'),this.translate.instant('Warning'))
			return
		}
		if(this.bookingInfo.value.VCB_Time_Slot == ''){
			this.toster.warning(this.translate.instant('Please select time slot'),this.translate.instant('Warning'))
			return
		}
		if(new Date(this.bookingInfo.value.VCB_Booking_Date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)){
			this.toster.warning(this.translate.instant('Please select a valid date'),this.translate.instant( 'Warning'))
			return
		}
		if(this.getSlotsData.date1 == null){
			this.toster.warning(this.translate.instant('Please select option 1st time'),this.translate.instant( 'Warning'))
			return
		}

		if(this.patient_info.value.Patient_DOB){
			this.patient_info.value.Patient_DOB = new Date(this.patient_info.value.Patient_DOB);
			this.patient_info.value.Patient_DOB.setHours( this.patient_info.value.Patient_DOB.getHours() + 7 )
		}

		if(this.patientUniqueId){
			this.getpatientFinalUniqueId = this.patientUniqueId
		}else if(this.getQueryStringID){
			this.getpatientFinalUniqueId = this.getQueryStringID
		}else{
			this.toster.warning(this.translate.instant('Please add patient'),this.translate.instant('Warning'))
			return
		}
		var timeArr = []
		if(this.getSlotsData.date1.hour.toString().length <= 1){
			this.getSlotsData.date1.hour = '0'+this.getSlotsData.date1.hour
		}
		if(this.getSlotsData.date1.minute.toString().length <= 1){
			this.getSlotsData.date1.minute = '0'+this.getSlotsData.date1.minute
		}
		if(this.getSlotsData.date2 && this.getSlotsData.date2.hour.toString().length <= 1){
			this.getSlotsData.date2.hour = '0'+this.getSlotsData.date2.hour
		}
		if(this.getSlotsData.date2 && this.getSlotsData.date2.minute.toString().length <= 1){
			this.getSlotsData.date2.minute = '0'+this.getSlotsData.date2.minute
		}
		if(this.getSlotsData.date3 && this.getSlotsData.date3.hour.toString().length <= 1){
			this.getSlotsData.date3.hour = '0'+this.getSlotsData.date3.hour
		}
		if(this.getSlotsData.date3 && this.getSlotsData.date3.minute.toString().length <= 1){
			this.getSlotsData.date3.minute = '0'+this.getSlotsData.date3.minute
		}
		var time1 = this.getSlotsData.date1.hour +':'+this.getSlotsData.date1.minute
		timeArr.push(time1)
		if(this.getSlotsData.date2){
			var time2 = this.getSlotsData.date2.hour +':'+this.getSlotsData.date2.minute
			timeArr.push(time2)
		}
		if(this.getSlotsData.date3){
			var time3 = this.getSlotsData.date3.hour +':'+this.getSlotsData.date3.minute
			timeArr.push(time3)
		}
		console.log(timeArr)

		var vcBook = {
			VCB_Patient_ID: this.getpatientFinalUniqueId,
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
			VCB_Time_Slot: this.bookingInfo.value.VCB_Time_Slot,
			VCB_Is_Active: true,
			VCB_Is_Deleted: false,
			VCB_Status: status,
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
			if(this.getBookingID && this.patIdAlreadyExist){
				this.CreateUserandSendMail()
			}
			this.toster.success(this.translate.instant('Data added successfully'), ('Success'))

			this.router.navigate(['/vc-list'])

		},err=>{
			console.log(err)
		})
	}  
	CreateUserandSendMail(){
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
			if(UserResponse.Message='Ok' && UserResponse.Status==1)
			{
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
				var tomail = []
				this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
				this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
				this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("<strong>passcode</strong>", "<strong>"+this.User_Passcode+"</strong>");
				this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);

				tomail.push(this.patient_info.value.Patient_Email)
				var Email:any= {};
				Email.to_email=tomail;
				Email.To_Name=this.patient_info.value.Patient_First_Name
				Email.Bcc_Email=this.getPasscodeEmail.SET_Bcc,
				Email.Cc_Email=this.getPasscodeEmail.SET_CC,
				Email.From_Email = this.getPasscodeEmail.SET_From_Email;
				Email.From_Name = this.getPasscodeEmail.SET_From_Name
				Email.Subject = this.getPasscodeEmail.SET_Name;
				Email.PlainTextContent = "";
				Email.HtmlContent = '<img src='+environment1.image+this.getPasscodeEmail.SET_Header+' height="47.58px" width="115px" alt="logo">'+ "<br><br><br>" + this.getPasscodeEmail.SET_Message + "<br><br><br>" + this.getPasscodeEmail.SET_Footer
				//"<p>This is your account link, Please click here </p>" + "<a href=" + link +this.User_Unique_ID+ ">Link</a> ";
				console.log(Email)

				this.showLoader = true

				this.UserService.sendemail(Email).subscribe((data2)=>{
					console.log(data2)
				},err=>{
					console.log(err)
				})
				var link  = this.siteLink+'/notification-passcode/'

				console.log(this.User_Unique_ID)
				this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
				this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
				this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("http://link.com", "<a href="+link  +this.User_Unique_ID + ">Link</a>");
				this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);

				var Email1:any= {};
				Email1.to_email=tomail;
				Email1.To_Name=this.patient_info.value.Patient_First_Name
				Email1.Bcc_Email=this.getActiveationEmail.SET_Bcc,
				Email1.Cc_Email=this.getActiveationEmail.SET_CC,
				Email1.Subject=this.getActiveationEmail.SET_Name;
				Email1.From_Email = this.getActiveationEmail.SET_From_Email;
				Email1.From_Name = this.getActiveationEmail.SET_From_Name
				Email1.PlainTextContent = "";
				Email1.HtmlContent = '<img src='+environment1.image+this.getActiveationEmail.SET_Header+' height="47.58px" width="115px" alt="logo">' + "<br><br><br>" + this.getActiveationEmail.SET_Message + "<br><br><br>" + this.getActiveationEmail.SET_Footer

				console.log(Email1)

				this.showLoader = true
				this.UserService.sendemail(Email1).subscribe((data1)=>{
					console.log('Response :' +  JSON.stringify(data1))

					this.showLoader = false
				},err=>{
					console.log(err)
				})
			}

			this.router.navigateByUrl('/vc-list')
			this.showLoader = false
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
						$(".btntext").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
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
randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
}
CheckPatientBooking(patId){
	var obj = {
		Slug: this.mySlug,
		PB_Booking_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID,
		PB_Patient_ID: patId
	}
	this.UserService.CheckPatientBooking(obj).subscribe(data => {
		console.log(data)
		if(data.IsAvailable){
			// this.toster.warning('Booking already exist', 'Warning')
			this.patIdAlreadyExist = false
		}
	}, err => {
		console.log(err);
	})
}

}
//btntext