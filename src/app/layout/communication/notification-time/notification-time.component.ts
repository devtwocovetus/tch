import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
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
import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { isArray } from 'util';
import { __values } from 'tslib';

@Component({
  selector: 'app-notification-time',
  templateUrl: './notification-time.component.html',
  styleUrls: ['./notification-time.component.css']
})
export class NotificationTimeComponent implements OnInit {
dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	GetNotiCategoryListArray
	reqData
	
	mySlug


	showLoader: boolean;
	

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
		
	}

	ngOnInit() {

		
		this.reqData = {}
		this.reqData.notificationstime = "19:00"
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle(' Notification Time - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle(' Notification Time - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Notification Time - The Cloud Health')
		}
		
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		console.log(JSON.parse(localStorage.getItem("this.UserService.mynotification")))

		
	}





	finalAction(){

		if(this.reqData.notificationstime == '' || this.reqData.notificationstime == undefined || this.reqData.notificationstime == null){
			this.toster.warning('Select Notification Time', 'Warning')  
			return
		}

		var obj = {


			NTT_Time : 	this.reqData.notificationstime,
			NTT_Surgery_Physician_Center_ID :this.admin.UM_Surgary_Physician_CenterID,
		    NTT_Office_Type : this.admin.UM_Office_Type,
			NTT_Created_By : this.admin.UM_Unique_ID,
			NTT_User_Name : this.admin.UM_Username,
			NTT_Create_Date : new Date(),
			NTT_Modify_Date : new Date(),
			NTT_Is_Active : true,
			NTT_Is_Deleted : false,
			NTT_TimeZone : this.admin.UM_TimeZone,
			Slug:''

		}
		  console.log(obj);
		  // return

		this.showLoader = true
		//  console.log(obj)
		//  return
		this.UserService.CreateNotificationTime(obj).subscribe((notificationtimingresponse)=>{
			console.log('Response :' +  JSON.stringify(notificationtimingresponse))

			this.showLoader = false
		},err=>{
			console.log(err)
		})
		this.toster.success(this.translate.instant('Data added succsesfully'), this.translate.instant('Success'))
		 this.router.navigate(['/dashboard'])

	}



}
