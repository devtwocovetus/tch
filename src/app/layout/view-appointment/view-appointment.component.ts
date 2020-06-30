
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
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
// import * as jspdf from 'jspdf'; 

import html2canvas from 'html2canvas';
import { forkJoin } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-view-appointment',
	templateUrl: './view-appointment.component.html',
	styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
	patient_info
	admin
	showLoader
	getQueryStringID
	options = {
		componentRestrictions: { country: 'USA' }
	}

	setAccToSurgery
	getSurgeryNameWithId
	special_request_form
	getQueryStringPID
	mySlug
	patientslistarray
	Insurance_Details
	INCIDENT_DETAILS
	SURGICAL_INFORMATION
	Procedure_List
	CPT_List
	ICD10_Code_List
	Medical_Clearance
	PB_Special_Request
	InsuranceAuthorization
	PB_Doc_Uploaded_List
	PB_ALERTS
	PB_Forms
	PB_Reason
	Insurance_Details1
	Insurance_Details2
	Insurance_Details3
	bookinglist
	PB_alerts
	PB_rejected_reasions
	getRelationshipArray
	rejectValue
	incompleteValue
	checkPastDate:boolean = false
	statusReqAndDateNotPased:boolean = false
	datePassedExpire:boolean = false
	dateNotPassApproved
	PB_Notes
	reasons
	secondaryinsc
	rejeectOrIncomp:boolean = false
	getPerDetails
	surgensArray
	@ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private ngxXml2jsonService: NgxXml2jsonService,
		private ref: ChangeDetectorRef, private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getQueryStringID = route.snapshot.params.id
		this.getQueryStringPID = route.snapshot.params.pID
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		console.log(this.getQueryStringID)
		// this.surNameFunc()
		this.viaforkJoin()
	}

	ngOnInit() {
		this.patientslistarray ={}
		this.Insurance_Details={}
		this.INCIDENT_DETAILS={}
		this.SURGICAL_INFORMATION ={}
		this.Procedure_List =[]
		this.CPT_List=[]
		this.ICD10_Code_List=[]
		this.Medical_Clearance={}
		this.PB_Special_Request ={}
		this.InsuranceAuthorization={}
		this.PB_Doc_Uploaded_List=[]
		this.PB_ALERTS =[]
		this.PB_Forms=[]
		this.PB_Reason =[]
		this.PB_Notes =[]
		this.Insurance_Details1={}
		this.Insurance_Details2={}
		this.Insurance_Details3={}
		this.bookinglist={}
		this.reasons = {}
		this.secondaryinsc = {}
		this.surgensArray =[]


		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('View Appointment - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('View Appointment - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('View Appointment - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
	}
	// surNameFunc(){
	// 	var surphyNewId
	// 	if(this.admin.UM_Office_Type == "S"){
	// 		surphyNewId = this.setAccToSurgery.SurgC_Unique_ID
	// 	}else if (this.admin.UM_Office_Type == "P"){
	// 		surphyNewId = this.setAccToSurgery.PhyO_Surgery_Center_ID
	// 	}else{
	// 		this.toster.error('Something Went Wrong', 'Error')
	// 	}
	// 	var surgens= {
	// 		Staff_Surgery_Physician_Office_ID:surphyNewId,
	// 		Staff_Role_Name:'Doctor',
	// 		Slug:this.mySlug
	// 	}
	// 	this.UserService.SurgeonList(surgens).subscribe(data => {
	// 		console.log(data)
	// 		this.surgensArray =data.DataList

	// 	}, err => {
	// 		console.log(err);
	// 	})
	// }
	// getSurNameViaId(data){
	// 	console.log(data)
	// 	for (var i = 0; i < this.surgensArray.length; i++) {
	// 		if(this.surgensArray[i].Staff_Unique_ID == data){
	// 			return this.surgensArray[i].Staff_Name + ' ' + this.surgensArray[i].Staff_Last_Name
	// 			break;
	// 		}
	// 	}
	// }
	viaforkJoin(){
		var obj  = {
			PB_Unique_ID:this.getQueryStringID,
			Slug:''
		}
		var obj1 = {
			Patient_Unique_ID:this.getQueryStringPID,
			Slug:''
		}
		let boooking = this.UserService.getBookingViaId(obj).map(res =>res)
		let patientbook = this.UserService.getPatinetViaId(obj1).map(res =>res)
		Observable.forkJoin([boooking, patientbook]).subscribe(results =>{
			console.log(results)
			this.getPatientInfoViaId(results[0].Data)
			this.getPatientInfoViaIdPnew(results[1].Data)
		})
	}


	getPatientInfoViaIdPnew(patientData){
		this.patientslistarray = patientData
		this.Insurance_Details = patientData.Patient_Primary_Insurance_Details
		if(this.Insurance_Details){
			if(this.Insurance_Details.PPID_Relation_To_Patient == '01'){
				this.Insurance_Details.PPID_Relation_To_Patient = 'Spouse'
			}else if(this.Insurance_Details.PPID_Relation_To_Patient == '19'){
				this.Insurance_Details.PPID_Relation_To_Patient = 'Child'
			}else if(this.Insurance_Details.PPID_Relation_To_Patient == '34'){
				this.Insurance_Details.PPID_Relation_To_Patient = 'Other Adult'
			}else if(this.Insurance_Details.PPID_Relation_To_Patient == 'S'){
				this.Insurance_Details.PPID_Relation_To_Patient = 'Self'
			}else if(this.Insurance_Details.PPID_Relation_To_Patient == 'D'){
				this.Insurance_Details.PPID_Relation_To_Patient = 'Unspecified Dependent'
			}else{
				this.Insurance_Details.PPID_Relation_To_Patient = '-'
			}
		}
		this.Insurance_Details1 = patientData.Patient_Secondary1_Insurance_Details
		if(this.Insurance_Details1){
			if(this.Insurance_Details1.PSID_Relation_To_Patient == '01'){
				this.Insurance_Details1.PSID_Relation_To_Patient = 'Spouse'
			}else if(this.Insurance_Details1.PSID_Relation_To_Patient == '19'){
				this.Insurance_Details1.PSID_Relation_To_Patient = 'Child'
			}else if(this.Insurance_Details1.PSID_Relation_To_Patient == '34'){
				this.Insurance_Details1.PSID_Relation_To_Patient = 'Other Adult'
			}else if(this.Insurance_Details1.PSID_Relation_To_Patient == 'S'){
				this.Insurance_Details1.PSID_Relation_To_Patient = 'Self'
			}else if(this.Insurance_Details1.PSID_Relation_To_Patient == 'D'){
				this.Insurance_Details1.PSID_Relation_To_Patient = 'Unspecified Dependent'
			}else {
				this.Insurance_Details1.PSID_Relation_To_Patient = '-'
			}
		}
		this.Insurance_Details2 = patientData.Patient_Secondary2_Insurance_Details
		if(this.Insurance_Details2){
			if(this.Insurance_Details2.PSID_Relation_To_Patient == '01'){
				this.Insurance_Details2.PSID_Relation_To_Patient = 'Spouse'
			}else if(this.Insurance_Details2.PSID_Relation_To_Patient == '19'){
				this.Insurance_Details2.PSID_Relation_To_Patient = 'Child'
			}else if(this.Insurance_Details2.PSID_Relation_To_Patient == '34'){
				this.Insurance_Details2.PSID_Relation_To_Patient = 'Other Adult'
			}else if(this.Insurance_Details2.PSID_Relation_To_Patient == 'S'){
				this.Insurance_Details2.PSID_Relation_To_Patient = 'Self'
			}else if(this.Insurance_Details2.PSID_Relation_To_Patient == 'D'){
				this.Insurance_Details2.PSID_Relation_To_Patient = 'Unspecified Dependent'
			}else {
				this.Insurance_Details2.PSID_Relation_To_Patient = '-'
			}
		}
		this.Insurance_Details3 = patientData.Patient_Secondary3_Insurance_Details
		if(this.Insurance_Details3){
			if(this.Insurance_Details3.PSID_Relation_To_Patient == '01'){
				this.Insurance_Details3.PSID_Relation_To_Patient = 'Spouse'
			}else if(this.Insurance_Details3.PSID_Relation_To_Patient == '19'){
				this.Insurance_Details3.PSID_Relation_To_Patient = 'Child'
			}else if(this.Insurance_Details3.PSID_Relation_To_Patient == '34'){
				this.Insurance_Details3.PSID_Relation_To_Patient = 'Other Adult'
			}else if(this.Insurance_Details3.PSID_Relation_To_Patient == 'S'){
				this.Insurance_Details3.PSID_Relation_To_Patient = 'Self'
			}else if(this.Insurance_Details3.PSID_Relation_To_Patient == 'D'){
				this.Insurance_Details3.PSID_Relation_To_Patient = 'Unspecified Dependent'
			}else{
				this.Insurance_Details3.PSID_Relation_To_Patient = '-'
			}
		}

	}

	getPatientInfoViaId(bookingData){
		this.bookinglist=bookingData

		console.log(this.bookinglist)
		if(bookingData.PB_Notes != null){
			if(bookingData.PB_Notes[0] != ""){
				this.PB_Notes =bookingData.PB_Notes
			}

		}
		if(bookingData.PB_Reason){
			this.PB_Reason=bookingData.PB_Reason
		}
		this.PB_Forms =bookingData.PB_Forms
		this.PB_ALERTS = bookingData.PB_Alerts
		this.PB_Doc_Uploaded_List = bookingData.PB_Doc_Uploaded_List
		this.InsuranceAuthorization =bookingData.PB_Insurance_Precertification_Authorization
		this.Medical_Clearance = bookingData.PB_Preoprative_Medical_Clearance
		this.PB_Special_Request =  bookingData.PB_Special_Request
		this.SURGICAL_INFORMATION = bookingData.PB_Surgical_Procedure_Information
		if(bookingData.PB_Incient_Detail){
			this.INCIDENT_DETAILS = bookingData.PB_Incient_Detail
		}
		if(bookingData.PB_Surgical_Procedure_Information){
			this.Procedure_List = bookingData.PB_Surgical_Procedure_Information.SPI_Procedure_SelectedList
			this.CPT_List = bookingData.PB_Surgical_Procedure_Information.SPI_CPT_SelectedList
			this.ICD10_Code_List = bookingData.PB_Surgical_Procedure_Information.SPI_ICD_SelectedList

			if( this.formateDate(new Date(this.bookinglist.PB_Surgical_Procedure_Information.SPI_Date)) < this.formateDate(new Date()) && this.bookinglist.PB_Status == 'Approved'){
				this.checkPastDate = true
			}

			if( this.formateDate(new Date()) <= this.formateDate(new Date(this.bookinglist.PB_Surgical_Procedure_Information.SPI_Date))  && this.bookinglist.PB_Status == 'Action Required'  || this.bookinglist.PB_Status == 'Rejected' || this.bookinglist.PB_Status == 'Incomplete'){
				this.statusReqAndDateNotPased = true
			}
			if( this.formateDate(new Date()) <= this.formateDate(new Date(this.bookinglist.PB_Surgical_Procedure_Information.SPI_Date))  && this.bookinglist.PB_Status == 'Approved'){
				this.dateNotPassApproved = true
			}
			if( this.formateDate(new Date(this.bookinglist.PB_Surgical_Procedure_Information.SPI_Date)) <= this.formateDate(new Date()) && this.bookinglist.PB_Status != 'Approved' || this.bookinglist.PB_Status == 'Rejected' || this.bookinglist.PB_Status == 'Incomplete'){
				this.datePassedExpire = true
			}
			if(this.bookinglist.PB_Status != 'Rejected' && this.bookinglist.PB_Status != 'Incomplete'){
				// this.admin.PB_Status = true
				this.rejeectOrIncomp = true
			}

		}
		this.loadDynamicCss()


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
	downloadPdf(){
		location.href = "http://tchapi.thecloudhealth.com/api/Booking/DownloadPDF?bookingid="+this.getQueryStringID+"&patientid="+this.getQueryStringPID+"&Slug="+this.mySlug;
		var obj = {
			PB_Patient_ID:this.getQueryStringPID,
			PB_Unique_ID:  this.getQueryStringID,
			Slug: this.mySlug,
		}
		this.UserService.viewAndDownloadPDF(this.getQueryStringID, this.getQueryStringPID, this.mySlug).subscribe((data)=>{
			this.getRelationshipArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	// public captureScreen(){
		// 	var data = document.getElementById('contentToConvert');
		// 	html2canvas(data).then(canvas => {
			// 		// Few necessary setting options
			// 		var imgWidth = 195;
			// 		// var pageHeight = 300;
			// 		var imgHeight = canvas.height * imgWidth / canvas.width;
			// 		var heightLeft = imgHeight;

			// 		const contentDataURL = canvas.toDataURL('image/png')
			// 		let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
			// 		var options = {
				// 			pagesplit: true
				// 		};
				// 		var position = 0;
				// 		pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
				// 		pdf.save('MYPdf.pdf'); // Generated PDF
				// 	});
				// }
				getPdf(){
					$('#contentToConvert').printThis({
						debug: false,
						importCSS: true,
						importStyle: true,
						printContainer: true,
						// pageTitle: "Prescription",
						removeInline: false,
						printDelay: 555,
						header: null,
						formValues: true,
						loadCSS:""
					});
				}

				saveRejectReason(status){
					if(status == 'Rejected' ){
						if(this.rejectValue == '' || this.rejectValue == undefined || this.rejectValue == null){
							this.toster.warning('Please fill reject reason', 'Warning')
							return

						}
					}
					if(status == 'Incomplete' ){
						if(this.incompleteValue == '' || this.incompleteValue == undefined || this.incompleteValue == null){
							this.toster.warning('Please fill incomplete reason', 'Warning')
							return

						}
					}
					var arrData = []

					var obj:any= {
						PB_Unique_ID: this.getQueryStringID,
						PB_Modify_Date: new Date(),
						PB_Status: status,
						PB_User_Name: this.admin.UM_Username,
						PB_TimeZone: this.admin.UM_TimeZone,

					}
					if(this.rejectValue){
						arrData.push({
							RR_Message:this.rejectValue,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Reject = arrData

					}
					if(this.incompleteValue){
						arrData.push({
							RR_Message:this.incompleteValue,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Incomplete = arrData
					}
					if(this.reasons.noshow){
						arrData.push({
							RR_Message:this.reasons.noshow,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Noshow = arrData
					}
					if(this.reasons.suspended){
						arrData.push({
							RR_Message:this.reasons.suspended,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Suspended = arrData
					}
					if(this.reasons.unapproved){
						arrData.push({
							RR_Message:this.reasons.unapproved,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Unapproved = arrData
					}
					if(this.reasons.complete){
						arrData.push({
							RR_Message:this.reasons.complete,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Complete = arrData
					}
					if(this.reasons.approve){
						arrData.push({
							RR_Message:this.reasons.approve ,
							RR_Create_By: this.admin.UM_Unique_ID,
							RR_User_Name: this.admin.UM_Username,
							RR_Create_Date: new Date(),
							RR_TimeZone:this.admin.UM_TimeZone,
						})
						obj.PB_Approved = arrData
					}

					console.log(obj)
					this.UserService.updateRejectService(obj).subscribe((data)=>{
						this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
						if(data.Message == 'OK'){
							this.createBookingLog(data.Data, 'success')
						}else{
							this.createBookingLog(data.Message, 'error')
						}
						this.router.navigate(['/', 'appointment-list']);
					},err=>{
						console.log(err)
					})
					$("#approve").modal("hide");
					$("#forreject").modal("hide");
					$("#noshow").modal("hide");
					$("#suspended").modal("hide");
					$("#unapproved").modal("hide");
					$("#complete").modal("hide");
					$("#incomplete").modal("hide");
					$('body').removeClass('home modal-open');
				}
				createBookingLog(data, msg){
					var extraValue
					if(msg == 'success'){
						extraValue= "Booking No " + this.bookinglist.PB_Booking_No + " Update status in database By " + data.PB_User_Name
					}else{
						extraValue = data
					}
					var obj = {
						Section_Name: 'Booking',
						Page_Name: 'view-appointment',
						Operation: 'Status update',
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
				goLastLocation(){
					this.location.back()
				}
				formateDate(date) {
					var year = date.getFullYear();

					var month = (1 + date.getMonth()).toString();
					month = month.length > 1 ? month : '0' + month;

					var day = date.getDate().toString();
					day = day.length > 1 ? day : '0' + day;

					return day + '/' + month + '/' + year;
				}

				printDiv(contentToConvert) {
					var printContents = document.getElementById(contentToConvert).innerHTML;
					var originalContents = document.body.innerHTML;

					document.body.innerHTML = printContents;

					window.print();

					document.body.innerHTML = originalContents;
				}


				getNewPDF(){

					// var HTML_Width = $("#contentToConvert").width();
					// var HTML_Height = $("#contentToConvert").height();
					// var top_left_margin = 15;
					// var PDF_Width = HTML_Width+(top_left_margin*2);
					// var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
					// var canvas_image_width = HTML_Width;
					// var canvas_image_height = HTML_Height;

					// var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


					// html2canvas($("#contentToConvert")[0],{allowTaint:true}).then(function(canvas) {
						// 	canvas.getContext('2d');

						// 	console.log(canvas.height+" "+canvas.width);


						// 	var imgData = canvas.toDataURL("image/jpeg", 1.0);
						// 	var pdf = new jspdf('p', 'pt', [PDF_Width, PDF_Height]);
						// 	pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


						// 	for (var i = 1; i <= totalPDFPages; i++) {
							// 		pdf.addPage(PDF_Width, PDF_Height);
							// 		pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
							// 	}

							// 	pdf.save("HTML-Document.pdf");
							// });
						};

						loadDynamicCss(){
							var aa  = this
							setTimeout(function(){
								if(aa.admin){
									if(aa.admin.UM_Office_Type == 'S'){
										if(aa.setAccToSurgery){
											if(aa.setAccToSurgery.SurgC_Appearance){
												$(".header").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorDark_Hax)
												$(".btnsubmit").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
											}else{
												$(".header").css("background-color", '#006400')
												$(".btnsubmit").css("background-color",'#04a8c5');
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
											}
										}else{
											$("h1").css("color", "#2ca36c");
										}
									}
								}
							}, 30);
						}
						tConvert (time) {
							// Check correct time format and split into components
							time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

							if (time.length > 1) { // If time format correct
								time = time.slice (1);  // Remove full string match value
								time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
								time[0] = +time[0] % 12 || 12; // Adjust hours
							}
							return time.join (''); // return adjusted time or original string
						}

					}

