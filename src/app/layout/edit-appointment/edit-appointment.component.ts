import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
declare var moment: any;
declare var $:any
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-edit-appointment',
	templateUrl: './edit-appointment.component.html',
	styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
	patient_info
	admin
	showLoader
	getQueryStringID
	getQueryStringPID
	options = {
		componentRestrictions: { country: 'USA' }
	}
	reqDataNew
	todayDate = new Date()
	maxDate = new Date()
	maxDate1 = new Date()
	getpatientCreatedDate
	getReligionArray
	getEthnicityArray
	getRaceArray
	getNationalityArray
	getLanguageArray
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
	getQueryStringName
	getBookingID
	getPatientName
	cptsearch
	trysomeing
	saveAvocateCheckBox
	saveAlertsCheckBox
	getZipCodeJSON
	getCPTArrayList
	getICDArrayList
	getProcArrayList
	setAccToSurgery
	imageLink
	checkEmailAddress
	isFormDataNewData
	packesArray
	getICDArray
	getProcedureArray
	getCPTArray
	getAlertArray
	rejectValue:boolean = false
	PB_Patient_Name
	PB_Booking_Date
	PB_Booking_Time
	PB_Booking_No
	getImageArray
	getSurgeryNameWithId
	getPatienId
	getAlertsIds
	getPatientLastName
	saveTemplateName
	spiNameIsExist
	GetTemplateFilterWithSurgeonArray
	getElementProcID
	getElementCPTID
	getElementICDID
	Cpt_i
	Icd_i
	Proc_i
	mySlug
	selectSPITempleteArray
	primaryInscArraySugg
	sureryCenterSlectedId
	sureryCenterSlectedName
	getBookingData
	checkRejOrIncpm:boolean = false
	rejectedData
	getCompletedStatus:boolean = false
	DataString
	savePrimaryIncInfo
	getSpiTempId
	// imageLink
	getPerDetails
	surgernArray
	procdeleted
	cptdeleted
	icddeleted
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private sanitizer:DomSanitizer,
		private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getQueryStringID = route.snapshot.params.id
		this.getQueryStringPID = route.snapshot.params.pID
		console.log(this.getQueryStringID)
		console.log(this.getQueryStringPID)
		// this.getPerDetails = []
		// var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		// this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		// if(!this.getPerDetails[0].Is_View){
		// 	this.location.back()
		// }
	
		// this.viaforkJoin()
		
	}

	ngOnInit() {
		$(".RejectorIncmp").hide();
		$(".otherstatus").hide();
		console.log(new Date(this.todayDate.setHours(this.maxDate1.getHours() + 4)))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle(this.translate.instant('Edit Appointment - ') +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle(this.translate.instant('Edit Appointment - ') +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle(this.translate.instant('Edit Appointment -') + ' The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.totalTr = [1]
		this.reqData = {}
		this.reqData.pbStatus = []
		this.reqData.pbStatus[0] = ""
		this.getSurgeryCenterArray = []
		this.getAnesthesiaArray = []
		this.getBlockArray = []
		this.getEquipmentArray = []
		this.getSuppliesArray = []
		this.getInstrumentsArray = []
		this.getReligionArray = []
		this.getEthnicityArray = []
		this.getRaceArray = []
		this.getNationalityArray = []
		this.getLanguageArray = []
		this.getRelationshipArray = []
		this.getIncidentArray = []
		this.GetTemplateFilterWithSurgeonArray = []
		this.rejectedData = []
		this.getElementProcID="";
		this.getElementCPTID="";
		this.getElementICDID="";
		this.Proc_i = 0;
		this.Cpt_i = 0;
		this.Icd_i = 0;

		this.imageLink = environment1.image
		this.getImageArray=  []
		this.getAlertArray = []
		this.patient_info = {}
		this.primary_insurance = {}
		this.getICDArray = []
		this.getProcedureArray = []
		this.getCPTArray = []
		this.packesArray = []
		// this.trysomeing = []
		this.getAlertsIds = []
		this.saveAlertsCheckBox = []
		this.surgernArray = []
		$('#ptselectbox').change(function() {
			$('.ptformdata').hide();
			$('#' + $(this).val()).show();
		});
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");

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

		this.incident_form = new FormGroup({
			Inci_Unique_ID: new FormControl(''),
			Inci_Type_ID: new FormControl(''),
			Inci_Type: new FormControl(''),
			Inci_Claim_No: new FormControl(''),
			Inci_DOI: new FormControl(''),
			Inci_Employee_Name: new FormControl(''),
			Inci_Employee_Address: new FormControl(''),
			Inci_Employee_Phone_No: new FormControl(''),
			Inci_Is_This_Lien: new FormControl(''),
			Inci_Attorney_Name: new FormControl(''),
			Inci_Attorney_Phone_No: new FormControl(''),
			Inci_TimeOfIncident: new FormControl(''),
			Inci_Comment: new FormControl(''),
			Inci_Created_By: new FormControl(''),
			Inci_User_Name: new FormControl(''),
			Inci_Create_Date: new FormControl(''),
			Inci_Modify_Date: new FormControl(''),
			Inci_Is_Active: new FormControl(''),
			Inci_Is_Deleted: new FormControl(''),
			Inci_TimeZone: new FormControl(''),
		})
		this.surgery_proc = new FormGroup({ 
			SPI_Unique_ID:new FormControl(''),
			SPI_Surgery_Center_ID:new FormControl(''),
			SPI_Surgery_Center_Name:new FormControl(''),
			SPI_Surgeon_ID:new FormControl(''),
			SPI_Surgeon_Name:new FormControl(''),
			SPI_Assi_Surgeon_ID:new FormControl(''),
			SPI_Assi_Surgeon_Name:new FormControl(''),
			SPI_Date:new FormControl(''),
			SPI_Time:new FormControl(''),
			SPI_Duration:new FormControl(''),
			SPI_Anesthesia_Type_ID:new FormControl(''),
			SPI_Anesthesia_Type:new FormControl(''),
			SPI_Block_ID:new FormControl(''),
			SPI_Block_Type:new FormControl(''),
			SPI_Procedure_SelectedList:new FormControl(''),
			SPI_CPT_SelectedList:new FormControl(''),
			SPI_ICD_SelectedList:new FormControl(''),
			SPI_Created_By:new FormControl(''),
			SPI_User_Name:new FormControl(''),
			SPI_Create_Date:new FormControl(''),
			SPI_Modify_Date:new FormControl(''),
			SPI_Is_Active:new FormControl(''),
			SPI_Is_Deleted:new FormControl(''),
			SPI_TimeZone:new FormControl(''),
			procedureSearch: new FormControl(''),
			cptSearch: new FormControl(''),
			icdSearch: new FormControl(''),
		})
		this.pre_medical_clear = new FormGroup({

			// PMC_Updated_By: new FormControl(''),
			PMC_Unique_ID: new FormControl(''),
			PMC_Is_Require_Pre_Op_Medi_Clearance: new FormControl(''),
			PMC_Clearing_Physician_Name: new FormControl(''),
			PMC_Is_Require_EKG: new FormControl(''),
			PMC_Created_By: new FormControl(''),
			PMC_User_Name: new FormControl(''),
			PMC_Create_Date: new FormControl(''),
			PMC_Modify_Date: new FormControl(''),
			PMC_Is_Active: new FormControl(''),
			PMC_Is_Deleted: new FormControl(''),
			PMC_TimeZone: new FormControl(''),
		})
		this.special_request_form = new FormGroup({

			SR_Is_Special_Equip_Req: new FormControl(''),
			SR_Unique_ID: new FormControl(''),
			SR_Equip_Name: new FormControl(''),
			SR_Supplies_ID: new FormControl(''),
			SR_Supplies_Name: new FormControl(''),
			SR_Instrumentation_ID: new FormControl(''),
			SR_Instrumentation_Name: new FormControl(''),
			SR_Other: new FormControl(''),
			SR_Created_By: new FormControl(''),
			SR_User_Name: new FormControl(''),
			SR_Create_Date: new FormControl(''),
			SR_Modify_Date: new FormControl(''),
			SR_Is_Active: new FormControl(''),
			SR_Is_Deleted: new FormControl(''),
			SR_TimeZone: new FormControl(''),
			SR_Equip_ID: new FormControl(''),
		})
		this.insurence_pre_auth = new FormGroup({
			IPA_Unique_ID: new FormControl(''),
			IPA_Insurace_Company_Phone_No: new FormControl(''),
			IPA_Insurace_Company_Representative: new FormControl(''),
			IPA_Authorization_Name: new FormControl(''),
			IPA_DOA: new FormControl(''),
			IPA_Created_By: new FormControl(''),
			IPA_User_Name: new FormControl(''),
			IPA_Create_Date: new FormControl(''),
			IPA_Modify_Date: new FormControl(''),
			IPA_Is_Active: new FormControl(''),
			IPA_Is_Deleted: new FormControl(''),
			IPA_TimeZone: new FormControl(''),
		})
		this.getCPTArrayList = []
		this.getICDArrayList = []
		this.getProcArrayList = []

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
		this.getSurgeryCenters()
		this.getAllList()
		this.validateSSN()
		this.validatphone()
		this.hideShow()
		this.lefTtoRight()
		this.loadDynamicCss()
		$( "textarea" ).keyup( function() {
			$( this ).html( $( this ).val().replace(/\n/g, '<br />') );
		});
		
	}	
	getAllList(){
		this.showLoader  =true
		var obj = {
			Slug: this.mySlug
		}
		var obj1 = {
			Slug:this.mySlug,
			Alert_Create_By:this.admin.UM_Unique_ID
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
		let getSurgens = this.UserService.SurgeonList(surgens).map(res =>res)
		Observable.forkJoin([religion, ethenicity, race, nationality, language, realtion,incident, anesthesia, 
			block, equipment, supplies, instruments, alets, getSurgens ]).subscribe(results =>{
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
			this.surgernArray = results[13].DataList
			this.findBooking()
		})
	}
	findBooking(){
		
		var obj = {
			Slug: this.mySlug,
			PB_Unique_ID: this.getQueryStringID
		}
		this.UserService.getBookingViaId(obj).pipe(map( bookingData => {
			const user = bookingData;
			this.rejectedData = bookingData.Data.PB_Reject
			this.PB_Patient_Name = bookingData.Data.PB_Patient_Name
			this.PB_Booking_Date = bookingData.Data.PB_Booking_Date
			this.PB_Booking_Time = bookingData.Data.PB_Booking_Time
			this.PB_Booking_No = bookingData.Data.PB_Booking_No
			this.getPatientLastName =  bookingData.Data.PB_Patient_Last_Name
			this.getPatientName = bookingData.Data.PB_Patient_Name
			this.getPatienId = bookingData.Data.PB_Patient_ID
			this.getBookingData = bookingData.Data
			console.log(this.getBookingData)
			if(this.getBookingData.PB_Status == 'Rejected' || this.getBookingData.PB_Status == 'Incomplete'){
				this.checkRejOrIncpm = true
				$(".RejectorIncmp").show();

			}else{
				$(".otherstatus").show();

			}

			if(bookingData.Data.PB_Incient_Detail){
				this.incident_form.setValue(bookingData.Data.PB_Incient_Detail)
			}
			if(bookingData.Data.PB_Preoprative_Medical_Clearance){
				this.pre_medical_clear.setValue(bookingData.Data.PB_Preoprative_Medical_Clearance)
			}
			if(bookingData.Data.PB_Surgical_Procedure_Information){
				// this.surgery_proc.setValue(bookingData.Data.PB_Surgical_Procedure_Information)
				this.surgery_proc.get('procedureSearch').setValue('')
				this.surgery_proc.get('cptSearch').setValue('')
				this.surgery_proc.get('icdSearch').setValue('')
				this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Surgery_Center_ID)
				this.surgery_proc.get('SPI_Anesthesia_Type').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Anesthesia_Type)
				this.surgery_proc.get('SPI_Assi_Surgeon_ID').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Assi_Surgeon_ID)
				this.surgery_proc.get('SPI_Block_Type').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Block_Type)
				this.surgery_proc.get('SPI_Duration').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Duration)
				this.surgery_proc.get('SPI_Surgeon_ID').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Surgeon_ID)
				this.surgery_proc.get('SPI_Time').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Time)
				this.surgery_proc.get('SPI_Date').setValue(bookingData.Data.PB_Surgical_Procedure_Information.SPI_Date)
				this.getCPTArrayList = bookingData.Data.PB_Surgical_Procedure_Information.SPI_CPT_SelectedList
				this.getICDArrayList = bookingData.Data.PB_Surgical_Procedure_Information.SPI_ICD_SelectedList
				this.getProcArrayList = bookingData.Data.PB_Surgical_Procedure_Information.SPI_Procedure_SelectedList
				if(this.getProcArrayList!=null){
					var mythis = this
					var procSelelectedListData = $('#proclistid');
					$.each(mythis.getProcArrayList, function(index, values){
						procSelelectedListData.append("<div id='procdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.Proc_Description + "</div>");	
						// mythis.Proc_i = mythis.Proc_i + 1;
					})
				}
				if(this.getICDArrayList!=null){
					var icdSelelectedListData = $('#icdlistid');
					$.each(mythis.getICDArrayList, function(index, values){
						icdSelelectedListData.append("<div id='icddiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.ICD_Description + "</div>");
					})
				}
				if(this.getCPTArrayList!=null){
					var cptSelelectedListData = $('#cptlistid');
					$.each(mythis.getCPTArrayList, function(index, values){
						cptSelelectedListData.append("<div id='cptdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.CPTS_Description + "</div>");
					})
				}
			}	
			if(bookingData.Data.PB_Special_Request){
				this.special_request_form.get('SR_Equip_Name').setValue(bookingData.Data.PB_Special_Request.SR_Equip_Name)
				this.special_request_form.get('SR_Supplies_Name').setValue(bookingData.Data.PB_Special_Request.SR_Supplies_Name)
				this.special_request_form.get('SR_Instrumentation_Name').setValue(bookingData.Data.PB_Special_Request.SR_Instrumentation_Name)
				this.special_request_form.setValue(bookingData.Data.PB_Special_Request)
			}
			if(bookingData.Data.PB_Insurance_Precertification_Authorization){
				this.insurence_pre_auth.setValue(bookingData.Data.PB_Insurance_Precertification_Authorization)
			}
			if(bookingData.Data.PB_Incient_Detail){
				this.incident_form.setValue(bookingData.Data.PB_Incient_Detail)
			}
			if(bookingData.Data.PB_Alerts){
				this.trysomeing= []
				for (var i = 0; i < bookingData.Data.PB_Alerts.length; i++) {
					for (var j = 0; j < this.getAlertArray.length; j++) {
						if(this.getAlertArray[j].Alert_Unique_ID == bookingData.Data.PB_Alerts[i].Alrt_Unique_ID){
							this.trysomeing.push(this.getAlertArray[j].Alert_Name)
							this.getAlertsIds.push({
								Alrt_Unique_ID: this.getAlertArray[j].Alert_Unique_ID,
								Alrt_Name: this.getAlertArray[j].Alert_Name,
								Alrt_Is_Needed: this.getAlertArray[j].Alrt_Is_Needed
							})
						}					
					}

				}
				this.saveAlertsCheckBox = this.getAlertsIds
			}
			if(bookingData.Data.PB_Forms){

				this.packesArray = bookingData.Data.PB_Forms
			}
			if(bookingData.Data.PB_Notes){
				for (var i = 0; i < bookingData.Data.PB_Notes.length; i++) {
					this.totalTr = bookingData.Data.PB_Notes

					this.reqData.pbStatus[i] =bookingData.Data.PB_Notes[i].RR_Message
				}
			}


			if(bookingData.Data.PB_Reject != null && bookingData.Data.PB_Reject.length > 0){
				this.rejectValue = true
			}
			this.getImageArray = bookingData.Data.PB_Doc_Uploaded_List
			this.rejectedData = bookingData.Data.PB_Reject


			return user;
		}),mergeMap( user =>  this.UserService.getPatinetViaId({Patient_Unique_ID:user.Data.PB_Patient_ID, Slug:'', })),take(1)).subscribe( patientData => {
	console.log(patientData.Data)
	this.getpatientCreatedDate = patientData.Data.Patient_Create_Date
	this.patient_info.setValue(patientData.Data);	
	this.primary_insurance.get('PPID_Subscriber_Name').setValue(patientData.Data.Patient_First_Name + ' ' + patientData.Data.Patient_Last_Name )
	this.primary_insurance.get('PPID_Subscriber_SSN_No').setValue(patientData.Data.Patient_SSN)
	this.primary_insurance.get('PPID_DOB').setValue(patientData.Data.Patient_DOB)
	if(patientData.Data.Patient_Primary_Insurance_Details){
		this.primary_insurance.setValue(patientData.Data.Patient_Primary_Insurance_Details);	
	}
	if(patientData.Data.Patient_Secondary1_Insurance_Details){
		$(".sec-insr").show();
		$('.add-sec-insr').hide()
		this.secondary_insurance.setValue(patientData.Data.Patient_Secondary1_Insurance_Details)
	}
	if(patientData.Data.Patient_Secondary2_Insurance_Details){
		$(".third-insr").show();
		$('.add-third-insr').hide()
		$(".remove-third-forth").show();
		this.third_insurance.setValue(patientData.Data.Patient_Secondary2_Insurance_Details)
	}
	if(patientData.Data.Patient_Secondary3_Insurance_Details){
		$(".forth-insr").show();
		$('.add-forth-insr').hide()
		$(".remove-forth-insr").show();
		this.forth_insurance.setValue(patientData.Data.Patient_Secondary3_Insurance_Details)
	}
	if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
		$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
	}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
		$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
	}else{
		$(".fa-check").css("background-color", 'green!important')
	}
	this.showLoader  =false
});
	}

	getPatientInfoViaIdP(){
		this.showLoader = true
		var obj  = {
			Patient_Unique_ID:this.getQueryStringPID,
			Slug:this.mySlug
		}

		this.UserService.getPatinetViaId(obj).subscribe((data)=>{
			console.log(data)	
			this.getpatientCreatedDate = data.Data.Patient_Create_Date
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
			if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
			}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
			}else{
				$(".fa-check").css("background-color", 'green!important')
			}
			if(data.Data.Patient_Unique_ID){
				var sts = {
					Slug:this.mySlug,
					PB_Booking_Physician_Office_ID: "8CBbKoaO21ae0c511d2084", //this.admin.UM_Surgary_Physician_CenterID,
					PB_Patient_ID:data.Data.Patient_Unique_ID,
				}
				// this.UserService.GetPatientBookingStatusList(sts).subscribe((data)=>{
					// 	console.log(data) //PB_Patient_ID   //PB_Status
					// 	for (var i = 0; i < data.DataList.length; i++) {
						// 		if(data.DataList[i].PB_Unique_ID == this.getQueryStringID && data.DataList[i].PB_Status == 'Complete'){
							// 			console.log('im in the compelte booking status')
							// 			this.getCompletedStatus = true
							// 		}
							// 	}
							// },err=>{
								// 	console.log(err)
								// })
							}
							this.showLoader = false
						},err=>{
							console.log(err)
						})
	}

	getPatientInfoViaId(){
		this.showLoader  =true
		var obj = {
			Slug: this.mySlug,
			PB_Unique_ID: this.getQueryStringID
		} 

		this.UserService.getBookingViaId(obj).subscribe((data)=>{
			console.log(data.Data)	
			this.rejectedData = data.Data.PB_Reject
			this.PB_Patient_Name = data.Data.PB_Patient_Name
			this.PB_Booking_Date = data.Data.PB_Booking_Date
			this.PB_Booking_Time = data.Data.PB_Booking_Time
			this.PB_Booking_No = data.Data.PB_Booking_No
			this.getPatientLastName =  data.Data.PB_Patient_Last_Name
			this.getPatientName = data.Data.PB_Patient_Name
			this.getPatienId = data.Data.PB_Patient_ID
			this.getBookingData = data.Data
			console.log(this.getBookingData.PB_Status)
			if(this.getBookingData.PB_Status == 'Rejected' || this.getBookingData.PB_Status == 'Incomplete'){
				this.checkRejOrIncpm = true
				$(".RejectorIncmp").show();

			}else{
				$(".otherstatus").show();

			}

			if(data.Data.PB_Incient_Detail){
				this.incident_form.setValue(data.Data.PB_Incient_Detail)
			}
			if(data.Data.PB_Preoprative_Medical_Clearance){
				this.pre_medical_clear.setValue(data.Data.PB_Preoprative_Medical_Clearance)
			}
			if(data.Data.PB_Surgical_Procedure_Information){
				// this.surgery_proc.setValue(data.Data.PB_Surgical_Procedure_Information)
				this.surgery_proc.get('procedureSearch').setValue('')
				this.surgery_proc.get('cptSearch').setValue('')
				this.surgery_proc.get('icdSearch').setValue('')
				this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Surgery_Center_ID)
				this.surgery_proc.get('SPI_Anesthesia_Type').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Anesthesia_Type)
				this.surgery_proc.get('SPI_Assi_Surgeon_ID').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Assi_Surgeon_ID)
				this.surgery_proc.get('SPI_Block_Type').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Block_Type)
				this.surgery_proc.get('SPI_Duration').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Duration)
				this.surgery_proc.get('SPI_Surgeon_ID').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Surgeon_ID)
				this.surgery_proc.get('SPI_Time').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Time)
				this.surgery_proc.get('SPI_Date').setValue(data.Data.PB_Surgical_Procedure_Information.SPI_Date)
				this.getCPTArrayList = data.Data.PB_Surgical_Procedure_Information.SPI_CPT_SelectedList
				this.getICDArrayList = data.Data.PB_Surgical_Procedure_Information.SPI_ICD_SelectedList
				this.getProcArrayList = data.Data.PB_Surgical_Procedure_Information.SPI_Procedure_SelectedList
				if(this.getProcArrayList!=null){
					var mythis = this
					var procSelelectedListData = $('#proclistid');
					$.each(mythis.getProcArrayList, function(index, values){
						procSelelectedListData.append("<div id='procdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.Proc_Description + "</div>");	
						// mythis.Proc_i = mythis.Proc_i + 1;
					})
				}
				if(this.getICDArrayList!=null){
					var icdSelelectedListData = $('#icdlistid');
					$.each(mythis.getICDArrayList, function(index, values){
						icdSelelectedListData.append("<div id='icddiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.ICD_Description + "</div>");
					})
				}
				if(this.getCPTArrayList!=null){
					var cptSelelectedListData = $('#cptlistid');
					$.each(mythis.getCPTArrayList, function(index, values){
						cptSelelectedListData.append("<div id='cptdiv_"+ index +"' class='ui-widget-content  ui-selectee'>" + values.CPTS_Description + "</div>");
					})
				}
			}	
			if(data.Data.PB_Special_Request){
				this.special_request_form.get('SR_Equip_Name').setValue(data.Data.PB_Special_Request.SR_Equip_Name)
				this.special_request_form.get('SR_Supplies_Name').setValue(data.Data.PB_Special_Request.SR_Supplies_Name)
				this.special_request_form.get('SR_Instrumentation_Name').setValue(data.Data.PB_Special_Request.SR_Instrumentation_Name)
				this.special_request_form.setValue(data.Data.PB_Special_Request)
			}
			if(data.Data.PB_Insurance_Precertification_Authorization){
				this.insurence_pre_auth.setValue(data.Data.PB_Insurance_Precertification_Authorization)
			}
			if(data.Data.PB_Incient_Detail){
				this.incident_form.setValue(data.Data.PB_Incient_Detail)
			}
			if(data.Data.PB_Alerts){
				this.trysomeing= []
				for (var i = 0; i < data.Data.PB_Alerts.length; i++) {
					for (var j = 0; j < this.getAlertArray.length; j++) {
						if(this.getAlertArray[j].Alert_Unique_ID == data.Data.PB_Alerts[i].Alrt_Unique_ID){
							this.trysomeing.push(this.getAlertArray[j].Alert_Name)
							this.getAlertsIds.push({
								Alrt_Unique_ID: this.getAlertArray[j].Alert_Unique_ID,
								Alrt_Name: this.getAlertArray[j].Alert_Name,
								Alrt_Is_Needed: this.getAlertArray[j].Alrt_Is_Needed
							})
						}					
					}

				}
				this.saveAlertsCheckBox = this.getAlertsIds
			}
			if(data.Data.PB_Forms){

				this.packesArray = data.Data.PB_Forms
			}
			if(data.Data.PB_Notes){
				for (var i = 0; i < data.Data.PB_Notes.length; i++) {
					this.totalTr = data.Data.PB_Notes

					this.reqData.pbStatus[i] =data.Data.PB_Notes[i].RR_Message
				}
			}


			if(data.Data.PB_Reject != null && data.Data.PB_Reject.length > 0){
				this.rejectValue = true
			}
			this.getImageArray = data.Data.PB_Doc_Uploaded_List
			this.rejectedData = data.Data.PB_Reject
			// packesArray
			// getAlertArray getProcedureArray  getCPTArray  rejectValue

			this.showLoader  =false
		},err=>{
			console.log(err)
		})
}	

