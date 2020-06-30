import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';

import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	admin
	setAccToSurgery
	mySlug
	reqData
	showLoader
	siteLink
	getPerDetails
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService, private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.siteLink = environment1.siteLink
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
	}

	ngOnInit(): void {
		this.reqData = {}
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Add Patient - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Add Patient - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Add Patient - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
	}
	SaveData(){
		if(this.reqData.oldpass == '' || this.reqData.oldpass == null || this.reqData.oldpass == undefined){
			this.toster.warning(this.translate.instant('Old Password can not be empty'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.UM_Password == '' || this.reqData.UM_Password == null || this.reqData.UM_Password == undefined){
			this.toster.warning(this.translate.instant('Password can not be empty'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.confirmpass == '' || this.reqData.confirmpass == null || this.reqData.confirmpass == undefined){
			this.toster.warning(this.translate.instant('Confirm Password can not be empty'), this.translate.instant('Warning'))
			return
		}
		this.showLoader = true
		console.log(this.reqData)
		var ovj = {
			UM_Unique_ID: this.admin.UM_Unique_ID,
			UM_Password: this.reqData.oldpass

		}
		console.log(ovj)
		this.UserService.CheckOldPassword(ovj).subscribe((data)=>{
			console.log(data)
			this.showLoader = false
			if(data.Result){
				this.finalSave()
			}else{
				this.toster.error('Invalid old password', 'Error')
			}
		},err=>{
			console.log(err)
		})
	}
	finalSave(){
		if(this.reqData.UM_Password != this.reqData.confirmpass){
			this.toster.warning(this.translate.instant('Password not matched'), this.translate.instant('Warning'))
			return
		}
		this.showLoader = true
		var obj ={
			UM_Password: this.reqData.UM_Password,
			UM_Unique_ID:this.admin.UM_Unique_ID,

		}
		this.UserService.PatientResetPassword(obj).subscribe((data)=>{
			console.log(data)
			this.toster.success(this.translate.instant('Password successfully updated'), this.translate.instant('Success'))
			this.showLoader = false
			this.onLoggedout()
			// this.router.navigateByUrl('/patient-dashboard')
		},err=>{
			console.log(err)
		})
	}
	goBack(){
		this.location.back()
	}
	onLoggedout() {
		localStorage.removeItem ('isLoggedin');
		localStorage.removeItem('loginData');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('setAccToSurgery');

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

}
