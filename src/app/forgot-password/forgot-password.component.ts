import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
declare var $:any
@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	email
	showLoader
	siteLink
	checkEmailAddress
	mySlug
	getResetEmail
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute) { 
		this.title.setTitle('Forgot Password')
		this.siteLink = environment1.siteLink
	}

	ngOnInit() {
		this.email = ''
		var sys1 = {
			Slug: this.mySlug,
			SET_Name:'Reset/Forgot Password'
		}
		this.UserService.seletEmailViaName(sys1).subscribe((data)=>{
			console.log(data)
			this.getResetEmail = data.Data
		},err=>{
			console.log(err)
		})
	}
	goBack(){
		this.location.back()
	}
	submit(){
		if(this.email =='' || this.email == undefined || this.email == null){
			this.toster.warning('Enter a valid email', 'Warning')
			return
		}else{

			this.UserService.checkEmail({UM_Email:this.email}).subscribe((data)=>{
				console.log(data)
				this.showLoader = true
				if(data.Result == false){
					this.checkEmailAddress = false
					this.sendEmail()
					// this.toster.error('Email Address already exist', 'Error')
				}else{
					this.checkEmailAddress = true
					this.toster.error('Please check your email', 'Error')
					this.showLoader = false
				}

			},err=>{
				console.log(err)
			})
		}
	}
	sendEmail(){
		var mm:string = "<a href="+this.siteLink+"/reset-password/"+this.email+">"+this.siteLink+"/reset-password/"+this.email+"</a>" 
		this.getResetEmail.SET_Message = this.getResetEmail.SET_Message.replace("passlink", mm);
		this.getResetEmail.SET_Message = this.getResetEmail.SET_Message.replace("FirstName", this.email);
		var tomail = []
		tomail.push(this.email)
		var Email:any= {};
		Email.to_email=tomail;
		Email.To_Name=this.email
		Email.Bcc_Email=this.getResetEmail.SET_Bcc,
		Email.Cc_Email=this.getResetEmail.SET_CC,
		Email.Subject=this.getResetEmail.SET_Name;
		Email.From_Email = this.getResetEmail.SET_From_Email;
		Email.From_Name = this.getResetEmail.SET_From_Name
		Email.PlainTextContent = "";
		Email.HtmlContent = '<img src='+environment1.image+this.getResetEmail.SET_Header+' height="47.58px" width="115px" alt="logo">' + "<br><br><br>" + this.getResetEmail.SET_Message + "<br><br><br>" + this.getResetEmail.SET_Footer
		console.log(Email)

		

		this.UserService.sendemail(Email).subscribe((data2)=>{
			console.log(data2)
			this.toster.success('Please check your email to reset your password', 'Success')
			this.showLoader = false
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
	}

}