removeTildSign(data){
	if(data){

		var getnew = data.replace("~", "");
	}
	return (getnew)
}
isSelected(topic){
	if(this.trysomeing){
		// console.log(this.trysomeing)
		return this.trysomeing.indexOf(topic.Alert_Name) >= 0;

	}
}
onChange(category, isChecked: boolean) {
	// this.lead_category1  = this.getIdOfLeadCat
	this.saveAlertsCheckBox  = this.getAlertsIds
	if(isChecked) {
		if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
			$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
		}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
			$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
		}else{
			$(".fa-check").css("background-color", 'green!important')
		}
		console.log(category.Alert_Name)
		this.saveAlertsCheckBox.push({
			Alrt_Unique_ID: category.Alert_Unique_ID,
			Alrt_Name:category.Alert_Name,
			Alrt_Is_Needed: true
		});
	} else {
		var index = this.saveAlertsCheckBox.findIndex(x => x.Alrt_Unique_ID == category.Alrt_Unique_ID);
		// console.log(index)
		this.saveAlertsCheckBox.splice(index,1);
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
		this.getSurgeryCenterArray = data.DataList[0]
		console.log('Get Surgery center',this.getSurgeryCenterArray)
		this.sureryCenterSlectedId = data.DataList[0].SurgC_Unique_ID
		this.sureryCenterSlectedName = data.DataList[0].SurgC_DBA_Name
		this.surgery_proc.get('SPI_Surgery_Center_ID').setValue(data.DataList[0].SurgC_Unique_ID)

	},err=>{
		console.log(err)
	})
}


