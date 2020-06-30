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
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { PerfectScrollbarConfigInterface,PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-booking',
	templateUrl: './booking.component.html',
	styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
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
	Alrt_Is_Consent_Complete
	Alrt_Is_Consent_Needed
	Alrt_Is_HP_Needed
	Alrt_Is_Latex_Allergy
	Alrt_Is_No_Insurance_Complete
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
	User_Password
	User_Passcode
	getpatientFinalUniqueId
	User_Unique_ID
	patIdAlreadyExist: boolean  = true
	siteLink
	getActiveationEmail
	getPasscodeEmail
	checkBtn:boolean = false
	surgernArray
	procdeleted
	cptdeleted
	icddeleted
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
		this.selectSPITempleteArray = []
		this.surgernArray = []
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
			// Patient_Incient_Detail:new FormControl({value: '', disabled: true},),
			// Patient_Surgical_Procedure_Information:new FormControl({value: '', disabled: true},),
			// Patient_Preoprative_Medical_Clearance:new FormControl({value: '', disabled: true},),
			// Patient_Special_Request:new FormControl({value: '', disabled: true},),
			// Patient_Alerts:new FormControl({value: '', disabled: true},),
			// Patient_Insurance_Precertification_Authorization:new FormControl({value: '', disabled: true},),
			// Patient_Doc_Uploaded_List:new FormControl({value: '', disabled: true},),
			// Patient_Form:new FormControl({value: '', disabled: true},),
			Patient_Surgery_Physician_Center_ID:new FormControl({value: '', disabled: true},),
			Patient_Office_Type:new FormControl({value: '', disabled: true},),
			Patient_Data:new FormControl({value: '', disabled: true},),
			Patient_Insurance_Type:new FormControl({value: '', disabled: true},),
			Patient_Response_Data:new FormControl({value: '', disabled: true},),
			Slug:new FormControl({value: '', disabled: true},),
		});
		this.primary_insurance = new FormGroup({
			PPID_Relation_To_Patient : new FormControl('', [Validators.required]),
			PPID_Subscriber_Name : new FormControl(this.patient_info.value.Patient_First_Name + this.patient_info.value.Patient_Last_Name,),
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
		this.incident_form = new FormGroup({
			Inci_Type : new FormControl('',),
			Inci_DOI : new FormControl('',),
			Inci_Employee_Name : new FormControl('',),
			Inci_Employee_Address : new FormControl('',),
			Inci_Employee_Phone_No : new FormControl('',),
			Inci_Is_This_Lien : new FormControl('',),
			Inci_Attorney_Name : new FormControl('',),
			Inci_Attorney_Phone_No : new FormControl('',),
			Inci_TimeOfIncident : new FormControl('',),
			Inci_Comment : new FormControl('',),
			Inci_Claim_No: new FormControl('',),
			Inci_Type_ID: new FormControl('',),
		})
		this.surgery_proc = new FormGroup({ 
			SPI_Surgery_Center_Name : new FormControl('', ),
			SPI_Surgeon_ID : new FormControl('',),
			SPI_Assi_Surgeon_ID : new FormControl('',),
			SPI_Time : new FormControl('',),
			SPI_Date : new FormControl('',),
			SPI_Duration: new FormControl(90,),
			SPI_TimeZone: new FormControl('',),
			SPI_Anesthesia_Type: new FormControl('',),
			SPI_Block_Type: new FormControl('',),
			SPI_Procedure: new FormControl('',),
			cptSearch:new FormControl('',),
			icdSearch:new FormControl('',),
			procedureSearch:new FormControl('',),
			PB_Booking_Surgery_Center_ID:new FormControl('',),
			SPI_Surgery_Center_ID:new FormControl('',),
		})
		this.pre_medical_clear = new FormGroup({
			PMC_Is_Require_Pre_Op_Medi_Clearance : new FormControl('',),
			PMC_Clearing_Physician_Name : new FormControl(''),
			PMC_Is_Require_EKG : new FormControl('',),
		})
		this.special_request_form = new FormGroup({
			SR_Is_Special_Equip_Req : new FormControl('',),
			SR_Equip_Name : new FormControl('',),
			SR_Supplies_Name : new FormControl('',),
			SR_Instrumentation_Name : new FormControl('',),
			SR_Other : new FormControl('',),
		})
		this.insurence_pre_auth = new FormGroup({
			IPA_Insurace_Company_Phone_No : new FormControl('',),
			IPA_Insurace_Company_Representative : new FormControl('',),
			IPA_Authorization_Name : new FormControl('',),
			IPA_DOA : new FormControl('',),
		})
		this.patient_info.get('Patient_Prefix').setValue('');
		this.patient_info.get('Patient_Sex').setValue('');
		this.patient_info.get('Patient_Religion').setValue('');
		this.patient_info.get('Patient_Ethinicity').setValue('');
		this.patient_info.get('Patient_Race').setValue('');
		this.patient_info.get('Patient_Marital_Status').setValue('');
		this.patient_info.get('Patient_Nationality').setValue('');
		this.patient_info.get('Patient_Language').setValue('');
		this.pre_medical_clear.get('PMC_Is_Require_Pre_Op_Medi_Clearance').setValue('')
		this.pre_medical_clear.get('PMC_Is_Require_EKG').setValue('')
		this.special_request_form.get('SR_Is_Special_Equip_Req').setValue('')
		this.special_request_form.get('SR_Equip_Name').setValue('')
		this.special_request_form.get('SR_Supplies_Name').setValue('')
		this.special_request_form.get('SR_Instrumentation_Name').setValue('')
		this.surgery_proc.get('SPI_Surgery_Center_ID').setValue('')
		this.surgery_proc.get('SPI_Surgeon_ID').setValue('')
		this.surgery_proc.get('SPI_Assi_Surgeon_ID').setValue('')
		this.surgery_proc.get('SPI_Anesthesia_Type').setValue('')
		this.surgery_proc.get('SPI_Block_Type').setValue('')
		if(this.getQueryStringID){
			this.getPatientInfoViaId()
		}
		this.getAllList()
		this.lefTtoRight()
		this.hidemenu()
		this.validateSSN()
		this.validatphone()
		this.getSurgeryCenters()
		$( "textarea" ).keyup( function() {
			$( this ).html( $( this ).val().replace(/\n/g, '<br />') );
		});
	}
	getAllList(){
		this.showLoader = true
		var obj = {
			Slug: this.mySlug
		}
		var obj1 = {
			Slug:this.mySlug,
			Alert_Create_By:this.admin.UM_Unique_ID
		}
		var sys = {
			Slug: this.mySlug,
			SET_Name:'Account Activation'
		}
		var sys1 = {
			Slug: this.mySlug,
			SET_Name:'Activation Passcode'
		}
		var surphyNewId
		if(this.admin.UM_Office_Type == "S"){
			surphyNewId = this.setAccToSurgery.SurgC_Unique_ID
		}else if (this.admin.UM_Office_Type == "P"){
			surphyNewId = this.setAccToSurgery.PhyO_Surgery_Center_ID
		}else{
			this.toster.error('Something Went Wrong', 'Error')
		}
		var surgens= {
			Staff_Surgery_Physician_Office_ID:surphyNewId,
			Staff_Role_Name:'Doctor',
			Slug:this.mySlug
		}

		let religion = this.UserService.getReligionListDD(obj).map(res =>res)
		let ethenicity = this.UserService.EthinicityListDD(obj).map(res =>res)
		let race = this.UserService.getRaceListDD(obj).map(res =>res)
		let nationality = this.UserService.getNationalityListDD(obj).map(res =>res)
		let language = this.UserService.getLanguageList(obj).map(res =>res)
		let realtion = this.UserService.getRelationList(obj).map(res =>res)
		let incident= this.UserService.incidentListDD(obj).map(res =>res)
		let anesthesia =  this.UserService.getAnesthesiaListForDD(obj).map(res =>res)
		let block =  this.UserService.blockListDD(obj).map(res =>res)
		let equipment =  this.UserService.equipmentListDD(obj).map(res =>res)
		let supplies =  this.UserService.getSuppliesListDD(obj).map(res =>res)
		let instruments =  this.UserService.getInstrumentsListDD(obj).map(res =>res)
		let alets =  this.UserService.getAlertListForDropDown(obj1).map(res =>res)
		let getSyslist = this.UserService.seletEmailViaName(sys).map(res =>res)
		let getpassCode = this.UserService.seletEmailViaName(sys1).map(res =>res)
		let getSurgens = this.UserService.SurgeonList(surgens).map(res =>res)
		Observable.forkJoin([religion, ethenicity, race, nationality, language, realtion,
			incident, anesthesia, block, equipment, supplies, instruments, alets, getSyslist, getpassCode, getSurgens ]).subscribe(results =>{
				this.getReligionArray = results[0].DataList
				this.getEthnicityArray = results[1].DataList
				this.getRaceArray = results[2].DataList
				this.getNationalityArray = results[3].DataList
				this.getLanguageArray = results[4].DataList
				this.getRelationshipArray = results[5].DataList
				this.getIncidentArray = results[6].DataList
				this.getAnesthesiaArray  = results[7].DataList
				this.getBlockArray  = results[8].DataList
				this.getEquipmentArray  = results[9].DataList
				this.getSuppliesArray  = results[10].DataList
				this.getInstrumentsArray  = results[11].DataList
				this.getAlertArray  = results[12].DataList
				this.getActiveationEmail = results[13].Data
				this.getPasscodeEmail = results[14].Data
				this.surgernArray = results[15].DataList
				console.log(results[15].DataList)
				this.showLoader = false
			})
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
				this.CheckPatientBooking(this.getQueryStringID)

			},err=>{
				console.log(err)
			})
		}
		onLoggedout() {
			localStorage.removeItem ('isLoggedin');
			localStorage.removeItem('loginData');
			localStorage.removeItem('setAccToSurgery');
			localStorage.removeItem('setAccToSurgery');
			localStorage.removeItem('userPermission')

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
				this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(this.sureryCenterSlectedId)

			},err=>{
				console.log(err)
			})
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
				this.reqData.pbStatus[0] = ""
				this.myArr[0]= ""
			} else {
				this.totalTr.splice(i, 1)
				this.reqData.name.splice(i, 1) // = ""
				this.reqData.file.splice(i, 1) // = ""
				this.reqData.pbStatus.splice(i, 1)
				this.myArr.splice(i, 1)

			}

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
				$(".sec-insr").show();
				$('.add-sec-insr').hide()
				this.secondary_insurance.setValue(object.Patient_Secondary1_Insurance_Details)
			}
			if(object.Patient_Secondary2_Insurance_Details){
				$(".third-insr").show();
				$('.add-third-insr').hide()
				this.third_insurance.setValue(object.Patient_Secondary2_Insurance_Details)
			}
			if(object.Patient_Secondary3_Insurance_Details){
				$(".forth-insr").show();
				$('.add-forth-insr').hide()
				this.forth_insurance.setValue(object.Patient_Secondary3_Insurance_Details)
			}
			this.CheckPatientBooking(this.getQueryStringID)
			if(object){
				this.createSearchingLog(object, 'success')
			}else{
				this.createSearchingLog('Something Went Wrong', 'error')
			}


			//Patient_Unique_ID
			//Patient_First_Name

		}

		findCPTwithCat(){
			var obj ={
				CPT_Code: this.surgery_proc.value.cptSearch,
				Slug:this.mySlug
			}
			this.UserService.findCPTwithCat(obj).subscribe((data)=>{
				console.log(data)
				this.getCPTArray = data.DataList
			},err=>{
				console.log(err)
			})
		}
		findICDwithCat(){
			var obj ={
				ICD_ICD10_PCS_Code: this.surgery_proc.value.icdSearch,
				Slug:this.mySlug
			}
			this.UserService.findICDwithCat(obj).subscribe((data)=>{
				console.log(data)
				this.getICDArray = data.DataList
			},err=>{
				console.log(err)
			})
		}
		findProcedurewithCat(){
			var obj ={
				Pro_Procedure_Code_Category: this.surgery_proc.value.procedureSearch,
				Slug:this.mySlug
			}
			this.UserService.findProcedurewithCat(obj).subscribe((data)=>{
				console.log(data)
				this.getProcedureArray = data.DataList
			},err=>{
				console.log(err)
			})
		}
		isSelected(topic){
			if(this.trysomeing){
				return this.trysomeing.indexOf(topic.Alrt_Name) >= 0;

			}
		}
		onChange(category, isChecked: boolean) {

			// this.lead_category1  = this.getIdOfLeadCat
			if(isChecked) {
				if(this.setAccToSurgery){
					if(this.setAccToSurgery.PhyO_Appearance){
						if (this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax) {
							$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
						}
					}
				}
				
				this.saveAlertsCheckBox.push({
					Alrt_Name:category.Alert_Name,
					Alrt_Unique_ID: category.Alert_Unique_ID,
					Alrt_Is_Needed: true
				});
			}
			else {
				// $(".fa-check").css("background-color",)
				var index = this.saveAlertsCheckBox.findIndex(x => x.Alrt_Unique_ID == category.Alert_Unique_ID);
				this.saveAlertsCheckBox.splice(index,1);
			}
			console.log(this.saveAlertsCheckBox	)

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
				this.toster.warning(this.translate.instant('Please fill the name'), this.translate.instant('Warning'))
				return
			}
			if(this.primary_insurance.value.PPID_Subscriber_SSN_No == '' || this.primary_insurance.value.PPID_Subscriber_SSN_No == undefined || this.primary_insurance.value.PPID_Subscriber_SSN_No == null){
				this.toster.warning(this.translate.instant('Please fill the SSN no'), this.translate.instant('Warning'))
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
				this.toster.warning(this.translate.instant('Please fill the primary insurance'), this.translate.instant('Warning'))
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
		savePrimaryInsurancePDF(){}
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
					Slug:this.mySlug,
					// Patient_Surgery_Physician_Center_ID:this.admin.UM_Surgary_Physician_CenterID
				}
				console.log(obj)
				this.UserService.checkEmail(obj).subscribe((data)=>{
					console.log(data)
					if(!this.getPatientEmailId){
						if(data.Result == false){
							this.checkEmailAddress = false
							this.toster.error(this.translate.instant('Email Address already exist'),this.translate.instant( 'Error'))
						}else{
							this.checkEmailAddress = true
							this.toster.success(this.translate.instant('Email Address available'),this.translate.instant( 'Success'))
						}
					}
				},err=>{
					console.log(err)
				})
			}

		}

		lefTtoRight(){
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
			$(window).scroll(function() {
				if ($(this).scrollTop() > 5) {
					$('#btndiv').addClass('fixed');
				} else {
					$('#btndiv').removeClass('fixed');
				}
			});
			function CheckExistValueInControl(ControlID, Value){
				var IsTrue = false;
				// debugger;
				if($("#"+ ControlID +" div").length >0){
					$("#"+ ControlID +" div").each(function() {
						// debugger;
						var vl=$.trim(Value.replace(/\s+/g, ' '))
						if(this.innerText == vl)
							IsTrue = true				    
					});				
				}
				else{
					IsTrue =false
				}
				return IsTrue;
			}




			function atLeastOneRadio(buttonGroupName) {
				return ($('input[type=radio][name=' + buttonGroupName + ']:checked').size() > 0);
			}							

			$('body').on('click','div[name=proclist] > div',function(){ 
				// debugger;                
				//$(".ui-widget-content").removeClass('ui-selected');
				$(".ui-widget-content").css({"background":"","color":""});
				myThisFucn.getElementProcID=$(this).attr('id');
				// $(this).addClass('ui-selected');
				$(this).css({"background":"#F39814","color":"white"});

			});

			$('body').on('click','#deleteid2',function(){
				// debugger;
				if(myThisFucn.getElementProcID != "")
				{
					$("#" + myThisFucn.getElementProcID).remove();    
				}
			});

			$('body').on('click','div[name=cptlist] > div',function(){ 
				// debugger;                
				//$(".ui-widget-content").removeClass('ui-selected');
				$(".ui-widget-content").css({"background":"","color":""});
				myThisFucn.getElementCPTID=$(this).attr('id');
				// $(this).addClass('ui-selected');
				$(this).css({"background":"#F39814","color":"white"});

			});

			$('body').on('click','#deleteid',function(){
				// debugger;
				if(myThisFucn.getElementCPTID != "")
				{
					$("#" + myThisFucn.getElementCPTID).remove();    
				}
			});

			$('body').on('click','div[name=icdlist] > div',function(){ 
				// debugger;                
				//$(".ui-widget-content").removeClass('ui-selected');
				$(".ui-widget-content").css({"background":"","color":""});
				myThisFucn.getElementICDID=$(this).attr('id');
				// $(this).addClass('ui-selected');
				$(this).css({"background":"#F39814","color":"white"});

			});

			$('body').on('click','#deleteid1',function(){
				// debugger;
				if(myThisFucn.getElementICDID != "")
				{
					$("#" + myThisFucn.getElementICDID).remove();    
				}
			});
			$('body').on('click', '#moveCptRight', function(e) {
				e.preventDefault();
				var cptSelelectedListData = $('#cptlistid');
				var val = '';
				var textData = '';
				// var selectedData = $('.cptSearchListdata').val();
				var selectedData  = $('.cptSearchListdata option:selected').text();
				var selectedDataId  = $('.cptSearchListdata').val();
				selectedData = selectedData.length > 0 ? selectedData + ',' : selectedData;
				var newstring = selectedData //.replace(/\D/g,'')
				if (myThisFucn.getCPTArrayList.some(e => e.CPTS_Description === newstring)) {
					return
				}
				myThisFucn.getCPTArrayList.push({
					CPTS_Code: selectedDataId[0],
					CPTS_Description: newstring
				})
				$.each($(".cptSearchListdata option:selected"), function() {
					selectedData = selectedData + $(this).val() + ',';
					textData = $(this).text();
					// debugger;
					if(CheckExistValueInControl('cptlistid',textData) == false)
					{					
						cptSelelectedListData.append("<div id='cptdiv_"+ myThisFucn.Cpt_i +"' class='ui-widget-content  ui-selectee'>" + textData + "</div>");
						myThisFucn.Cpt_i = myThisFucn.Cpt_i + 1;
					}

				});
				selectedData = selectedData.substring(0, (selectedData.length - 1));
				$('.cptCodeSelected').val(selectedData);

				$('.cptCodesAdded').val(selectedData);
				console.log(myThisFucn.getCPTArrayList)
			});


			$('body').on('click', '#moveIcdRight', function(e) {
				e.preventDefault();
				var icdSelelectedListData = $('#icdlistid');
				var val = '';
				var textData = '';
				var titleData='';
				// var selectedData = $('.icdSearchListdata').val();
				var selectedData = $('.icdSearchListdata option:selected').text();
				var selectedDataId = $('.icdSearchListdata').val();
				selectedData = selectedData.length > 0 ? selectedData + ',' : selectedData;
				var newstring = selectedData  //.replace(/\-.+/g,"$'");
				console.log(newstring)
				if (myThisFucn.getICDArrayList.some(e => e.ICD_Description === newstring)) {
					return
				}

				myThisFucn.getICDArrayList.push({
					ICD_Code: selectedDataId[0],
					ICD_Description: newstring,
				})
				console.log(myThisFucn.getICDArrayList)
				$.each($(".icdSearchListdata option:selected"), function() {
					selectedData = selectedData + $(this).val() + ',';
					textData = $(this).text();
					titleData = $(this).attr("title");
					if(CheckExistValueInControl('icdlistid',textData) == false)
					{
						icdSelelectedListData.append("<div  title='"+titleData+"' id='icddiv_"+ myThisFucn.Icd_i +"' class='ui-widget-content  ui-selectee'>" + textData + "</div>");
						myThisFucn.Icd_i = myThisFucn.Icd_i + 1;
					}
				});
				selectedData = selectedData.substring(0, (selectedData.length - 1));
				$('.icdCodeSelected').val(selectedData);

				$('.icdCodesAdded').val(selectedData);
				console.log(myThisFucn.getICDArrayList)
			});

			$('body').on('click', '#moveProdedureRight', function(e) {

				e.preventDefault();
				var procSelelectedListData = $('#proclistid');
				var val = '';
				var textDataProc = '';
				var titleData='';
				var selectedDataProc = $('.ProdSearchListdata option:selected').text();
				var selectDataProcId  =$('.ProdSearchListdata').val();
				selectedDataProc = selectedDataProc.length > 0 ? selectedDataProc + ',' : selectedDataProc;
				console.log(selectedDataProc, selectDataProcId)
				var newstring = '' //.replace(/\-.+/g,"$'");
				newstring = selectedDataProc
				// console.log(newstring)var newstring = selectedData.replace(/\D/g,'')

				if (myThisFucn.getProcArrayList.some(e => e.Proc_Code === selectDataProcId[0])) {
					return
				}
				if(selectDataProcId){

					myThisFucn.getProcArrayList.push({
						Proc_Code: selectDataProcId[0],
						Proc_Description: newstring
					})
				}
				newstring = ''
				console.log(myThisFucn.getProcArrayList)
				$.each($(".ProdSearchListdata option:selected"), function() {
					selectedDataProc = selectedDataProc + $(this).val() + ',';
					textDataProc = $(this).text();
					titleData = $(this).attr("title");
					if(CheckExistValueInControl('proclistid',textDataProc) == false){
						procSelelectedListData.append("<div title='"+titleData+"' id='procdiv_"+ myThisFucn.Proc_i +"' class='ui-widget-content  ui-selectee'>" + textDataProc + "</div>");	
						myThisFucn.Proc_i = myThisFucn.Proc_i + 1;
					}				
				});
				selectedDataProc = selectedDataProc.substring(0, (selectedDataProc.length - 1));
				$('.procCodeSelected').val(selectedDataProc);

				$('.procCodesAdded').val(selectedDataProc);
				// console.log(selectedData)
			});

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

			this.showLoader = true

			if(this.getQueryStringID || this.getPatientIdViaSearch){
				this.surgery_proc.value.SPI_CPT_SelectedList = this.getCPTArrayList
				this.surgery_proc.value.SPI_ICD_SelectedList = this.getICDArrayList
				this.surgery_proc.value.SPI_Procedure_SelectedList = this.getProcArrayList
				this.surgery_proc.value.SPI_Surgery_Center_ID = this.sureryCenterSlectedId

				if(this.patient_info.value.Patient_Prefix == ''){
					this.toster.warning(this.translate.instant('please select Prefix'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Sex == ''){
					this.toster.warning(this.translate.instant('please select Gender'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Religion == ''){
					this.toster.warning(this.translate.instant('please select Religion'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Ethinicity == ''){
					this.toster.warning(this.translate.instant('please select Ethinicity'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Race == ''){
					this.toster.warning(this.translate.instant('please select Race'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Marital_Status == ''){
					this.toster.warning(this.translate.instant('please select Marital Status'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Nationality == ''){
					this.toster.warning(this.translate.instant('please select Nationality'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Language == ''){
					this.toster.warning(this.translate.instant('please select Language'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				var uniqueIdOfPat
				if(this.getQueryStringID){
					uniqueIdOfPat = this.getQueryStringID
				}else{
					uniqueIdOfPat = this.getPatientIdViaSearch
				}
				this.patient_info.value.Patient_Unique_ID = uniqueIdOfPat
				this.primary_insurance.get('PPID_Subscriber_Name').setValue($('#primarynamevalue').val())
				this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue($('#u22_input').val())
				this.primary_insurance.get('PPID_DOB').setValue($('#getdob').val())
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

				if(this.third_insurance.value.PSID_Subscriber_Name && this.third_insurance.value.PSID_Subscriber_SSN_No){


					this.patient_info.value.Patient_Secondary2_Insurance_Details = this.third_insurance.value
				}
				if(this.forth_insurance.value.PSID_Subscriber_Name && this.forth_insurance.value.PSID_Subscriber_SSN_No){

					this.patient_info.value.Patient_Secondary3_Insurance_Details = this.forth_insurance.value
				}    

				
				if(this.surgery_proc.value.SPI_Surgeon_ID == ''|| this.surgery_proc.value.SPI_Surgeon_ID == undefined || this.surgery_proc.value.SPI_Surgeon_ID == null){
					this.toster.warning(this.translate.instant('Please fill Surgeon Name'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Assi_Surgeon_ID == ''|| this.surgery_proc.value.SPI_Assi_Surgeon_ID == undefined || this.surgery_proc.value.SPI_Assi_Surgeon_ID == null){
					this.toster.warning(this.translate.instant('Please fill Assi Surgeon Name'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Date == ''|| this.surgery_proc.value.SPI_Date == undefined || this.surgery_proc.value.SPI_Date == null){
					this.toster.warning(this.translate.instant('Please fill Date'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Time == ''|| this.surgery_proc.value.SPI_Time == undefined || this.surgery_proc.value.SPI_Time == null){
					this.toster.warning(this.translate.instant('Please fill Time'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Duration == ''|| this.surgery_proc.value.SPI_Duration == undefined || this.surgery_proc.value.SPI_Duration == null){
					this.toster.warning(this.translate.instant('Please fill Duration'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Anesthesia_Type == ''|| this.surgery_proc.value.SPI_Anesthesia_Type == undefined || this.surgery_proc.value.SPI_Anesthesia_Type == null){
					this.toster.warning(this.translate.instant('Please fill Anesthesia Type'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Block_Type == ''|| this.surgery_proc.value.SPI_Block_Type == undefined || this.surgery_proc.value.SPI_Block_Type == null){
					this.toster.warning(this.translate.instant('Please fill Block Type'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Procedure_SelectedList == ''|| this.surgery_proc.value.SPI_Procedure_SelectedList == undefined || this.surgery_proc.value.SPI_Procedure_SelectedList == null){
					this.toster.warning(this.translate.instant('Please fill Procedure'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_CPT_SelectedList == ''|| this.surgery_proc.value.SPI_CPT_SelectedList == undefined || this.surgery_proc.value.SPI_CPT_SelectedList == null){
					this.toster.warning(this.translate.instant('Please fill CPT'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_ICD_SelectedList == ''|| this.surgery_proc.value.SPI_ICD_SelectedList == undefined || this.surgery_proc.value.SPI_ICD_SelectedList == null){
					this.toster.warning(this.translate.instant('Please fill ICD'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				this.patient_info.value.Slug = this.mySlug
				this.patient_info.value.Patient_Created_By = this.admin.UM_Unique_ID
				this.patient_info.value.Patient_Modify_Date = new Date()
				this.patient_info.value.Patient_User_Name = this.admin.UM_Username
				this.patient_info.value.Patient_Is_Deleted = false
				this.patient_info.value.Patient_Surgery_Physician_Center_ID = this.admin.UM_Surgary_Physician_CenterID
				this.patient_info.value.Patient_Office_Type = this.admin.UM_Office_Type
				this.patient_info.value.Patient_TimeZone = this.admin.UM_TimeZone
				this.patient_info.value.Patient_DOB = new Date(this.patient_info.value.Patient_DOB)
				this.patient_info.value.Patient_Body_Mass_Index  = $('#lblBMIText').val()
				console.log('Patient Info',this.patient_info.value)
				this.UserService.editPatientDetails(this.patient_info.value).subscribe((data)=>{
					if(this.checkBtn == true){
						return
					}
					this.checkBtn = true
					console.log(data)
					
					if(data.Data.Patient_Unique_ID == null || data.Data.Patient_Unique_ID == undefined || data.Data.Patient_Unique_ID == ''){
						this.toster.error(this.translate.instant('Something went wrong'),this.translate.instant( 'Error'))
						return
					}else{
						this.addBooking(getid)
					}
					// this.router.navigateByUrl('/dashboard')
				},err=>{
					console.log(err)
				})
				
			}else{
				if(this.patient_info.value.Patient_Prefix == ''){
					this.toster.warning(this.translate.instant('please select Prefix'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Sex == ''){
					this.toster.warning(this.translate.instant('please select Gender'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Religion == ''){
					this.toster.warning(this.translate.instant('please select Religion'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Ethinicity == ''){
					this.toster.warning(this.translate.instant('please select Ethinicity'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Race == ''){
					this.toster.warning(this.translate.instant('please select Race'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Marital_Status == ''){
					this.toster.warning(this.translate.instant('please select Marital Status'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Nationality == ''){
					this.toster.warning(this.translate.instant('please select Nationality'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				if(this.patient_info.value.Patient_Language == ''){
					this.toster.warning(this.translate.instant('please select Language'), this.translate.instant('Warning'))
					this.showLoader = false
					return

				}
				this.checkEmail(this.patient_info.value.Patient_Email)
				if(this.checkEmailAddress == false){
					this.toster.error(this.translate.instant('Email address alredy exist'),this.translate.instant( 'Error'))
					this.showLoader = false
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
				this.surgery_proc.value.SPI_CPT_SelectedList = this.getCPTArrayList
				this.surgery_proc.value.SPI_ICD_SelectedList = this.getICDArrayList
				this.surgery_proc.value.SPI_Procedure_SelectedList = this.getProcArrayList
				this.surgery_proc.value.SPI_Surgery_Center_ID = this.sureryCenterSlectedId
				this.surgery_proc.value.SPI_Surgeon_Name = $("#surgnName option:selected").text();
				this.surgery_proc.value.SPI_Assi_Surgeon_Name = $("#cosurgnname option:selected").text();

				if(this.surgery_proc.value.SPI_Surgery_Center_ID == ""){
					this.toster.warning(this.translate.instant('Please fill Surgery Center'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Surgeon_ID == ''|| this.surgery_proc.value.SPI_Surgeon_ID == undefined || this.surgery_proc.value.SPI_Surgeon_ID == null){
					this.toster.warning(this.translate.instant('Please fill Surgeon Name'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Assi_Surgeon_ID == ''|| this.surgery_proc.value.SPI_Assi_Surgeon_ID == undefined || this.surgery_proc.value.SPI_Assi_Surgeon_ID == null){
					this.toster.warning(this.translate.instant('Please fill Assi Surgeon Name'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Date == ''|| this.surgery_proc.value.SPI_Date == undefined || this.surgery_proc.value.SPI_Date == null){
					this.toster.warning(this.translate.instant('Please fill Date'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Time == ''|| this.surgery_proc.value.SPI_Time == undefined || this.surgery_proc.value.SPI_Time == null){
					this.toster.warning(this.translate.instant('Please fill Time'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Duration == ''|| this.surgery_proc.value.SPI_Duration == undefined || this.surgery_proc.value.SPI_Duration == null){
					this.toster.warning(this.translate.instant('Please fill Duration'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Anesthesia_Type == ''|| this.surgery_proc.value.SPI_Anesthesia_Type == undefined || this.surgery_proc.value.SPI_Anesthesia_Type == null){
					this.toster.warning(this.translate.instant('Please fill Anesthesia Type'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Block_Type == ''|| this.surgery_proc.value.SPI_Block_Type == undefined || this.surgery_proc.value.SPI_Block_Type == null){
					this.toster.warning(this.translate.instant('Please fill Block Type'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_Procedure_SelectedList == ''|| this.surgery_proc.value.SPI_Procedure_SelectedList == undefined || this.surgery_proc.value.SPI_Procedure_SelectedList == null){
					this.toster.warning(this.translate.instant('Please Procedure'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_CPT_SelectedList == ''|| this.surgery_proc.value.SPI_CPT_SelectedList == undefined || this.surgery_proc.value.SPI_CPT_SelectedList == null){
					this.toster.warning(this.translate.instant('Please fill CPT'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}
				if(this.surgery_proc.value.SPI_ICD_SelectedList == ''|| this.surgery_proc.value.SPI_ICD_SelectedList == undefined || this.surgery_proc.value.SPI_ICD_SelectedList == null){
					this.toster.warning(this.translate.instant('Please fill ICD'), this.translate.instant('Warning'))
					this.showLoader = false
					return
				}

				this.primary_insurance.get('PPID_Subscriber_Name').setValue($('#primarynamevalue').val())
				// this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue($('#u22_input').val())
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

				if(this.third_insurance.value.PSID_Subscriber_Name && this.third_insurance.value.PSID_Subscriber_SSN_No){


					this.patient_info.value.Patient_Secondary2_Insurance_Details = this.third_insurance.value
				}
				if(this.forth_insurance.value.PSID_Subscriber_Name && this.forth_insurance.value.PSID_Subscriber_SSN_No){

					this.patient_info.value.Patient_Secondary3_Insurance_Details = this.forth_insurance.value
				}    

				console.log(this.patient_info.value)		
				this.UserService.createPatientInOne(this.patient_info.value).subscribe((data)=>{
					if(this.checkBtn == true){
						return
					}
					this.checkBtn = true
					console.log(data)
					this.patientUniqueId = data.Data.Patient_Unique_ID
					this.getPatientName = data.Data.Patient_First_Name
					this.getPatientLastName = data.Data.Patient_Last_Name
					this.addBooking(getid)			
				},err=>{
					console.log(err)
				})

			}
		}
		addBooking(getid){
			if(this.patient_info.value.Patient_DOB){
				this.patient_info.value.Patient_DOB = new Date(this.patient_info.value.Patient_DOB);
				this.patient_info.value.Patient_DOB.setHours( this.patient_info.value.Patient_DOB.getHours() + 7 )
			}
			if(this.surgery_proc.value.SPI_Date){
				this.surgery_proc.value.SPI_Date = new Date(this.surgery_proc.value.SPI_Date);
				this.surgery_proc.value.SPI_Date.setHours(this.surgery_proc.value.SPI_Date.getHours() + 7 )
			}
			this.incident_form.value.Inci_Created_By= this.admin.UM_Unique_ID
			this.incident_form.value.Inci_User_Name = this.admin.UM_Username
			this.incident_form.value.Inci_Create_Date = new Date()
			this.incident_form.value.Inci_Modify_Date = new Date()
			this.incident_form.value.Inci_Is_Active = true
			this.incident_form.value.Inci_Type = $('#getinciIDbySelect option:selected').text()
			this.incident_form.value.Inci_Is_Deleted = false
			this.incident_form.value.Inci_TimeZone = this.admin.UM_TimeZone
			// For procedure Info
			this.surgery_proc.value.SPI_Created_By= this.admin.UM_Unique_ID
			this.surgery_proc.value.SPI_User_Name = this.admin.UM_Username
			this.surgery_proc.value.SPI_Surgery_Center_Name = this.sureryCenterSlectedName
			this.surgery_proc.value.SPI_Create_Date = new Date()
			this.surgery_proc.value.SPI_Modify_Date = new Date()
			this.surgery_proc.value.SPI_Is_Active = true
			this.surgery_proc.value.SPI_Is_Deleted = false
			this.surgery_proc.value.SPI_TimeZone = this.admin.UM_TimeZone
			this.surgery_proc.value.SPI_CPT_SelectedList = this.getCPTArrayList
			this.surgery_proc.value.SPI_ICD_SelectedList = this.getICDArrayList
			this.surgery_proc.value.SPI_Procedure_SelectedList = this.getProcArrayList
			this.surgery_proc.value.SPI_TimeZone = this.admin.UM_TimeZone
			this.surgery_proc.value.PB_Booking_Surgery_Center_ID = this.surgery_proc.value.SPI_Surgery_Center_ID,
			this.surgery_proc.value.PB_Booking_Surgery_Center_Name = this.sureryCenterSlectedName



			this.pre_medical_clear.value.PMC_Created_By= this.admin.UM_Unique_ID
			this.pre_medical_clear.value.PMC_User_Name = this.admin.UM_Username
			this.pre_medical_clear.value.PMC_Create_Date = new Date()
			this.pre_medical_clear.value.PMC_Modify_Date = new Date()
			this.pre_medical_clear.value.PMC_Is_Active = true
			this.pre_medical_clear.value.PMC_Is_Deleted = false
			this.pre_medical_clear.value.PMC_TimeZone = this.admin.UM_TimeZone

			this.special_request_form.value.SR_Created_By= this.admin.UM_Unique_ID
			this.special_request_form.value.SR_User_Name = this.admin.UM_Username
			this.special_request_form.value.SR_Create_Date = new Date()
			this.special_request_form.value.SR_Modify_Date = new Date()
			this.special_request_form.value.SR_Is_Active = true
			this.special_request_form.value.SR_Is_Deleted = false
			this.special_request_form.value.SR_TimeZone = this.admin.UM_TimeZone

			this.insurence_pre_auth.value.IPA_Created_By= this.admin.UM_Unique_ID
			this.insurence_pre_auth.value.IPA_User_Name = this.admin.UM_Username
			this.insurence_pre_auth.value.IPA_Create_Date = new Date()
			this.insurence_pre_auth.value.IPA_Modify_Date = new Date()
			this.insurence_pre_auth.value.IPA_Is_Active = true
			this.insurence_pre_auth.value.IPA_Is_Deleted = false
			this.insurence_pre_auth.value.IPA_TimeZone = this.admin.UM_TimeZone

			if(this.patientUniqueId){
				this.getpatientFinalUniqueId = this.patientUniqueId
			}else if(this.getQueryStringID){
				this.getpatientFinalUniqueId = this.getQueryStringID
			}else if(this.getPatientIdViaSearch){
				this.getpatientFinalUniqueId = this.getPatientIdViaSearch
			}else{
				this.toster.warning(this.translate.instant('Please add patient'),this.translate.instant('Warning'))
				return
			}
			var putstatus
			if(getid == '1'){
				putstatus = 'Draft'
			}else{
				putstatus = 'Action Required'
			}

			var newPBStstusArr = []
			if(this.reqData.pbStatus[0] != ""){
				for (var i = 0; i < this.reqData.pbStatus.length; i++) {
					newPBStstusArr.push({
						RR_Message: this.reqData.pbStatus[i],
						RR_Create_By: this.admin.UM_Unique_ID,
						RR_Create_Date: new Date(),
						RR_TimeZone: this.admin.UM_TimeZone,
						RR_User_Name: this.admin.UM_Username,
					})
				}
			}
			var Booking:any = {
				PB_Patient_ID: this.getpatientFinalUniqueId,
				PB_Patient_Name:this.getPatientName,
				PB_Patient_Last_Name:this.getPatientLastName,
				PB_Patient_Email:this.patient_info.value.Patient_Email,
				PB_Create_Date: new Date(),
				PB_Modify_Date: new Date(),
				PB_TimeZone : this.admin.UM_TimeZone,
				PB_Is_Active: true,
				PB_Status: putstatus,
				PB_Created_By: this.admin.UM_Unique_ID,
				PB_User_Name: this.admin.UM_Username,
				PB_Booking_Physician_Office_ID : this.admin.UM_Surgary_Physician_CenterID,
				PB_Booking_Physician_Office_Name : this.admin.UM_Username,
				PB_Is_Deleted: false,
				PB_Booking_Surgery_Center_ID: this.surgery_proc.value.SPI_Surgery_Center_ID,
				PB_Booking_Surgery_Center_Name:this.sureryCenterSlectedName,       
				PB_Booking_Date: this.surgery_proc.value.SPI_Date,
				PB_Booking_Time:this.surgery_proc.value.SPI_Time,
				PB_Booking_Duration: this.surgery_proc.value.SPI_Duration,
				PB_Booked_From: 'NB',
				PB_Notes: newPBStstusArr,
			}

			
			if(this.saveAlertsCheckBox){
				Booking.PB_Alerts = this.saveAlertsCheckBox
			}
			if(this.insurence_pre_auth.value.IPA_Authorization_Name || this.insurence_pre_auth.value.IPA_Insurace_Company_Phone_No ){
				Booking.PB_Insurance_Precertification_Authorization = this.insurence_pre_auth.value
			}	
			Booking.PB_Surgical_Procedure_Information = this.surgery_proc.value

			console.log('Booking Info',Booking)
			this.UserService.saveBookingInOne(Booking).subscribe((data1)=>{
				console.log(data1)
				this.getBookingID = data1.Data.PB_Unique_ID
				console.log(this.getBookingID, this.patientUniqueId, this.patIdAlreadyExist)
				if(data1.Data.PB_Unique_ID &&  this.patIdAlreadyExist){
					// this.CreateUserandSendMail()
				}
				if(data1.Data.PB_Unique_ID){
					this.createBookingLog(data1.Data, 'success')
				}else{
					this.createBookingLog(data1.Message, 'error')
				}
				this.toster.success(this.translate.instant('Data added successfully'),this.translate.instant( 'Success'))
				if(getid == '1'){
					this.router.navigate(['/appointment-list'])
				}else if(getid == '2'){
					this.router.navigate(['/appointment-list'])
				}
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
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("http://link.com", "<a href="+link  +this.User_Unique_ID + ">Link</a>");
					this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					//Email Section
					var tomail = []
					tomail.push(this.patient_info.value.Patient_Email)
					var Email:any= {};
					Email.to_email=tomail;
					Email.To_Name=this.reqData.firstname;
					Email.Bcc_Email=this.getActiveationEmail.SET_Bcc
					Email.Cc_Email=this.getActiveationEmail.SET_CC
					Email.Subject=this.getActiveationEmail.SET_Name;
					Email.From_Email = this.getActiveationEmail.SET_From_Email;
					Email.From_Name = this.getActiveationEmail.SET_From_Name;
					Email.PlainTextContent = "";
					Email.HtmlContent ='<img src='+environment1.image+this.getActiveationEmail.SET_Header+' height="47.58px" width="115px" alt="logo">'+ "<br><br><br>" + this.getActiveationEmail.SET_Message + "<br><br><br>" + this.getActiveationEmail.SET_Footer
					//  "<p>Your Email is : " + this.patient_info.value.Patient_Email + 
					// " and passcode is : " + this.User_Passcode   +" "  +" "  +" "  +" "  +" "  +
					// " "  + "To get the information on whatsapp send text"  + " Join strength-cat  on +1(415) 523-8886 </p>";

					console.log(Email)

					this.showLoader = true
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Firstname", this.patient_info.value.Patient_First_Name);
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("<strong>passcode</strong>", "<strong>"+this.User_Passcode+"</strong>");
					this.getPasscodeEmail.SET_Message =this.getPasscodeEmail.SET_Message.replace("Physician office name", this.setAccToSurgery.PhyO_DBA_Name);

					this.UserService.sendemail(Email).subscribe((data2)=>{
						console.log(data2)
					},err=>{
						console.log(err)
					})
					var link  = this.siteLink+'/notification-passcode/'

					console.log(this.User_Unique_ID)
					var Email1:any= {};
					Email1.to_email=tomail;
					Email1.To_Name=this.reqData.firstname;
					Email1.Bcc_Email=this.getPasscodeEmail.SET_Bcc
					Email1.Cc_Email=this.getPasscodeEmail.SET_CC
					Email1.From_Email = this.getPasscodeEmail.SET_From_Email;
					Email1.From_Name = this.getPasscodeEmail.SET_From_Name;
					Email1.Subject = this.getPasscodeEmail.SET_Name
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

				this.router.navigateByUrl('/dashboard')
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
resetSurgicalInfo(){
	this.surgery_proc.reset()
	this.surgery_proc.get('SPI_Surgery_Center_ID').setValue('')
	this.surgery_proc.get('SPI_Surgeon_ID').setValue('')
	this.surgery_proc.get('SPI_Assi_Surgeon_ID').setValue('')
	this.surgery_proc.get('SPI_Anesthesia_Type').setValue('')
	this.surgery_proc.get('SPI_Block_Type').setValue('')
	this.getProcedureArray = []
	// this.procSelelectedListData = []
}
saveTheTemplete(){
	this.surgery_proc.value.SPI_CPT_SelectedList = this.getCPTArrayList
	this.surgery_proc.value.SPI_ICD_SelectedList = this.getICDArrayList
	this.surgery_proc.value.SPI_Procedure_SelectedList = this.getProcArrayList
	if(this.surgery_proc.value.SPI_Surgeon_ID == ''){
		this.toster.warning(this.translate.instant('Please fill Surgeon Name'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Assi_Surgeon_ID == ''){
		this.toster.warning(this.translate.instant('Please fill Assi Surgeon Name'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Date == ''|| this.surgery_proc.value.SPI_Date == undefined || this.surgery_proc.value.SPI_Date == null){
		this.toster.warning(this.translate.instant('Please fill Date'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Time == ''|| this.surgery_proc.value.SPI_Time == undefined || this.surgery_proc.value.SPI_Time == null){
		this.toster.warning(this.translate.instant('Please fill Time'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Duration == ''|| this.surgery_proc.value.SPI_Duration == undefined || this.surgery_proc.value.SPI_Duration == null){
		this.toster.warning(this.translate.instant('Please fill Duration'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Anesthesia_Type == ''|| this.surgery_proc.value.SPI_Anesthesia_Type == undefined || this.surgery_proc.value.SPI_Anesthesia_Type == null){
		this.toster.warning(this.translate.instant('Please fill Anesthesia Type'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Block_Type == ''|| this.surgery_proc.value.SPI_Block_Type == undefined || this.surgery_proc.value.SPI_Block_Type == null){
		this.toster.warning(this.translate.instant('Please fill Block Type'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_Procedure_SelectedList == ''|| this.surgery_proc.value.SPI_Procedure_SelectedList == undefined || this.surgery_proc.value.SPI_Procedure_SelectedList == null){
		this.toster.warning(this.translate.instant('Please fill Procedure'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_CPT_SelectedList == ''|| this.surgery_proc.value.SPI_CPT_SelectedList == undefined || this.surgery_proc.value.SPI_CPT_SelectedList == null){
		this.toster.warning(this.translate.instant('Please fill CPT'), this.translate.instant('Warning'))
		return
	}
	if(this.surgery_proc.value.SPI_ICD_SelectedList == ''|| this.surgery_proc.value.SPI_ICD_SelectedList == undefined || this.surgery_proc.value.SPI_ICD_SelectedList == null){
		this.toster.warning(this.translate.instant('Please fill ICD'), this.translate.instant('Warning'))
		return
	}
	if (this.saveTemplateName == '', this.saveTemplateName == undefined || this.saveTemplateName == null) {
		this.toster.warning(this.translate.instant('Please enter template name'),this.translate.instant('Warning'))
		return
	}
	if(this.spiNameIsExist == false){
		this.toster.warning(this.translate.instant('Template name already exist'),this.translate.instant('Warning'))
		return
	}

	var obj  ={

		SPT_Template_Name : this.saveTemplateName,
		SPT_Surgical_Center_Name : this.sureryCenterSlectedName,
		SPT_Surgeon_Name : this.surgery_proc.value.SPI_Surgeon_ID,
		SPT_Co_Surgeon_Name : this.surgery_proc.value.SPI_Assi_Surgeon_ID,
		SPT_Surgery_Date : this.surgery_proc.value.SPI_Date,
		SPT_Surgery_Time : this.surgery_proc.value.SPI_Time,
		SPT_Surgery_Duration : this.surgery_proc.value.SPI_Duration,
		SPT_Anesthesia_Type : this.surgery_proc.value.SPI_Anesthesia_Type,
		SPT_Block : this.surgery_proc.value.SPI_Block_Type,
		SPT_Procedure_SelectedList : this.getProcArrayList,
		SPT_CPT_SelectedList : this.getCPTArrayList,
		SPT_ICD_SelectedList : this.getICDArrayList,
		SPT_Surgery_Physician_Center_ID : this.surgery_proc.value.SPI_Surgery_Center_ID,
		SPT_Surgery_Physician_Center_Name : this.sureryCenterSlectedName,
		SPI_Created_By : this.admin.UM_Unique_ID,
		SPI_User_Name : this.admin.UM_Username,
		SPT_Create_Date : new Date(),
		SPT_Modify_Date : new Date(),
		SPT_Is_Active : true,
		SPT_Is_Deleted : false,
		SPT_TimeZone : this.admin.UM_TimeZone,
		Slug: this.mySlug,
	}
	this.UserService.saveSPITemplete(obj).subscribe((data1)=>{
		console.log(data1)
		this.toster.success(this.translate.instant('Template saved successfully'),this.translate.instant( 'Success'))
		this.saveTemplateName = ''
		$("#saveastemplete").modal("hide");
		$('body').removeClass('modal-open');
	},err=>{
		console.log(err)
	})
}
checkSpiTempleteName(name){
	var obj = {
		SPT_Template_Name: name,
		Slug: this.mySlug
	}
	this.UserService.checkSpiTempleteName(obj).subscribe((data1)=>{
		// console.log(data1)
		this.spiNameIsExist = data1.Exist
	},err=>{
		console.log(err)
	})
}
viewTemplete(){
	if(this.surgery_proc.value.SPI_Surgeon_ID == ''){
		this.toster.warning(this.translate.instant('Please select surgeon'), this.translate.instant('Warning'))
		return
	}
	var obj = {
		SPT_Surgeon_Name:this.surgery_proc.value.SPI_Surgeon_ID,
		SPT_Surgery_Physician_Center_ID:this.sureryCenterSlectedId,
		Slug: this.mySlug
	}
	this.UserService.GetTemplateFilterWithSurgeon(obj).subscribe((data1)=>{
		console.log(data1)
		this.GetTemplateFilterWithSurgeonArray = data1.DataList
		$("#viewastemplete").modal("show");
		// this.spiNameIsExist = data1.Exist
	},err=>{
		console.log(err)
	})
}
selectSPITemplete(uniqueId){
	this.showLoader = true
	var obj = {
		Slug: this.mySlug,
		SPT_Unique_ID: uniqueId
	}
	this.UserService.selectSPITemplete(obj).subscribe((data)=>{
		console.log(data)
		this.selectSPITempleteArray = data.Data
		// this.GetTemplateFilterWithSurgeonArray = data1.DataList
		// $("#viewastemplete").modal("show");
		// this.spiNameIsExist = data1.Exist
		this.showLoader = false
	},err=>{
		console.log(err)
	})
}
fillSpiTemplete(){
	var newProcArrList = []
	var newCPTArrList = []
	var newICDArrList = []
	$('.ui-widget-content').remove()
	this.getProcArrayList = []
	this.getCPTArrayList = []
	this.getICDArrayList = []

	this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(this.selectSPITempleteArray.SPT_Surgery_Physician_Center_ID)
	this.surgery_proc.get('SPI_Surgeon_ID').setValue(this.selectSPITempleteArray.SPT_Surgeon_Name)
	this.surgery_proc.get('SPI_Assi_Surgeon_ID').setValue(this.selectSPITempleteArray.SPT_Co_Surgeon_Name)
	this.surgery_proc.get('SPI_Anesthesia_Type').setValue(this.selectSPITempleteArray.SPT_Anesthesia_Type)
	// this.surgery_proc.get('SPI_Date').setValue(this.selectSPITempleteArray.SPT_Surgery_Date)
	this.surgery_proc.get('SPI_Time').setValue(this.selectSPITempleteArray.SPT_Surgery_Time)
	this.surgery_proc.get('SPI_Duration').setValue(this.selectSPITempleteArray.SPT_Surgery_Duration)
	this.surgery_proc.get('SPI_Block_Type').setValue(this.selectSPITempleteArray.SPT_Block)
	newICDArrList = this.selectSPITempleteArray.SPT_ICD_SelectedList
	newProcArrList = this.selectSPITempleteArray.SPT_Procedure_SelectedList
	newCPTArrList = this.selectSPITempleteArray.SPT_CPT_SelectedList
	this.getProcArrayList= this.selectSPITempleteArray.SPT_Procedure_SelectedList
	this.getCPTArrayList= this.selectSPITempleteArray.SPT_CPT_SelectedList
	this.getICDArrayList = this.selectSPITempleteArray.SPT_ICD_SelectedList

	if(newProcArrList && newProcArrList!=null){
		var mythis = this
		var procSelelectedListData = $('#proclistid');
		$.each(newProcArrList, function(index, values){
			procSelelectedListData.append("<div id='procdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.Proc_Description + "</div>");	
			// mythis.Proc_i = mythis.Proc_i + 1;
		})
	}
	if(newICDArrList!=null){
		var icdSelelectedListData = $('#icdlistid');
		$.each(newICDArrList, function(index, values){
			icdSelelectedListData.append("<div id='icddiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.ICD_Description + "</div>");
		})
	}
	if(newCPTArrList!=null){
		var cptSelelectedListData = $('#cptlistid');
		$.each(newCPTArrList, function(index, values){
			cptSelelectedListData.append("<div id='cptdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.CPTS_Description + "</div>");
		})
	}
	$("#viewastemplete").modal("hide");
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
createBookingLog(data, msg){
	var extraValue
	if(msg == 'success'){
		extraValue= "Booking No " + data.PB_Booking_No + " Created in database By " + data.PB_User_Name
	}else{
		extraValue = data
	}
	var obj = {
		Section_Name: 'Booking',
		Page_Name: 'Booking',
		Operation: 'Insert',
		User_Name: this.admin.UM_Username,
		User_ID: this.admin.UM_Unique_ID,
		Extra_Value: extraValue,
		Operation_Time: new Date(),
		TimeZone: this.admin.UM_TimeZone,
		Slug: this.mySlug,
	}
	this.UserService.createBookingLogs(obj).subscribe(data => {
		console.log(data)

	}, err => {
		console.log(err);
	})
}
createSearchingLog(data, msg){
	var extraValue
	if(msg == 'success'){
		extraValue= data.Patient_First_Name + ' ' + data.Patient_Last_Name + "  is searched by " + this.admin.UM_Username
	}else{
		extraValue = data
	}
	var obj = {
		Section_Name: 'Booking',
		Page_Name: 'Booking',
		Operation: 'Search',
		User_Name: this.admin.UM_Username,
		User_ID: this.admin.UM_Unique_ID,
		Extra_Value: extraValue,
		Operation_Time: new Date(),
		TimeZone: this.admin.UM_TimeZone,
		Slug: this.mySlug,
	}
	this.UserService.createBookingLogs(obj).subscribe(data => {
		console.log(data)

	}, err => {
		console.log(err);
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
	this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue(ssn)
}
getFiratName(fname){
	this.primary_insurance.get('PPID_Subscriber_Name').setValue(this.patient_info.value.Patient_First_Name + ' ' + this.patient_info.value.Patient_Last_Name)

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
						$(".btntext, .newclsleft").hover(function(){
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
						$(".newclsleft").hover(function(){
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


randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
}
CheckPatientBooking(patId){
	console.log('Searching')
	var obj = {
		Slug: this.mySlug,
		PB_Booking_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID,
		PB_Patient_ID: patId
	}
	this.UserService.CheckPatientBooking(obj).subscribe(data => {
		console.log(data)
		if(data.IsAvailable){
			this.patIdAlreadyExist = false
		}
	}, err => {
		console.log(err);
	})
}
checkEvent(evt){
	console.log(evt)
}
listbox_move(listID, direction) {

	var listbox:any = document.getElementById(listID);
	var selIndex = listbox.selectedIndex;

	if(-1 == selIndex) {
		alert("Please select an option to move.");
		return;
	}

	var increment = -1;
	if(direction == 'up')
		increment = -1;
	else
		increment = 1;

	if((selIndex + increment) < 0 || (selIndex + increment) > (listbox.options.length-1)) {
		return;
	}

	var selValue = listbox.options[selIndex].value;
	var selText = listbox.options[selIndex].text;
	listbox.options[selIndex].value = listbox.options[selIndex + increment].value
	listbox.options[selIndex].text = listbox.options[selIndex + increment].text

	listbox.options[selIndex + increment].value = selValue;
	listbox.options[selIndex + increment].text = selText;

	listbox.selectedIndex = selIndex + increment;
	// console.log(listbox.options)
	if(listID == 'mySelect'){
		var lcoalProc = []
		var dropDown:any = document.getElementById(listID), lcoalProc = [], i;
		for (i = 0; i < dropDown.options.length ; i += 1) {
			if (dropDown.options[i]) {
				var vals = dropDown.options[i].value
				vals = vals.substring(vals.indexOf(": ") + 1);
				vals = vals.trim()
				vals = vals.replace(/'/g, "")
				lcoalProc.push({ Proc_Description: dropDown.options[i].text, Proc_Code: vals });
			}
		}
		this.getProcArrayList = lcoalProc
		console.log(this.getProcArrayList)
	}else if(listID == 'cptdele'){
		var lcoalCpt = []
		var dropDown:any = document.getElementById(listID), lcoalCpt = [], i;
		for (i = 0; i < dropDown.options.length ; i += 1) {
			if (dropDown.options[i]) {
				var vals = dropDown.options[i].value
				vals = vals.substring(vals.indexOf(": ") + 1);
				vals = vals.trim()
				vals = vals.replace(/'/g, "")
				lcoalCpt.push({ CPTS_Description: dropDown.options[i].text, CPTS_Code: vals });
			}
		}
		this.getCPTArrayList = lcoalCpt
		console.log(this.getCPTArrayList)

	}else if(listID == 'icdlistid'){
		var localICD = []
		var dropDown:any = document.getElementById(listID), localICD = [], i;
		for (i = 0; i < dropDown.options.length ; i += 1) {
			if (dropDown.options[i]) {
				var vals = dropDown.options[i].value
				vals = vals.substring(vals.indexOf(": ") + 1);
				vals = vals.trim()
				vals = vals.replace(/'/g, "")
				localICD.push({ ICD_Description: dropDown.options[i].text, ICD_Code: vals });
			}
		}
		this.getICDArrayList = localICD
		console.log(this.getICDArrayList)

	}
}
deletefromList(id){
	if(id == 'mySelect'){
		console.log(this.procdeleted)
		var mythis = this
		mythis.getProcArrayList = mythis.getProcArrayList.filter(function(el) { return el.Proc_Code != mythis.procdeleted[0]; }); 

		console.log(this.getProcArrayList)
	}else if(id == 'cptdele'){
		console.log(this.cptdeleted)
		var mythis = this
		mythis.getCPTArrayList = mythis.getCPTArrayList.filter(function(el) { return el.CPTS_Code != mythis.cptdeleted[0]; }); 

		console.log(this.getCPTArrayList)
	}else if(id == 'icdlistid'){
		console.log(this.icddeleted)
		var mythis = this
		mythis.getICDArrayList = mythis.getICDArrayList.filter(function(el) { return el.ICD_Code != mythis.icddeleted[0]; }); 

		console.log(this.getICDArrayList)
	}
}

}
