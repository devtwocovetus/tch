import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import {environment1} from '../../../../environments/environment.prod';

import { ActivatedRoute } from '@angular/router';
declare var $:any

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	reqData
	admin
	constructor(private UserService:UserService,  private location: Location, private title: Title, private translate: TranslateService,  private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute) { }

	ngOnInit() {
		this.reqData = {}
		this.admin = JSON.parse(localStorage.getItem('loginData'))
	}


	SaveData(){
		if(this.reqData.oldpass == '' || this.reqData.oldpass == null || this.reqData.oldpass == undefined){
			this.toster.warning(this.translate.instant('Old Password can not be empty'), this.translate.instant('Warning'))
		}
		console.log(this.reqData)
		var ovj = {
			UM_Unique_ID: this.admin.UM_Unique_ID,
			UM_Password: this.reqData.oldpass

		}
		console.log(ovj)
		this.UserService.CheckOldPassword(ovj).subscribe((data)=>{
			console.log(data)
			if(data.Result){
				this.finalSave()
			}else{
				this.toster.error(this.translate.instant('Invalid password'), this.translate.instant('Error'))
			}

			// this.patientUniqueId = data.Data.Patient_Unique_ID
			// this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
			// this.router.navigateByUrl('/patients/dashboard')
		},err=>{
			console.log(err)
		})
	}
	finalSave(){
		if(this.reqData.UM_Password == '' || this.reqData.UM_Password == null || this.reqData.UM_Password == undefined){
			this.toster.warning(this.translate.instant('Password can not be empty'), this.translate.instant('Warning'))
		}
		if(this.reqData.confirmpass == '' || this.reqData.confirmpass == null || this.reqData.confirmpass == undefined){
			this.toster.warning(this.translate.instant('Confirm Password can not be empty'), this.translate.instant('Warning'))
		}
		if(this.reqData.UM_Password != this.reqData.confirmpass){
			this.toster.warning(this.translate.instant('Password not matched'), this.translate.instant('Warning'))
		}
		var obj ={
			UM_Password: this.reqData.UM_Password,
			UM_Unique_ID:this.admin.UM_Unique_ID,

		}
		this.UserService.PatientResetPassword(obj).subscribe((data)=>{
			console.log(data)
			this.toster.success(this.translate.instant('Password successfully updated'), this.translate.instant('Success'))
			this.router.navigateByUrl('/patient-dashboard')
		},err=>{
			console.log(err)
		})
	}


}
