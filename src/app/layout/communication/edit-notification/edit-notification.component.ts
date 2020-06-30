import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {environment1} from '../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
import { ActivatedRoute ,Params} from '@angular/router';



@Component({
	selector: 'app-edit-notification',
	templateUrl: './edit-notification.component.html',
	styleUrls: ['./edit-notification.component.css']
})
export class EditNotificationComponent implements OnInit {
	newtypeelemet
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	newlist
	notificationcatntype
	setAccToSurgery
	reqData
	numberstep
	smsobj
	emailobj
	voiceobj
	allDataobj
	ObjectArray
	showLoader
	getnotification= [];
	datanew1 =[];
	finaldata =[];
	getNotificationType 
	getNotificationActionid
	indexvarible
	GetNotificationid
	mySlug
	getEthinicityArray
	NotiActions = [];
	dummyArrayForNow

	emailcheak = false;
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.reqData = {}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.numberstep = route.snapshot.queryParamMap.get('action');
		this.getNotificationActionid = route.snapshot.params.id
		console.log(this.getNotificationActionid)
		this.GetNotificationid = localStorage.getItem('myDataKey');
		console.log(this.GetNotificationid);  
		

	}


	ngOnInit() {
		this.reqData.dayandweeks=""
		this. getnotificationtiming();
		const routeParams = this.route.snapshot.params;
		this.ObjectArray = []
		this.smsobj = {}
		this.emailobj = {}
		this.voiceobj = {}
		this.allDataobj = []
		this.allDataobj.push(this.notificationcatntype);
		this.dummyArrayForNow = []
		if(!this.numberstep){
			this.numberstep = 1
		}
		
		this.reqData.dayandweeks = '0'
		this.reqData.eventafterbeforesms = ""
		this.reqData.eventdaysms = "0"
		this.reqData.messagesms = ""
		this.reqData.eventafterbeforeemail = ""
		this.reqData.eventdayemail = "0"
		this.reqData.messageemail = ""
		this.reqData.eventafterbeforevoice = ""
		this.reqData.eventdayvoice = "0"
		this.reqData.messagevoice = ""
		this.reqData.language = 'English'
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Update Notification Actions - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Update Notification Actions - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Update Notification Actions - The Cloud Health')
		}
		this.getDataViaId();


	}



	getnotificationtiming(){

		var Noticationtimming = {   

			
			NTT_Surgery_Physician_Center_ID:this.admin.UM_Surgary_Physician_CenterID,
			Slug:this.mySlug 

		}

		this.showLoader = true
		this.UserService.GetNotificationTimming(Noticationtimming).subscribe((Noticationtimming)=>{

			console.log('NoticationtimmingResponse :' +  JSON.stringify(Noticationtimming))
			if(Noticationtimming.Data){

				this.reqData.notificationtime =  Noticationtimming.Data.NTT_Time;
			}else{
				this.reqData.notificationtime = '19:00'
			}
			console.log(this.reqData.notificationtime)
			this.showLoader = false
		},err=>{
			console.log(err)
		}) 

	}


	getDataViaId(){

		this.showLoader = true
		var arr = []
		var myObj:any = {}
		myObj.NFA_Unique_ID = this.getNotificationActionid
		arr.push(myObj)


		var obj:any = {
			NFT_Unique_ID:this.GetNotificationid,
			NFT_Actions :arr,
			Slug: this.mySlug

		}

		this.UserService.getSingleNotificationsActons(obj).subscribe(data =>{
			this.NotiActions = data.Data.NFT_Actions
			console.log(data.Data.NFT_Actions)
			
			console.log(this.NotiActions[0].NFA_Action_Type)
			if(this.NotiActions[0].NFA_Action_Type == 'SMS')
			{

				$("#itssms").show();
				$("#itsemail").hide();
				$("#itswp").hide();
				$("#itsvoice").hide();
				this.getNotificationType = this.NotiActions[0].NFA_Action_Type
				this.reqData.eventafterbeforesms = this.NotiActions[0].NFA_Be_Af
				this.reqData.eventdaysms = this.NotiActions[0].NFA_Days
				this.reqData.messagesms = this.NotiActions[0].NFA_Message
				this.reqData.dayandweeks = this.NotiActions[0].NFA_DayOrWeek

			}
			if(this.NotiActions[0].NFA_Action_Type == 'Email')
			{
				$("#itssms").hide();
				$("#itsemail").show();
				$("#itswp").hide();
				$("#itsvoice").hide();
				this.getNotificationType = this.NotiActions[0].NFA_Action_Type 
				this.reqData.eventafterbeforeemail = this.NotiActions[0].NFA_Be_Af
				this.reqData.eventdayemail = this.NotiActions[0].NFA_Days
				this.reqData.messageemail = this.NotiActions[0].NFA_Message
				this.reqData.emailsubject = this.NotiActions[0].NFA_Action_Subject
				this.reqData.dayandweeks = this.NotiActions[0].NFA_DayOrWeek
			}
			if(this.NotiActions[0].NFA_Action_Type == 'Voice')
			{
				$("#itssms").hide();
				$("#itsemail").hide();
				$("#itswp").hide();
				$("#itsvoice").show();
				this.getNotificationType = this.NotiActions[0].NFA_Action_Type
				this.reqData.eventafterbeforevoice = this.NotiActions[0].NFA_Be_Af
				this.reqData.eventdayvoice = this.NotiActions[0].NFA_Days
				this.reqData.messagevoice = this.NotiActions[0].NFA_Message
				this.reqData.dayandweeks = this.NotiActions[0].NFA_DayOrWeek


			}
			if(this.NotiActions[0].NFA_Action_Type == 'Whatsapp')
			{
				$("#itssms").hide();
				$("#itsemail").hide();
				$("#itswp").show();
				$("#itsvoice").hide();
				this.getNotificationType = this.NotiActions[0].NFA_Action_Type
				this.reqData.eventafterbeforewhatsapp = this.NotiActions[0].NFA_Be_Af
				this.reqData.eventdaywhatsapp = this.NotiActions[0].NFA_Days
				this.reqData.messagewhatsapp = this.NotiActions[0].NFA_Message
				this.reqData.dayandweeks = this.NotiActions[0].NFA_DayOrWeek

			}
			this.showLoader = false

			
		},err=>{
			console.log(err)
		})
	}




	smsAction(){

		if(this.reqData.eventafterbeforesms == '' || this.reqData.eventafterbeforesms == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.eventdaysms == '' || this.reqData.eventdaysms == null)
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}
		if(this.reqData.messagesms == '' || this.reqData.messagesms == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}



		var SMS  = {
			NFA_Unique_ID :this.getNotificationActionid,
			NFA_Action_Type:"SMS",
			NFA_Timing:this.reqData.notificationtime,

			NFA_Action_Title:"SMS "   +' ' + $('#trigger option:selected').text()   + ' ' +  this.reqData.eventdaysms   + ' ' +  "Days",
			NFA_Action_Icon : "['fas', 'envelope-open']",
			NFA_Be_Af:this.reqData.eventafterbeforesms,
			NFA_Days:this.reqData.eventdaysms,

			NFA_Message:this.reqData.messagesms,
			NFA_Created_By:this.admin.UM_Unique_ID,
			NFA_User_Name:this.admin.UM_Username,
			NFA_Create_Date:new Date(),
			NFA_Modify_Date:new Date(),
			NFA_Is_Active:true,
			NFA_Is_Deleted:false,
			NFA_TimeZone:this.admin.UM_TimeZone,
			NFA_Status:"Pending"
		}
		
		this.dummyArrayForNow.push(SMS);
		console.log(SMS) 
		console.log(this.dummyArrayForNow) 
		this.editnotificatinsactions();

	}






	whatsappAction(){

		if(this.reqData.eventafterbeforewhatsapp == '' || this.reqData.eventafterbeforewhatsapp == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.eventdaywhatsapp == '' || this.reqData.eventdaywhatsapp == null)
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}
		if(this.reqData.eventdaywhatsapp == '' || this.reqData.eventdaywhatsapp == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}
		else{
			var Whatsapp  = {


				NFA_Unique_ID :this.getNotificationActionid,

				NFA_Action_Type:"Whatsapp",
				NFA_Action_Title:"Whatsapp "   +' ' + $('#trigger option:selected').text()   + ' ' +  this.reqData.eventdaywhatsapp   + ' ' +  "Days",
				NFA_Action_Icon : "['fas', 'whatsapp']",
				NFA_Be_Af:this.reqData.eventafterbeforewhatsapp,
				NFA_Days:this.reqData.eventdaywhatsapp,
				NFA_Timing:this.reqData.notificationtime,

				NFA_Message:this.reqData.messagewhatsapp,
				NFA_Created_By:this.admin.UM_Unique_ID,
				NFA_User_Name:this.admin.UM_Username,
				NFA_Create_Date:new Date(),
				NFA_Modify_Date:new Date(),
				NFA_Is_Active:true,
				NFA_Is_Deleted:false,
				NFA_TimeZone:this.admin.UM_TimeZone,
				NFA_Status:"Pending"

			}
			this.dummyArrayForNow.push(Whatsapp);
			console.log(Whatsapp) 
			console.log(this.dummyArrayForNow) 
			this.editnotificatinsactions();

		}


	}



	emailAction(){



		if(this.reqData.eventafterbeforeemail == '' || this.reqData.eventafterbeforeemail == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.eventdayemail == '' || this.reqData.eventdayemail == null)
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}
		if(this.reqData.messageemail == '' || this.reqData.messageemail == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		var Email  = {

			NFA_Unique_ID :this.getNotificationActionid,
			NFA_Action_Type:"Email",
			NFA_Be_Af:this.reqData.eventafterbeforeemail,
			NFA_Action_Title:"Email"   +  ' ' + $('#trigger option:selected').text()  + ' ' +   this.reqData.eventdayemail   + ' ' +    "Days",
			NFA_Action_Icon : "['fas', 'email']",
			NFA_Days:this.reqData.eventdayemail,
			NFA_Message:this.reqData.messageemail,
			NFA_Created_By:this.admin.UM_Unique_ID,
			NFA_User_Name:this.admin.User_Name,
			NFA_Timing:this.reqData.notificationtime,
			NFA_Modify_Date:new Date(),
			NFA_TimeZone:this.admin.UM_TimeZone,
			NFA_Status:"Pending"

		}
		this.dummyArrayForNow.push(Email); 
		console.log(this.dummyArrayForNow) 
		this.editnotificatinsactions();

	}

	voiceAction(){ 


		if(this.reqData.eventafterbeforevoice == '' || this.reqData.eventafterbeforevoice == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.eventdayvoice == '' || this.reqData.eventdayvoice == null)
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}
		if(this.reqData.messagevoice == '' || this.reqData.messagevoice == null )
		{
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}


		var Voice  = {	    
			NFA_Unique_ID :this.getNotificationActionid,
			NFA_Action_Type:"Voice",
			NFA_Be_Af:this.reqData.eventafterbeforevoice,
			NFA_Timing:this.reqData.notificationtime,

			NFA_Action_Title:"Voice " + ' ' + $('#trigger option:selected').text()  + ' ' +  this.reqData.eventdayvoice  + ' ' + "Days",
			NFA_Action_Icon : "['fas', 'headphone-alt-1']",
			NFA_Days:this.reqData.eventdayvoice,
			NFA_Message:this.reqData.messagevoice,
			NFA_Created_By:this.admin.UM_Unique_ID,
			NFA_User_Name:this.admin.User_Name,
			NFA_Create_Date:new Date(),
			NFA_Modify_Date:new Date(),
			NFA_Is_Active:true,
			NFA_Is_Deleted:false,
			NFA_TimeZone:this.admin.UM_TimeZone,
			NFA_Status:"Pending"

		}


		

		this.dummyArrayForNow.push(Voice);
		console.log(Voice) 
		console.log(this.NotiActions) 
		this.editnotificatinsactions();
		//this.router.navigate(['/notifications'])

	}


	editnotificatinsactions(){

		console.log('Hey Rahul',this.dummyArrayForNow)

		var Noti = {


			NFT_Unique_ID: this.GetNotificationid,           
			NFT_Actions: this.dummyArrayForNow,                       
			NFT_Modify_Date :new Date(),
			NFT_TimeZone:this.admin.UM_TimeZone,
			Slug :'',  

		}
		console.log("Object Passed : " + Noti);
		// debugger;
		this.showLoader = true
		this.UserService.editNotificationsActons(Noti).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))
			var a  =JSON.stringify(data1)
			console.log(JSON.parse(a))

			this.showLoader = false
		},err=>{
			console.log(err)
		})   
		localStorage.removeItem('myDataKey');
		this.goBack();

	}




	smsblock(){
		$("#smsblock").modal("show");

	}


	sendoverview(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning(this.translate.instant('length should be greater then six digit'), this.translate.instant('Warning'))
		}
		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined)
		{

			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.messagesms == '' || this.reqData.messagesms == null || this.reqData.messagesms == undefined)
		{
			this.toster.warning(this.translate.instant('Please Fill  the message Field'), this.translate.instant('Warning')) 
			return 

		}

		var Sms = {   


			Receiver_Contact_No:'+'   + this.reqData.mycontact,
			Message_Body: this.reqData.messagesms,
			Message_Date:new Date(),
			Message_Title: 'hello'
		}
		console.log(Sms)

		this.showLoader = true
		this.UserService.sendsms(Sms).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		})   
		
		$("#smsblock").modal("hide");
		$('body').removeClass('modal-open');
		// this.toster.success(this.translate.instant('Please Fill  the message Field'), this.translate.instant('Success')) 
	}
	voiceblock()
	{
		$("#voiceblock").modal("show");

	}

	sendvoicemassage(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning(this.translate.instant('length should be greater then six digit'), this.translate.instant('Warning'))
		}
		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined)
		{

			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.messagevoice == '' || this.reqData.messagevoice == null || this.reqData.messagevoice == undefined)
		{
			this.toster.warning(this.translate.instant('Please Fill  the message Field'), this.translate.instant('Warning')) 
			return 

		}


		var voice = {   

			Voice_Receiver_Contact_No: '+'   + this.reqData.mycontact,
			Voice_Call_Body: this.reqData.messagevoice,
			Voice_Call_Date:new Date(),
			Voice_Call_Title: 'hello',
			Voice_Receiver_Name:'ravi',
		}
		console.log(voice)

		this.showLoader = true
		this.UserService.sendvoicecall(voice).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		}) 


		$("#voiceblock").modal("hide");
		$('body').removeClass('modal-open');
		this.toster.success(this.translate.instant('Voice Massage Send Succsesfully'), this.translate.instant('Success')) 

	}






	whatsapp()
	{  $("#whatsapp").modal("show");   }

	sendwhatsappmassage(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning(this.translate.instant('length should be greater then six digit'), this.translate.instant('Warning'))
		}

		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined )
		{
			if (($("#mycontact").val().length) < 6) {
				return this.toster.warning('length should be greater then six', 'Warning') 
			}
			this.toster.warning(this.translate.instant('Please Fill all the Field'), this.translate.instant('Warning'))
			return 

		}

		if(this.reqData.messagewhatsapp == '' || this.reqData.messagewhatsapp == null || this.reqData.messagewhatsapp == undefined)
		{
			this.toster.warning(this.translate.instant('Please Fill  the message Field'), this.translate.instant('Warning')) 
			return 

		}

		var whatsapp = {   

			Receiver_Contact_No: '+'   + this.reqData.mycontact,
			Message_Body: this.reqData.messagewhatsapp,
			Message_Date:new Date(),
			Message_Title: 'hello'
		}
		console.log(whatsapp)

		this.showLoader = true
		this.UserService.sendwhatsappmassages(whatsapp).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		}) 


		$("#whatsapp").modal("hide");
		$('body').removeClass('modal-open');
		this.toster.success(this.translate.instant('Whatsapp Massage Send Succsesfully'), this.translate.instant('Success'))

	}




	emailblock(){
		$("#emailblock").modal("show");

	}


	sendemail(){

		if (this.emailcheak == false) 
		{
			this.toster.warning(this.translate.instant('Invalid Email Address'), this.translate.instant('Warning'))
			return false;
		}

		if(this.reqData.emailaddress == '' || this.reqData.emailaddress == null || this.reqData.emailaddress == undefined)
		{   
			this.toster.warning(this.translate.instant('Please fill Email'), this.translate.instant('Warning')) 
			return 

		}


		if(this.reqData.emailsubject == '' || this.reqData.emailsubject == null || this.reqData.emailsubject == undefined)
		{
			this.toster.warning(this.translate.instant('Please Fill Subject'), this.translate.instant('Warning'))
			return 

		}
		if(this.reqData.messageemail == '' || this.reqData.messageemail == null || this.reqData.messageemail == undefined )
		{
			this.toster.warning(this.translate.instant('Please Fill the message Field'), this.translate.instant('Warning')) 
			return 

		}
		var tomail = []
		tomail.push(this.reqData.emailaddress)
		var email = {   

			from_email:'tch.techconnect@gmail.com',
			From_Name: 'TheCloudHealth',
			To_Email: tomail,
			To_Name: this.reqData.emailname,
			Subject:this.reqData.emailsubject,
			PlainTextContent:'',
			HtmlContent:this.reqData.messageemail,
		}
		console.log(email)

		this.showLoader = true
		this.UserService.sendemail(email).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		})   

		$("#emailblock").modal("hide");
		$('body').removeClass('modal-open');
		this.toster.success(this.translate.instant('Email Send Succsesfully'), this.translate.instant('Success'))

	}



	addnotificatinsactions(){

		var Noti = {   

			NFT_Unique_ID: this.GetNotificationid,           
			NFT_Actions: this.ObjectArray,                       
			NFT_Modify_Date :new Date(),
			NFT_Is_Active: true,
			NFT_Is_Deleted: false,
			NFT_TimeZone:this.admin.UM_TimeZone,
			Slug :'',  

		}

		this.showLoader = true
		this.UserService.NotificationsActionCreate(Noti).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		})          
	}

	goBack(){
		this.location.back()
	}
	alidateEmail(sEmail) {
		var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

		if(!sEmail.match(reEmail)) {
			this.toster.warning(this.translate.instant('Invalid Email Address'), this.translate.instant('Warning'))
			return false;
		}

		return  this.emailcheak = true;

	}









}
