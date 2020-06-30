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
	selector: 'app-add-intake-type',
	templateUrl: './add-intake-type.component.html',
	styleUrls: ['./add-intake-type.component.css']
})
export class AddIntakeTypeComponent implements OnInit {
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
	_id: any;

	showLoader: boolean;
	getEthinicityArray

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
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
		this.reqData.PIT_Category = ''
	}


	changeCat(e){

		var id = this.reqData.NC_Category

		var newobj = {
			PITT_Category_ID:id,
			Slug: this.mySlug
		}
		this.UserService.GetIntakeTypeListFilterWithCatID1(newobj).subscribe((data)=>{

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
		this.UserService.GetIntakeCategoryList(obj).subscribe((data)=>{
			this.GetNotiCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	finalAction(){

		
		if(this.reqData.PIT_Type == '' || this.reqData.PIT_Type == undefined || this.reqData.PIT_Type == null){
			this.toster.warning('Please Fill Category Type', 'Warning')  
			return
		}

		var obj = {



			PITT_Category_ID: this.reqData.PIT_Category,
			PITT_Category_Name : $('#categname  option:selected').text(),			
			PITT_Category_Type_Name:this.reqData.PIT_Type,
			PITT_Created_By: this.admin.UM_Unique_ID,
			PITT_User_Name : this.admin.UM_Username,
			PITT_Create_Date : new Date(),
			PITT_Modify_Date : new Date(),
			PITT_Is_Active: true,
			PITT_Is_Deleted: false,
			PITT_TimeZone: this.admin.UM_TimeZone,
			Slug:this.mySlug

		}
		console.log(this.reqData);

		this.showLoader = true
		this.UserService.GetIntakeCategoryCreate(obj).subscribe((data1)=>{
			console.log('Response :' +  JSON.stringify(data1))

			this.showLoader = false
		},err=>{
			console.log(err)
		})
		this.toster.success('Data added succsesfully', 'success')  ;
		this.router.navigate(['/intake'])



	}

}