findICDwithCat(){
	var obj ={
		CPT_Code: this.surgery_proc.value.cptSearch,
		Slug:this.mySlug
	}
	this.UserService.findICDwithCat(obj).subscribe((data)=>{
		console.log(data)
		this.getICDArray = data.DataList
	},err=>{
		console.log(err)
	})
}
findCPTwithCat(){
	var obj ={
		ICD_ICD10_PCS_Code: this.surgery_proc.value.icdSearch,
		Slug:this.mySlug
	}
	this.UserService.findCPTwithCat(obj).subscribe((data)=>{
		console.log(data)
		this.getCPTArray = data.DataList
	},err=>{
		console.log(err)
	})
}
findProcedurewithCat(){
	var obj ={
		Pro_Procedure_Code_Category: this.surgery_proc.value.procedureSearch,
		Slug:this.mySlug
	}
	console.log(this.surgery_proc.value.procedureSearch)
	this.UserService.findProcedurewithCat(obj).subscribe((data)=>{
		console.log(data)
		this.getProcedureArray = data.DataList
	},err=>{
		console.log(err)
	})
}
editBookig(mystatus){
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
	console.log('editbook')
	// console.log(this.saveAlertsCheckBox)
	if(this.surgery_proc.value.SPI_Date){
		this.surgery_proc.value.SPI_Date = new Date(this.surgery_proc.value.SPI_Date);
		this.surgery_proc.value.SPI_Date.setHours(this.surgery_proc.value.SPI_Date.getHours() + 5 )
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
	this.surgery_proc.value.PB_Booking_Surgery_Center_ID = this.surgery_proc.value.SPI_Surgery_Center_ID
	this.surgery_proc.value.PB_Booking_Surgery_Center_Name = this.sureryCenterSlectedName

	this.pre_medical_clear.value.PMC_Created_By = this.admin.UM_Unique_ID
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
	//
	this.insurence_pre_auth.value.IPA_Created_By= this.admin.UM_Unique_ID
	this.insurence_pre_auth.value.IPA_User_Name = this.admin.UM_Username
	this.insurence_pre_auth.value.IPA_Create_Date = new Date()
	this.insurence_pre_auth.value.IPA_Modify_Date = new Date()
	this.insurence_pre_auth.value.IPA_Is_Active = true
	this.insurence_pre_auth.value.IPA_Is_Deleted = false
	this.insurence_pre_auth.value.IPA_TimeZone = this.admin.UM_TimeZone
	var ststusofPB
	if(ststusofPB ==  'Draft'){
		ststusofPB = 'Draft'
	}
	// console.log(ststusofPB)
	if(this.getBookingData.PB_Status == 'QB' ||  this.getBookingData.PB_Status == 'WK'){
		ststusofPB = 'Action Required'
	}else if(mystatus ==  'Action Required'){
		ststusofPB = 'Action Required'
	}else if(this.getBookingData.PB_Status  == 'Rejected'){
		ststusofPB = 'Rejected'
	}else if(this.getBookingData.PB_Status ==  'Incomplete'){
		ststusofPB = 'Incomplete'
	}else{
		ststusofPB = this.getBookingData.PB_Status
	}
	var Booking:any = {
		PB_Unique_ID:this.getQueryStringID,
		PB_Patient_ID:this.getPatienId,
		PB_Patient_Name:this.patient_info.value.Patient_First_Name,
		PB_Patient_Last_Name:this.patient_info.value.Patient_Last_Name,
		// PB_Create_Date: new Date(),
		PB_Modify_Date: new Date(),
		PB_TimeZone : this.admin.UM_TimeZone,
		PB_Is_Active: true,
		PB_Created_By: this.admin.UM_Unique_ID,
		PB_User_Name: this.admin.UM_Username,
		PB_Is_Deleted: false,  
		PB_Booking_Date: this.surgery_proc.value.SPI_Date,
		PB_Booking_Time:this.surgery_proc.value.SPI_Time,
		PB_Booking_Duration: this.surgery_proc.value.SPI_Duration,
		Slug: this.mySlug,
		PB_Notes: newPBStstusArr,
		PB_Status:ststusofPB,
		PB_Booking_Surgery_Center_ID:this.sureryCenterSlectedId,
		PB_Booking_Surgery_Center_Name:this.sureryCenterSlectedName

	}
	if(this.incident_form.value.Inci_DOI && this.incident_form.value.Inci_Employee_Name ){
		Booking.PB_Incient_Detail = this.incident_form.value
	}
	if(this.pre_medical_clear.value.PMC_Is_Require_Pre_Op_Medi_Clearance == 'true' || this.pre_medical_clear.value.PMC_Is_Require_Pre_Op_Medi_Clearance == 'false' ){
		Booking.PB_Preoprative_Medical_Clearance = this.pre_medical_clear.value
	}
	if(this.special_request_form.value.SR_Is_Special_Equip_Req == 'true' || this.special_request_form.value.SR_Is_Special_Equip_Req == 'false' ){
		Booking.PB_Special_Request = this.special_request_form.value
	}
	// console.log(this.special_request_form.value)
	if(this.saveAlertsCheckBox){

		Booking.PB_Alerts = this.saveAlertsCheckBox
	}
	if(this.insurence_pre_auth.value.IPA_Authorization_Name || this.insurence_pre_auth.value.IPA_Insurace_Company_Phone_No ){
		Booking.PB_Insurance_Precertification_Authorization = this.insurence_pre_auth.value
	}	
	Booking.PB_Surgical_Procedure_Information = this.surgery_proc.value
	console.log(Booking)
	if(this.getBookingData.PB_Booked_From == 'NB'){
		console.log('im in NV')
		this.UserService.EditBookigInOne(Booking).subscribe((data1)=>{
			console.log(data1)
			if(data1.Message == 'OK'){
				this.createBookingLog(data1.Data, 'success')
			}else{
				this.createBookingLog(data1.Message, 'error')
			}
			// this.getBookingID = data1.Data.PB_Unique_ID
			// this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))

		},err=>{
			console.log(err)
		})
	}else{
		console.log('im in WK ')
		this.UserService.QBBookingWKBooking(Booking).subscribe((data2)=>{
			console.log(data2)
			if(data2.Message == 'OK'){
				this.createBookingLog(data2.Data, 'success')
			}else{
				this.createBookingLog(data2.Message, 'error')
			}
			// this.getBookingID = data1.Data.PB_Unique_ID
			// this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))

		},err=>{
			console.log(err)
		})
	}

}
lefTtoRight(){
	$(window).scroll(function() {
		if ($(this).scrollTop() > 5) {
			$('#btndiv').addClass('fixed');
		} else {
			$('#btndiv').removeClass('fixed');
		}
	});
	var myThisFucn  = this
	function CheckExistValueInControl(ControlID, Value){
		var IsTrue = false;
		// debugger;
		if($("#"+ ControlID +" div").length >0)
		{
			$("#"+ ControlID +" div").each(function() {
				// debugger;
				var vl=$.trim(Value.replace(/\s+/g, ' '))
				if(this.innerText == vl)
					IsTrue = true				    
			});				
		}
		else
		{
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
		var newstring = selectedData.replace(/\D/g,'')
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
		// var selectedData = $('.icdSearchListdata').val();
		var selectedData = $('.icdSearchListdata option:selected').text();
		var selectedDataId = $('.icdSearchListdata').val();
		selectedData = selectedData.length > 0 ? selectedData + ',' : selectedData;
		// console.log(selectedData)
		var newstring = selectedData.replace(/\-.+/g,"$'");
		if (myThisFucn.getICDArrayList.some(e => e.ICD_Description === newstring)) {
			return
		}
		myThisFucn.getICDArrayList.push({
			ICD_Code: selectedDataId[0],
			ICD_Description: newstring,
		})
		$.each($(".icdSearchListdata option:selected"), function() {
			selectedData = selectedData + $(this).val() + ',';
			textData = $(this).text();
			if(CheckExistValueInControl('icdlistid',textData) == false)
			{
				icdSelelectedListData.append("<div id='icddiv_"+ myThisFucn.Icd_i +"' class='ui-widget-content  ui-selectee'>" + textData + "</div>");
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
		var selectedDataProc = $('.ProdSearchListdata option:selected').text();
		var selectDataProcId  =$('.ProdSearchListdata').val();
		selectedDataProc = selectedDataProc.length > 0 ? selectedDataProc + ',' : selectedDataProc;
		// console.log(selectedDataProc)
		var newstring = selectedDataProc.replace(/\-.+/g,"$'");
		// console.log(newstring)
		if (myThisFucn.getProcArrayList.some(e => e.Proc_Description === newstring)) {
			return
		}
		myThisFucn.getProcArrayList.push({
			Proc_Code: selectDataProcId[0],
			Proc_Description: newstring
		})
		console.log(myThisFucn.getProcArrayList)
		$.each($(".ProdSearchListdata option:selected"), function() {
			selectedDataProc = selectedDataProc + $(this).val() + ',';
			textDataProc = $(this).text();
			if(CheckExistValueInControl('proclistid',textDataProc) == false){
				procSelelectedListData.append("<div id='procdiv_"+ myThisFucn.Proc_i +"' class='ui-widget-content  ui-selectee'>" + textDataProc + "</div>");	
				myThisFucn.Proc_i = myThisFucn.Proc_i + 1;
			}				
		});
		selectedDataProc = selectedDataProc.substring(0, (selectedDataProc.length - 1));
		$('.procCodeSelected').val(selectedDataProc);

		$('.procCodesAdded').val(selectedDataProc);
		// console.log(selectedData)
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
	if(this.patient_info.value.Patient_DOB){
		this.patient_info.value.Patient_DOB = new Date(this.patient_info.value.Patient_DOB);
		this.patient_info.value.Patient_DOB.setHours( this.patient_info.value.Patient_DOB.getHours() + 5 )
	}

	this.patient_info.value.Patient_Unique_ID =  this.getQueryStringPID
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
	if(this.patient_info.value.Patient_SSN ){
		this.patient_info.value.Patient_SSN = this.primary_insurance.value.PPID_Subscriber_SSN_No
	}
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
	this.patient_info.value.Slug = this.mySlug

	console.log(this.patient_info.value)

	this.UserService.editPatientDetails(this.patient_info.value).subscribe((data)=>{
		console.log(data)
		this.patientUniqueId = data.Data.Patient_Unique_ID
		this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
		this.ngOnInit()
	},err=>{
		console.log(err)
	})

}
goLastLocation(){
	this.location.back()
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
		this.toster.success(this.translate.instant('Template saved successfully'), this.translate.instant('Success'))
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

			if(newProcArrList!=null){
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
		}else if(ty == 'sec3'){
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
	}else if(type == 'sec1'){
		this.secondary_insurance.get('PSID_Primary_Insurance').setValue(object)
	}else if(type == 'sec2'){
		this.third_insurance.get('PSID_Primary_Insurance').setValue(object)
	}else if(type == 'sec3'){
		this.forth_insurance.get('PSID_Primary_Insurance').setValue(object)
	}

}
addRow() {
	this.totalTr.push(1)
	this.reqData.pbStatus[this.totalTr.length - 1] = ""

}
removeRow(i) {
	if (this.totalTr.length == 1) {
		this.totalTr = []
		this.totalTr.push(1)
		this.reqData.pbStatus[0] = ""
		// this.myArr[0]= ""
	} else {
		this.totalTr.splice(i, 1)
		this.reqData.pbStatus.splice(i, 1) // = ""
		// this.myArr.splice(i, 1)

	}

}
verifyPrimaryInsurance(){

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
		this.toster.warning(this.translate.instant('Please fill SSN no'), this.translate.instant('Warning'))
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
	var dob:any = new Date(this.primary_insurance.value.PPID_DOB )
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

			// $("#primary_insurance_open").modal("show");             

		});
		this.showLoader = false
		// this.getIncidentArray = data.DataList
	},err=>{
		console.log(err)
	})
}
reVerifyPrimaryInc(){
	this.DataString = ''
}
savePrimaryInsurancePDF(){}
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
createBookingLog(data, msg){
			var extraValue
			if(msg == 'success'){
				extraValue= "Booking No " + this.getBookingData.PB_Booking_No + " Updated in database By " + data.PB_User_Name
			}else{
				extraValue = data
			}
			var obj = {
				Section_Name: 'Booking',
				Page_Name: 'edit-appointment',
				Operation: 'Update',
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
						$(".btntext").css("background-color",'#04a8c5');
						$(".btntext1").css("background-color",'#04a8c5');
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
			}else if(aa.admin.UM_Office_Type == 'S'){
				if(aa.setAccToSurgery){
					if(aa.setAccToSurgery.SurgC_Appearance){
						$(".mh-left h1").css("color", aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax)
						$(".main-heading h1").css("color", aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax)
						$(".header").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorDark_Hax)
						$(".btnsubmit").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
						$(".btntext").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
						$(".btntext").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax)
						$(".btntext1").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
						$(".btntext1").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax)
						$(".clsleft").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
						$(".clsleft").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax)
						$(".btnsubmit").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax)
					}else{
						$(".mh-left h1").css("color", '#006400')
						$(".main-heading h1").css("color", '#006400')
						$(".header").css("background-color", '#006400')
						$(".btnsubmit").css("background-color",'#04a8c5');
						$(".btntext").css("background-color",'#04a8c5');
						$(".btntext1").css("background-color",'#04a8c5');
					}
					if(aa.setAccToSurgery.SurgC_Appearance){
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
						});
						$(".btnsubmit").hover(function(){
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
						});
						$(".btntext").hover(function(){
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
						});

						$(".btntext1").hover(function(){
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
						});

						$(".clsleft").hover(function(){
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
						});
					}
				}else{
					$("h1").css("color", "#2ca36c");
				}
			}
			else{
				$(".header").css("background-color", '#006400')
			}
		}
	}, 100);
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
