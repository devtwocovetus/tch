import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { isArray } from 'util';
import { __values } from 'tslib';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

	cdropdownList = [];
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
	emailcheak = false;
	getpatientid

	showLoader: boolean;
	isEmailIsTrue:boolean = false
	isNotiPass:boolean
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.router.events
		.filter(e => e instanceof RoutesRecognized)
		.pairwise()
		.subscribe((event: any[]) => {
			console.log(event[0].urlAfterRedirects);
			if(event[0].urlAfterRedirects.includes("notification-passcode")){
				this.isNotiPass = true
			}
			console.log(this.isNotiPass)
		});
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
		this.getpatientid = route.snapshot.params.id
		console.log(this.getpatientid)
		this.validateEmail(this.getpatientid)

	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		console.log(re.test(String(email).toLowerCase()))
		this.isEmailIsTrue = re.test(String(email).toLowerCase())
		return re.test(String(email).toLowerCase());
	}

	ngOnInit() {


		this.reqData = {}


		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle(' Reset Password  - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle(' Reset Password  - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle(' Reset Password  - The Cloud Health')
		}


	}

	finalAction(){

		if(this.reqData.newpassword == '' || this.reqData.newpassword == undefined || this.reqData.newpassword == null){
			this.toster.warning('Please  fill new password ', 'Warning')  
			return
		}
		if(this.reqData.confirmpassword == '' || this.reqData.confirmpassword == undefined || this.reqData.confirmpassword == null){
			this.toster.warning('Please  fill confirm password ', 'Warning')  
			return
		}
		if(this.reqData.confirmpassword !=  this.reqData.newpassword ){
			this.toster.warning('Password and confirm password are not same ', 'Warning')  
			return
		}
		if(this.isEmailIsTrue){
			this.resetViaEmail()
		}else{
			this.resetviaID()
		}



	}
	resetviaID(){
		console.log(this.reqData);
		var ResetPassword = {   

			UM_Password:this.reqData.newpassword,
			UM_Unique_ID:this.getpatientid
		}
		console.log(ResetPassword)

		this.showLoader = true
		this.UserService.ResetPassword(ResetPassword).subscribe((data1)=>{
			console.log('VarifyPasscode Response :' +  JSON.stringify(data1))
			this.toster.success('Thank You, Your Account is created ', 'success')  
			this.showLoader = false
		},err=>{
			console.log(err)
		})
		this.router.navigate(['/login'])
	}
	resetViaEmail(){

		this.showLoader = true
		var ResetPassword = {   

			UM_Password:this.reqData.newpassword,
			UM_Email:this.getpatientid
		}
		this.UserService.ResetPasswordViaEmail(ResetPassword).subscribe((data)=>{
			console.log(data)
			this.toster.success('Password updated successfully ', 'success') 
			this.showLoader = false
			this.router.navigate(['/login'])
		},err=>{
			console.log(err)
		})

	}




}
