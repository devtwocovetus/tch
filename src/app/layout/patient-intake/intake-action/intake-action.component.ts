import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {environment1} from '../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
import { ActivatedRoute ,Params} from '@angular/router';
@Component({
	selector: 'app-intake-action',
	templateUrl: './intake-action.component.html',
	styleUrls: ['./intake-action.component.css']
})
export class IntakeActionComponent implements OnInit {
	maxDate = new Date()
	maxDate1 = new Date()
	showLoader: boolean;
	admin	
	notificationcatntype
	setAccToSurgery
	ObjectArray=[]
	reqData
	numberstep
	smsobj
	emailobj
	voiceobj
	allDataobj
	GetNotificationid
	notificatinAcrion=[]
	Country:any =[];
	countrycodes =[];
	emailcheak = false;
	mySlug

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute,) {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.notificationcatntype = JSON.parse(localStorage.getItem('notificationcatntype'))
		this.numberstep = route.snapshot.queryParamMap.get('action');
		this.GetNotificationid = localStorage.getItem('myDataKey');
	}

	ngOnInit() {
		this.reqData = {}
		this.ObjectArray = []
		this.smsobj = {}
		this.emailobj = {}
		this.voiceobj = {}
		this.allDataobj = []
		this.allDataobj.push(this.notificationcatntype);
		this.getnotificationtiming();
		if(!this.numberstep){
			this.numberstep = 1
		}
		
		this.reqData.eventafterbeforesms = ""
		this.reqData.dayandweeks = '0'
		this.reqData.eventdaysms = "0"
		this.reqData.messagesms = ""
		this.reqData.eventafterbeforeemail = ""
		this.reqData.eventdayemail = "0"
		this.reqData.messageemail = ""
		this.reqData.eventafterbeforevoice = ""
		this.reqData.eventdayvoice = "0"
		this.reqData.eventafterbeforewhatsapp = ""
		this.reqData.eventdaywhatsapp = "0"
		this.reqData.messagevoice = ""
		this.reqData.language = 'English'
		this.reqData.notificationtime= "10:00"
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Notification Action - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Notification Action - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Notification Action - The Cloud Health')
		}
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
				this.reqData.notificationtime = "19:00"
			}
			console.log(this.reqData.notificationtime)
			this.showLoader = false
		},err=>{
			console.log(err)
		}) 

	}



	smsAction(){

		if(this.reqData.eventafterbeforesms == '' || this.reqData.eventafterbeforesms == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.eventdaysms == '' || this.reqData.eventdaysms == null)
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		if(this.reqData.messagesms == '' || this.reqData.messagesms == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		else{
			var SMS  = {


				NFA_Unique_ID :"",

				NFA_Action_Type:"SMS",
				NFA_Timing:this.reqData.notificationtime,
				NFA_Action_Title:"SMS "   +' ' + $('#trigger option:selected').text()   + ' ' +  this.reqData.eventdaysms   + ' ' +  $('#daysweek option:selected').text(),
				NFA_Action_Icon : "['fas', 'envelope-open']",
				NFA_Be_Af:this.reqData.eventafterbeforesms,
				NFA_Days:this.reqData.eventdaysms,
				NFA_DayOrWeek:this.reqData.dayandweeks,
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

			this.ObjectArray.push(SMS);
			this.addnotificatinsactions();
			localStorage.setItem("this.ObjectArray",JSON.stringify(this.notificatinAcrion));
			this.toster.success('Summited Succsesfully', 'success')  
			this.goBack();
			
		}


	}



	whatsappAction(){

		if(this.reqData.eventafterbeforewhatsapp == '' || this.reqData.eventafterbeforewhatsapp == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.eventdaywhatsapp == '' || this.reqData.eventdaywhatsapp == null)
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		if(this.reqData.eventdaywhatsapp == '' || this.reqData.eventdaywhatsapp == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		else{
			var Whatsapp  = {


				NFA_Unique_ID :"",

				NFA_Action_Type:"Whatsapp",
				NFA_Timing:this.reqData.notificationtime,
				NFA_Action_Title:"Whatsapp "   +' ' + $('#trigger option:selected').text()   + ' ' +  this.reqData.eventdaywhatsapp   + ' ' +  $('#daysweek option:selected').text(),
				NFA_Action_Icon : "['fas', 'whatsapp']",
				NFA_Be_Af:this.reqData.eventafterbeforewhatsapp,
				NFA_Days:this.reqData.eventdaywhatsapp,
				NFA_DayOrWeek:this.reqData.dayandweeks,

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

			this.ObjectArray.push(Whatsapp);
			this.addnotificatinsactions();

			localStorage.setItem("this.ObjectArray",JSON.stringify(this.notificatinAcrion));
			this.toster.success('Summited Succsesfully', 'success')  
			this.goBack();
		}


	}




	emailAction(){
		if(this.reqData.eventafterbeforeemail == '' || this.reqData.eventafterbeforeemail == null )
		{  

			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.eventdayemail == '' || this.reqData.eventdayemail == null)
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		if(this.reqData.messageemail == '' || this.reqData.messageemail == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		else{
			var Email  = {

				NFA_Unique_ID :"",
				NFA_Action_Type:"Email",
				NFA_Timing:this.reqData.notificationtime,
				NFA_Be_Af:this.reqData.eventafterbeforeemail,
				NFA_Action_Title:"Email"   +  ' ' + $('#trigger option:selected').text()  + ' ' +   this.reqData.eventdayemail   + ' ' +    $('#daysweek option:selected').text(),
				NFA_Action_Icon : "['fas', 'email']",
				NFA_Days:this.reqData.eventdayemail,
				NFA_DayOrWeek:this.reqData.dayandweeks,
				NFA_Action_Subject:this.reqData.emailsubject,
				NFA_Message:this.reqData.messageemail,
				NFA_Created_By:this.admin.UM_Unique_ID,
				NFA_User_Name:this.admin.User_Name,
				NFA_Create_Date:new Date(),
				NFA_Modify_Date:new Date(),
				NFA_Is_Active:true,
				NFA_Is_Deleted:false,
				NFA_TimeZone:this.admin.UM_TimeZone,
				NFA_Status:"Pending"

			}
			this.ObjectArray.push(Email);
			this.addnotificatinsactions();
			localStorage.setItem("this.ObjectArray",JSON.stringify(this.notificatinAcrion));

			this.toster.success('Summited Succsesfully', 'success')  
			this.goBack();
			
		}
	}

	voiceAction(){  

		if(this.reqData.eventafterbeforevoice == '' || this.reqData.eventafterbeforevoice == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.eventdayvoice == '' || this.reqData.eventdayvoice == null)
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}
		if(this.reqData.messagevoice == '' || this.reqData.messagevoice == null )
		{
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}


		else{
			var Voice  = {	 

				NFA_Unique_ID :"",
				NFA_Action_Type:"Voice",
				NFA_Be_Af:this.reqData.eventafterbeforevoice,
				NFA_DayOrWeek:this.reqData.dayandweeks,
				NFA_Timing:this.reqData.notificationtime,

				NFA_Action_Title:"Voice " + ' ' + $('#trigger option:selected').text()  + ' ' +  this.reqData.eventdayvoice  + ' ' + $('#daysweek option:selected').text(),
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
			this.ObjectArray.push(Voice);
			localStorage.setItem("this.ObjectArray",JSON.stringify(this.notificatinAcrion));

			this.toster.success('Summited Succsesfully', 'success')  
			this.addnotificatinsactions();
			this.goBack();
			
		}
	}




	smsblock(){
		$("#smsblock").modal("show");

	}


	sendoverview(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning('length should be greater then six digit', 'Warning') 
		}
		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined)
		{

			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.messagesms == '' || this.reqData.messagesms == null || this.reqData.messagesms == undefined)
		{
			this.toster.warning('Please Fill  the message Field ', 'Warning') 
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
		this.toster.success('Massage Send Succsesfully', 'success') 
	}
	voiceblock()
	{
		$("#voiceblock").modal("show");

	}

	sendvoicemassage(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning('length should be greater then six digit', 'Warning') 
		}
		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined)
		{

			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.messagevoice == '' || this.reqData.messagevoice == null || this.reqData.messagevoice == undefined)
		{
			this.toster.warning('Please Fill  the message Field ', 'Warning') 
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
		this.toster.success('Voice Massage Send Succsesfully', 'success') 

	}






	whatsapp()
	{  $("#whatsapp").modal("show");   }

	sendwhatsappmassage(){

		if (($("#mycontact").val().length) < 6) {
			return this.toster.warning('length should be greater then six digit', 'Warning') 
		}

		if(this.reqData.mycontact == '' || this.reqData.mycontact == null || this.reqData.mycontact == undefined )
		{
			if (($("#mycontact").val().length) < 6) {
				return this.toster.warning('length should be greater then six', 'Warning') 
			}
			this.toster.warning('Please Fill all the Field ', 'Warning') 
			return 

		}

		if(this.reqData.messagewhatsapp == '' || this.reqData.messagewhatsapp == null || this.reqData.messagewhatsapp == undefined)
		{
			this.toster.warning('Please Fill  the message Field ', 'Warning') 
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
		this.toster.success('Whatsapp Massage Send Succsesfully', 'success') 

	}




	emailblock(){
		$("#emailblock").modal("show");

	}


	sendemail(){

		if (this.emailcheak == false) 
		{
			this.toster.warning('Invalid Email Address', 'Warning');
			return false;
		}

		if(this.reqData.emailaddress == '' || this.reqData.emailaddress == null || this.reqData.emailaddress == undefined)
		{   
			this.toster.warning(this.translate.instant('Please fill Email'), this.translate.instant('Warning')) 
			return 

		}


		if(this.reqData.emailsubject == '' || this.reqData.emailsubject == null || this.reqData.emailsubject == undefined)
		{
			this.toster.warning('Please Fill Subject ', 'Warning') 
			return 

		}
		if(this.reqData.messageemail == '' || this.reqData.messageemail == null || this.reqData.messageemail == undefined )
		{
			this.toster.warning('Please Fill the message Field ', 'Warning') 
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
		this.toster.success('Email Send Succsesfully', 'success') 

	}



	addnotificatinsactions(){

		var Noti = {   

			PIT_Unique_ID: this.GetNotificationid,           
			PIT_Actions: this.ObjectArray,                       
			PIT_Modify_Date :new Date(),
			PIT_Is_Active: true,
			PIT_Is_Deleted: false,
			PIT_TimeZone:this.admin.UM_TimeZone,
			Slug :'',  

		}

		this.showLoader = true
		this.UserService.PatientIntakeActionCreate(Noti).subscribe((data1)=>{
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
			this.toster.warning('Invalid Email Address');
			return false;
		}

		return  this.emailcheak = true;

	}


}