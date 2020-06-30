import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-add-notification-type',
	templateUrl: './add-notification-type.component.html',
	styleUrls: ['./add-notification-type.component.css']
})
export class AddNotificationTypeComponent implements OnInit {
	GetNotiCategoryListArray
	noti_typesList
	reqData
	
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	GetNotificationListArray

	GetNotificationid
	reqDatatosent  
	
	mySlug

	showLoader: boolean;
	getEthinicityArray

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
	}

	ngOnInit() {
		this.reqData = {}
		
		this.GetNotiCategoryListArray  =[]
		this.noti_typesList  =[]
		this.GetNotiCategoryList();
		this.reqData.NC_Category = ''
	}


	changeCat(e){

		var id = this.reqData.NC_Category

		var newobj = {
			NT_Category_ID:id,
			Slug: this.mySlug
		}
		this.UserService.GetNotiTypeListFilterWithCatID(newobj).subscribe((data)=>{

			this.noti_typesList = data.DataList

		},err=>{
			console.log(err)
		})

	}

	goBack(){
		this.location.back()
	}

	GetNotiCategoryList(){
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.GetNotiCategoryList(obj).subscribe((data)=>{
			this.GetNotiCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	finalAction(){

		
		if(this.reqData.NC_Type == '' || this.reqData.NC_Type == undefined || this.reqData.NC_Type == null){
			this.toster.warning(this.translate.instant('Please Fill Category Type'), this.translate.instant('Warning'))  
			return
		}

		var obj = {



			NT_Category_ID: this.reqData.NC_Category,
			NT_Category_Name : $('#categname  option:selected').text(),			
			NT_Category_Type_Name:this.reqData.NC_Type,
			NT_Created_By: this.admin.UM_Unique_ID,
			NT_User_Name : this.admin.UM_Username,
			NT_Create_Date : new Date(),
			NT_Modify_Date : new Date(),
			NT_Is_Active: true,
			NT_Is_Deleted: false,
			NT_TimeZone: this.admin.UM_TimeZone

		}
		console.log(this.reqData);

		this.showLoader = true
		this.UserService.GetNotiCategoryCreate(obj).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		})
		this.toster.success(this.translate.instant('Data added succsesfully'), this.translate.instant('Success'))
		this.router.navigate(['/notifications'])



	}

}

