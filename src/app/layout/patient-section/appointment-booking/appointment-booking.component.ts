import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any
import {environment1} from '../../../../environments/environment.prod';

import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { isArray } from 'util';
import { __values } from 'tslib';


@Component({
	selector: 'app-appointment-booking',
	templateUrl: './appointment-booking.component.html',
	styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

	todayDate = new Date()
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	PatientArray = [];
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	GetNotiCategoryListArray
	reqData
	reqDatatosent  
	noti_typesList
	mySlug
	Patient_Unique_Id
	User_Password
	User_Passcode
	User_Unique_ID
	emailcheak = false;
	siteLink

	showLoader: boolean;

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) {
		if(!localStorage.getItem('patientLogin')){
			console.log('goto out')
			this.router.navigateByUrl('not-found')
			return
		}
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
		this.siteLink = environment1.siteLink
	}

	ngOnInit() {

		this.noti_typesList = []
		this.reqData = {}
		this.dropToggle()
		this.reqDatatosent = {}
		this.reqData.slctPrefix =""
		this.reqData.appointmenttime= "10:00"
         

		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Add Appointment - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Add Appointment - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Add Appointment - The Cloud Health')
		}
		// this.GetNotiCategoryList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'item_id',
			textField: 'item_text',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			//itemsShowLimit: 3,
			allowSearchFilter: true
		};
	}



	alidateEmail(sEmail) {
		var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

		if(!sEmail.match(reEmail)) {
			this.toster.error('Invalid Email Address');
			return false;
		}

		return  this.emailcheak = true;

	}


			 phonenumber()
			{    
			
			  if(this.reqData.phone.length <= 5)
			        {
			      return true;
			        }
			      else
			        {
			     	this.toster.error('Invalid Phone Number'); 
			        return false;
			        }
			}


	finalAction(){

		if(this.reqData.slctPrefix == '' || this.reqData.slctPrefix == undefined || this.reqData.slctPrefix == null){
			this.toster.warning(this.translate.instant('Please Select Prefix'), this.translate.instant('Warning'))  
			return
		}

		else if(this.reqData.firstname == '' || this.reqData.firstname == undefined || this.reqData.firstname == null){
			this.toster.warning(this.translate.instant('Please fill First Name'), this.translate.instant('Warning'))  
			return
		}
		else if(this.reqData.lastname == '' || this.reqData.lastname == undefined || this.reqData.lastname == null){
			this.toster.warning(this.translate.instant('Please fill Last Name'), this.translate.instant('Warning'))  
			return
		}
		if(this.reqData.email == '' || this.reqData.email == undefined || this.reqData.email == null){
			this.toster.warning(this.translate.instant('Please fill Email'), this.translate.instant('Warning'))  
			return
		}else if(this.reqData.phone == '' || this.reqData.phone == undefined || this.reqData.phone == null){
			this.toster.warning(this.translate.instant('Please fill Phone Number'), this.translate.instant('Warning'))  
			return
		}
		else if(this.reqData.appointmentdate == '' || this.reqData.appointmentdate == undefined || this.reqData.appointmentdate == null){
			this.toster.warning('Please fill Appointment Date  ', 'Warning')  
			return
		}

		var akObj = {
			Patient_Prefix: this.reqData.slctPrefix,
			Patient_First_Name: this.reqData.firstname,
			Patient_Middle_Name: "",
			Patient_Last_Name: this.reqData.lastname,
			Patient_DOB: new Date(),
			Patient_Sex: "",
			Patient_SSN: "",
			Patient_Address1: "",
			Patient_Address2: "",
			Patient_City: "",
			Patient_State: "",
			Patient_Zipcode: "",
			Patient_Primary_No: this.reqData.phone,
			Patient_Secondary_No: "",
			Patient_Work_No: "",
			Patient_Emergency_No: "",
			Patient_Email: this.reqData.email,
			Patient_Religion: "",
			Patient_Ethinicity: "",
			Patient_Race: "",
			Patient_Marital_Status: "",
			Patient_Nationality: "",
			Patient_Language: "",
			Patient_Height_In_Ft: "",
			Patient_Height_In_Inch: "",
			Patient_Weight: "",
			Patient_Spouse_No: "",
			Patient_Is_Active: true,
			Patient_Created_By: this.admin.UM_Unique_ID,
			Patient_Create_Date: new Date(),
			Patient_Modify_Date: new Date(),
			Patient_User_Name: this.admin.UM_Username,
			Patient_Is_Deleted: false,
			Patient_Surgery_Physician_Center_ID: this.admin.UM_Surgary_Physician_CenterID,
			Patient_Office_Type: this.admin.UM_Office_Type,
			Patient_TimeZone: this.admin.UM_Username,
			Patient_Body_Mass_Index: "",
			Slug:this.mySlug
		}
		this.UserService.addPatient(akObj).subscribe((PatientResponse)=>{
			console.log('Response :' +  JSON.stringify(PatientResponse))
			console.log('PatientResponse');
			this.PatientArray=PatientResponse;
			this.Patient_Unique_Id=PatientResponse.Data.Patient_Unique_ID
		
			var BookingObj = {
				PB_Patient_Name:this.reqData.firstname, 
				PB_Patient_Last_Name:this.reqData.lastname,
				PB_Patient_ID:this.Patient_Unique_Id,

				PB_Patient_Email:this.reqData.email, 
				PB_Patient_Phone:this.reqData.phone,

				PB_Create_Date: new Date(),
				PB_Modify_Date: new Date(),
				PB_TimeZone : this.admin.UM_TimeZone,
				PB_Booking_Date: this.reqData.appointmentdate,
				PB_Is_Active: true,
				PB_Booked_From:'NB',
				PB_Status: 'Action Required',
				PB_Created_By: this.admin.UM_Unique_ID,
				PB_User_Name: this.admin.UM_Username,
				PB_Booking_Physician_Office_ID : this.admin.UM_Surgary_Physician_CenterID,
				PB_Booking_Physician_Office_Name : this.admin.UM_Username,
				PB_Is_Deleted: false,
				PB_Booking_Time: this.reqData.appointmenttime,
				Slug:this.mySlug
			}
			// Section for Booking
			this.UserService.addBooking(BookingObj).subscribe((BookingResponse)=>{
				console.log('Response :' +  JSON.stringify(BookingResponse))
				console.log('BookingResponse');
				this.showLoader = false
			},err=>{
				console.log(err)
			})

			//End Of Section for Booking

			// Section for user
			this.User_Password=this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			this.User_Passcode=this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
			var UserObj = {
				UM_Member_ID:this.Patient_Unique_Id,
				UM_Username: this.reqData.firstname,
				UM_Password: this.User_Password,
				UM_Passcode:this.User_Passcode,
				UM_Email: this.reqData.email,
				UM_PhoneNo: this.reqData.phone,
				UM_Surgary_Physician_CenterID: this.admin.UM_Surgary_Physician_CenterID,
				UM_Office_Type: this.admin.UM_Office_Type,
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
						Receiver_Contact_No:'+'   + this.reqData.phone,
						Message_Body: 'Your Email is : ' + this.reqData.email + ' and passcode is : ' 
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
						Receiver_Contact_No:'+'   + this.reqData.phone,
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
					tomail.push(this.reqData.email)
					var email = {   
						from_email:'tch.techconnect@gmail.com',
						From_Name: 'TheCloudHealth',
						To_Email: tomail,
						To_Name: this.reqData.firstname,
						Subject:'User Credentials',
						PlainTextContent: 'Your Email is : ' + this.reqData.email + 
						' and passcode is : ' + this.User_Passcode   +" "  +" "  +" "  +" "  +" "  +
						" "  + "To get the information on whatsapp send text"  + " 'Join strength-cat' on +1(415) 523-8886 ",
						HtmlContent:'',
					}
					console.log(email)

					this.showLoader = true
					this.UserService.sendemail(email).subscribe((data1)=>{
						console.log('Response :' +  JSON.stringify(data1))

						this.showLoader = false
					},err=>{
						console.log(err)
					})
					var link  = this.siteLink+'/notification-passcode/'

					console.log(this.User_Unique_ID)

					var email1 = {   
						from_email:'tch.techconnect@gmail.com',
						From_Name: 'TheCloudHealth',
						To_Email: tomail,
						To_Name: this.reqData.firstname,
						Subject:'Passcode Link',
						PlainTextContent: 'Please Update your Passcode',
						HtmlContent: "<a href=" + link +this.User_Unique_ID+ ">Link</a> ",

					}
					console.log(email1)

					this.showLoader = true
					this.UserService.sendemail(email1).subscribe((data1)=>{
						console.log('Response :' +  JSON.stringify(data1))

						this.showLoader = false
					},err=>{
						console.log(err)
					})




					//End of Email Section
				}


				this.showLoader = false
			},err=>{
				console.log(err)
			})

			//End of Section for user
			this.toster.success('Summited Succsesfully', 'success')  ;

			this.showLoader = false
		},err=>{
			console.log(err)
		});
//End Of Patient Section

this.showLoader = true
this.router.navigate(['/login'])

}

dropToggle () {
	const $menu = $('.dropdown_cust');

	$(document).mouseup(e => {
		if (!$menu.is(e.target) // if the target of the click isn't the container...
			&& $menu.has(e.target).length === 0) // ... nor a descendant of the container
		{
			$menu.removeClass('showDrop');
		}
	});

	$('.dropbtn').on('click', () => {
		$menu.toggleClass('showDrop');
	});

}

randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
}
logOut(){
	localStorage.removeItem ('isLoggedin');
	localStorage.removeItem('loginData');
	localStorage.removeItem('setAccToSurgery');
	localStorage.removeItem('setAccToSurgery');
	localStorage.removeItem('patientLogin')
	this.router.navigate(['/'])
}


}
