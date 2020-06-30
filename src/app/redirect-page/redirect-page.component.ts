import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import {environment1} from '../../environments/environment.prod';

import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-redirect-page',
	templateUrl: './redirect-page.component.html',
	styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {
	admin
	getUniqueId
	showLoader
	getPasscode
	url
	mySlug
	getMyUniqueId
	siteLink
	constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getUniqueId = route.snapshot.params.id;
		console.log(this.getUniqueId)
		this.getMyUniqueId = route.snapshot.params.uniqueId
		console.log(this.router.url)
		this.siteLink= environment1.siteLink
		this.title.setTitle('Verify Passcode')
	}

	ngOnInit() {
		// this.showLoader = true
		console.log(this.router.url)
		this.url =this.siteLink+ this.router.url
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}

			// this.getLongUrl(url)
	}
	finalAction(){
		if(this.getPasscode == '' || this.getPasscode == undefined || this.getPasscode == null){
			this.toster.warning('Please  update your passcode ', 'Warning')  
			return
		}
		var VarifyPasscode = {   
			PFU_Passcode:this.getPasscode.trim(),
			PFU_Unique_ID:this.getMyUniqueId,
			Slug:this.mySlug
		}
		console.log(VarifyPasscode)

		this.UserService.PatiFormURLVerifyPasscode(VarifyPasscode).subscribe((UserVerifyResponse)=>{
			console.log(UserVerifyResponse)
			if(UserVerifyResponse.Message=="OK"){
				// this.router.navigate(['/reset-password/'+ this.getpatientid])
				this.getLongUrl(this.url)
				this.toster.success('Passcode varified successefully ', 'Success')  
			}else{
				this.toster.warning('Invalid passcode', 'Warning')  
			}					        								        
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	getLongUrl(data){
		var newooob = {
			PFU_Dummy_URL:data,
			
		}
		console.log('daata', newooob)
		this.UserService.GetLURL(newooob).subscribe((data1)=>{
			console.log(data1)
			this.showLoader = false
			window.location = data1.AURL
			// this.router.navigateByUrl('')
		},err=>{
			console.log(err)
		})
	}

}
//eDQ5ViaZ21863736c476ac