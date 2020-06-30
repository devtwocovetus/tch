import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import {environment1} from '../../../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-surgery-forms',
	templateUrl: './surgery-forms.component.html',
	styleUrls: ['./surgery-forms.component.css'],
	providers:[DatePipe]
})
export class SurgeryFormsComponent implements OnInit {
	reqData
	admin
	getfromArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedEthinicityArray
	setAccToSurgery
	getUniqueId
	trysomeing
	saveSpecsCheckBox
	packCategoryArray
	getFormId
	getFormname
	getFormArraytoShow
	getPatientUniqueId
	getUserEmail
	getAnchorLink
	getpatientName
	getpatietnLastName
	getPatientBookingId
	getOnlyIdsOfArray
	checkDataExist:boolean
	mySlug
	sendThePassCode
	getSendForm
	getFormPasscode
	surPhyName
	getBookingData:any = {}
	constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private translate: TranslateService,
		private datePipe: DatePipe) {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getUniqueId = route.snapshot.params.id;
		console.log(this.getUniqueId)
	}

	ngOnInit() {
		this.saveSpecsCheckBox = []
		this.packCategoryArray = []
		this.getFormArraytoShow= []
		this.getOnlyIdsOfArray = []
		this.checkDataExist = false
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Surgery Forms - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Surgery Forms - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Surgery Forms - The Cloud Health')
		}
		this.hideShow()
		this.form = new FormGroup({
			Ethi_Name: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z ]*')]),
			Ethi_Type: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z ]*')]),
		});
		this.reqData = {}
		this.getfromArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
			this.surPhyName = this.setAccToSurgery.PhyO_DBA_Name
		}else if(this.admin.UM_Office_Type == 'S'){
			this.mySlug = this.admin.UM_Slug_SC
			this.surPhyName = this.setAccToSurgery.SurgC_DBA_Name
		}
		// this.getEthinicityList()
		this.sendThePassCode = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') 
		this.noticategory()
		this.getBokingData()
		this.sysEmail()
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

	
	noticategory(){
		var obj = {
			Slug: this.mySlug,
			Pack_Surgery_Physician_Id: this.admin.UM_Surgary_Physician_CenterID,
			Pack_SC_Id: this.setAccToSurgery.PhyO_Surgery_Center_ID
		}
		this.UserService.getPackListDD(obj).subscribe((data)=>{
			console.log(data)
			this.packCategoryArray = data.DataList

			this.showLoader  = false
		},err=>{
			console.log(err)
		})
	}
	sysEmail(){
		var sys = {
			Slug: this.mySlug,
			SET_Name:'Important: Please fill the form'
		}
		var sys1 = {
			Slug: this.mySlug,
			SET_Name:'Important: Activation Passcode'
		}
		this.UserService.seletEmailViaName(sys).subscribe((data)=>{
			console.log(data.Data.SET_Message)
			
			this.getSendForm = data.Data

		},err=>{
			console.log(err)
		})
		this.UserService.seletEmailViaName(sys1).subscribe((data1)=>{
			this.getFormPasscode = data1.Data
		},err=>{
			console.log(err)
		})
	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
	}
	isSelected(topic){
		if(this.trysomeing){
			return this.trysomeing.indexOf(topic.Form_Pack_Name) >= 0;
		}
	}
	onChange(category, isChecked: boolean){
		// this.saveSpecsCheckBox = this.getOnlyIdsOfArray
		if(isChecked) {
			if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
			}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
			}else{
				$(".fa-check").css("background-color", 'green!important')
			}
			if (this.saveSpecsCheckBox.some(e => e.PF_Form_ID === category.Form_Unique_ID)) {
				return
			}
			this.saveSpecsCheckBox.push({
				PF_Form_Name:category.Form_Name,
				PF_Form_ID: category.Form_Unique_ID,
				PF_Form_Type: category.Form_Type,
				PF_Pack_ID: this.getFormId,
				PF_Pack_Name:this.getFormname,
				PF_Created_By: this.admin.UM_Unique_ID,
				PF_User_Name: this.admin.UM_Username,
				PF_Create_Date: new Date(),
				PF_Modify_Date: new Date(),
				PF_TimeZone: this.admin.UM_TimeZone,
				PF_Is_Lock:false,
			});
			this.getOnlyIdsOfArray.push(category.Form_Unique_ID)
		} else {
			var index = this.saveSpecsCheckBox.findIndex(x => x.PF_Form_ID == category.Form_Unique_ID);
			this.saveSpecsCheckBox.splice(index,1);
		}		
		console.log(this.saveSpecsCheckBox)
		

	}
	getNCUniqueId(id, name){
		this.checkDataExist = true
		this.getFormId = id
		this.getFormname = name
		var obj1 = {
			Slug: this.mySlug,
			Form_Pack_ID:id,
			Form_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID
		}
		$('#formfinallist').dataTable().fnDestroy();
		this.UserService.GetFormFilterWithPackID(obj1).subscribe((data)=>{
			console.log(data)
			this.getfromArray = data.DataList

			$(document).ready(function() {
				setTimeout(function(){
					$('#formfinallist').DataTable();
				}, 100);
			} );
			this.showLoader  = false
		},err=>{
			console.log(err)
		})
	}
	savePatienrtForm(){
		var obj = {
			PB_Unique_ID:this.getUniqueId,
			PB_TimeZone:this.admin.UM_TimeZone,
			PB_Modify_Date: new Date(),
			PB_Is_Deleted:false,
			PB_Forms : this.saveSpecsCheckBox,
			Slug: this.mySlug,

		}
		console.log(obj)
		this.UserService.assignPatientForms(obj).subscribe((data)=>{
			console.log(data)
			this.packCategoryArray = data.DataList
			this.ref.detectChanges()
			var obj5 = {
				Patient_Unique_ID: this.getPatientUniqueId,
				Slug: this.mySlug
			}
			this.UserService.getpatientEmail(obj5).subscribe((data1)=>{
				console.log(data1)
				this.ref.detectChanges()
				this.getUserEmail = data1.DataString
				for (var i = 0; i < this.saveSpecsCheckBox.length; i++) {
					var myformnmae = this.saveSpecsCheckBox[i].PF_Form_Name
						console.log(myformnmae)
					var neObj:any = {
						PFU_Booking_ID: this.getUniqueId,
						PFU_URL: '',
						PFU_SURL:'' ,
						PFU_Is_Active: '',
						Slug: this.mySlug,
						PFU_Passcode: this.sendThePassCode
					}
					neObj.PFU_Form_ID = this.saveSpecsCheckBox[i].PF_Form_ID
					console.log(neObj)
					this.UserService.generatePatientFormUrl(neObj).subscribe((data2)=>{
						console.log(data2)
						this.getAnchorLink = data2.Data.PFU_Dummy_URL
						//getUserEmail
						this.ref.detectChanges()   
						// this.getFormPasscode  this.getBookingData.PB_Surgical_Procedure_Information.SPI_Date
						// this.getSendForm.   this.getBookingData.SPI_Time
						 var date1 = this.datePipe.transform(this.getBookingData.PB_Surgical_Procedure_Information.SPI_Date, 'MM/dd/yyyy')    
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[FirstName]", this.getpatientName);
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[FacilityName]", this.surPhyName);
						// this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("&lt;form name&gt;", myformnmae);
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[URL]", "<a href="+this.getAnchorLink + ">"+this.getAnchorLink+"</a>");
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[FacilityName]", this.surPhyName);
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[mm/dd/yy]", date1);
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[hr:mn]", this.getBookingData.PB_Surgical_Procedure_Information.SPI_Time);
						this.getSendForm.SET_Message = this.getSendForm.SET_Message.replace("[Dr name]",this.getBookingData.PB_Surgical_Procedure_Information.SPI_Surgeon_Name);
						this.getSendForm.SET_Footer = this.getSendForm.SET_Footer.replace("[FacilityName]", this.surPhyName);
						this.getSendForm.SET_Footer = this.getSendForm.SET_Footer.replace("[Email]", this.getSendForm.SET_From_Email);
						var tomail = []
						tomail.push(this.getUserEmail)
						var emailObj = {
							from_email:this.getSendForm.SET_From_Email,
							From_Name: this.getSendForm.SET_From_Name,
							To_Email: tomail,
							Bcc_Email: this.getSendForm.SET_Bcc,
							Cc_Email: this.getSendForm.SET_CC,
							To_Name: this.getUserEmail,
							Subject: this.getSendForm.SET_Name,
							PlainTextContent:'' ,
							HtmlContent: '<img src='+environment1.image+this.getSendForm.SET_Header+' height="47.58px" width="115px" alt="logo">' + "<br><br><br>" + this.getSendForm.SET_Message + "<br><br><br>" + this.getSendForm.SET_Footer //"<a href=" + this.getAnchorLink + ">Click Here</a> "
						}
						console.log(emailObj)
						this.saveSpecsCheckBox[i]
						this.UserService.sendEmailToPatient(emailObj).subscribe((data3)=>{
							console.log(data3)
							//anand@engage360.in
							this.getFormPasscode.SET_Message = this.getFormPasscode.SET_Message.replace("Firstname", this.getpatientName);
							this.getFormPasscode.SET_Message = this.getFormPasscode.SET_Message.replace("&lt;Physician office name&gt;", this.surPhyName);
							this.getFormPasscode.SET_Message = this.getFormPasscode.SET_Message.replace("<strong>passcode</strong>", "<strong>" + this.sendThePassCode + "</strong>");
							this.getFormPasscode.SET_Message = this.getFormPasscode.SET_Message.replace("&lt;Physician office name&gt;", this.surPhyName);
							var passobj = {
								from_email:this.getFormPasscode.SET_From_Email,
								From_Name: this.getFormPasscode.SET_From_Name,
								To_Email: tomail,
								Bcc_Email: this.getFormPasscode.SET_Bcc,
								Cc_Email: this.getFormPasscode.SET_CC,
								To_Name: this.getUserEmail,
								Subject: this.getFormPasscode.SET_Name,
								PlainTextContent: '',
								HtmlContent: '<img src='+environment1.image+this.getFormPasscode.SET_Header+' height="47.58px" width="115px" alt="logo">' + "<br><br><br>" + this.getFormPasscode.SET_Message + "<br><br><br>" + this.getFormPasscode.SET_Footer,
							}

							this.saveSpecsCheckBox[i]
							this.UserService.sendEmailToPatient(passobj).subscribe((data3)=>{
								console.log(data3)
								this.ngOnInit()
								// this.ref.detectChanges()
							},err=>{
								console.log(err)
							})
							this.ngOnInit()
							// this.ref.detectChanges()
						},err=>{
							console.log(err)
						})

					},err=>{
						console.log(err)
					})
				}
			},err=>{
				console.log(err)
			})
			
			
		},err=>{
			console.log(err)
		})
		$("#openlsit").modal("hide");
		$('body').removeClass('modal-open');
	}
	getBokingData(){

		this.showLoader = true
		$('#finaltableshhoe').dataTable().fnDestroy();
		var obj = {
			Slug: this.mySlug,
			PB_Unique_ID: this.getUniqueId
		} 
		this.UserService.getBookingViaId(obj).subscribe((data)=>{
			console.log(data)
			this.getBookingData = data.Data
			this.getFormArraytoShow = data.Data.PB_Forms
			this.getPatientBookingId = data.Data.PB_Booking_No
			this.getPatientUniqueId= data.Data.PB_Patient_ID
			this.getpatientName = data.Data.PB_Patient_Name
			this.getpatietnLastName = data.Data.PB_Patient_Last_Name
			$('#finaltableshhoe').dataTable().fnDestroy();
			$(document).ready(function() {
				setTimeout(function(){
					$('#finaltableshhoe').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	checkRadioButton(evt, id){
		console.log(evt)
		for (var i = 0; i < this.saveSpecsCheckBox.length; i++) {
			if(this.saveSpecsCheckBox[i].PF_Form_ID == id){
				console.log('im in')
				this.saveSpecsCheckBox[i].PF_Is_Lock = evt
			}
			break;
		}
		console.log(this.saveSpecsCheckBox)
	}
	randomString(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
			return result;
	}
	goLastLocation(){
		this.location.back()
	}
	removeDataList(data){
		console.log(data)
		this.saveSpecsCheckBox = this.saveSpecsCheckBox.filter((item) => item.PF_Form_ID !== data.PF_Form_ID);
		this.getfromArray = []
	}

}
//PB_Patient_ID