import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
declare var $:any
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {environment1} from '../../../environments/environment.prod';
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-video-chat',
	templateUrl: './video-chat.component.html',
	styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
	setAccToSurgery
	admin
	getUniqueId
	mySlug
	getbookingObject
	roomName
	patientInfo
	getPatientFullName
	siteLink
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private translate: TranslateService,) { 
		this.getUniqueId = route.snapshot.params.id
		this.getPatientFullName = route.snapshot.params.name
		console.log(this.getPatientFullName)
		localStorage.setItem('identityId', this.getUniqueId)
		localStorage.setItem('identityName', this.getPatientFullName)
		this.siteLink = environment1.siteLink
	}

	ngOnInit(): void {
		this.getbookingObject= {}
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Virtual Consultation Video Call - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Virtual Consultation Video Call - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Virtual Consultation Video Call - The Cloud Health')
		}
		setTimeout(function(){
				$(".generttknmy").trigger("click");
			}, 1000);
			var obj = {
				VCB_Unique_ID: this.getUniqueId,
				Slug: this.mySlug
			}
			this.findBooking()

		}
		findBooking(){
			var obj = {
				VCB_Unique_ID: this.getUniqueId,
				Slug: this.mySlug
			}
			this.UserService.findOneVcBooking(obj).pipe(map( bookingData => {
				const user = bookingData;
				console.log(bookingData.Data)
				this.getbookingObject = bookingData.Data
				return user;
			}),
			mergeMap( user =>  this.UserService.getPatinetViaId({Patient_Unique_ID:user.Data.VCB_Patient_ID, Slug:'', })),take(1)
			).subscribe( patientData => {
				console.log(patientData.Data)
				this.patientInfo = patientData.Data //Patient_Email //Patient_Primary_No
			});
		}
		joinedRoom(){
			console.log(this.roomName)
			if(this.roomName =='' || this.roomName==undefined || this.roomName== null){
				this.toster.warning('Please enter room name', 'Warning')
				return
			}
			this.sendSMSEmail()
		}
		sendSMSEmail(){
			var Sms = {   
				Receiver_Contact_No:this.patientInfo.Patient_Primary_No,
				Message_Body: 'Your Email is : ' + this.patientInfo.Patient_Email + ' and the chat link is : '+ "<a href=" + this.siteLink+"/user-video-chat/"+this.roomName + ">Click Here</a>",
				Message_Date:new Date(),
				Message_Title: 'Video Chat Link'
			}
			var tomail = []
			tomail.push(this.patientInfo.Patient_Email)
			var Email:any= {};
			Email.to_email=tomail;
			Email.To_Name=this.patientInfo.Patient_First_Name;
			Email.Bcc_Email=[]
			Email.Cc_Email=[]
			Email.Subject=" Dr. "+ this.admin.UM_Username + " is online for virtual consultation";
			Email.From_Email = "tch.techconnect@gmail.com";
			Email.From_Name = "The Cloud Health";
			Email.PlainTextContent = "";
			Email.HtmlContent ="<p> Please click the link below for online consultation </p>"+
			 "<a href=" + this.siteLink+"/user-video-chat/"+this.roomName + ">Click Here</a>"
			 + "<br>"+"<br>"+ "Thanks" + "<br>"+ "Support Team" + "<br>" + this.setAccToSurgery.PhyO_DBA_Name;
			let religion = this.UserService.sendsms(Sms).map(res =>res)
			let ethenicity = this.UserService.sendemail(Email).map(res =>res)
			Observable.forkJoin([religion, ethenicity,  ]).subscribe(results =>{
				console.log(results[0])
				console.log(results[1])
			})

		}
	}
	