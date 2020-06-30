import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-form-editior',
	templateUrl: './form-editior.component.html',
	styleUrls: ['./form-editior.component.css']
})
export class FormEditiorComponent implements OnInit {
	getQueryStringID
	getTheFormName
	admin
	setAccToSurgery
	mySlug
	getImageValueShow
	getFormDataFinal
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private ref: ChangeDetectorRef, private translate: TranslateService,) { 
	}

	ngOnInit() {
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Form Builder - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Form Builder - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Form Builder - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getQueryStringID = this.route.snapshot.params.slug;
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();   
		});
		$( function() {
			$( "#sh-form-bulder" ).sortable({
				//   connectWith: ".connectedSortable"
			}).disableSelection();
		} );
		// localStorage.removeItem('getFormBuilder')
		this.getFormdata()

	}
	getFormdata(){	
		var obj  ={
			Slug: this.mySlug,
			Form_Unique_ID: this.getQueryStringID
		}
		this.UserService.getFormViaId(obj).subscribe((data)=>{
			console.log(data)
			this.getTheFormName = data.Data.Form_Name
			if(data.Data.Form_Data){
				this.getFormDataFinal = data.Data.Form_Data
			}else{
				this.getFormDataFinal = []
			}
			// /Form_Data
			if(data.Data.Form_Signature){
				this.getImageValueShow =  data.Data.Form_Signature
			}else{
				this.getImageValueShow = []
			}

			localStorage.setItem('setFormBuilder', JSON.stringify(data.Data.Form_Data))
			if(this.getTheFormName){
				console.log('im in Form_Name')
				setTimeout(function(){
					$("#myclsclikc").trigger("click");
					// alert('trigger')
				}, 1000);

			}
			this.ref.detectChanges()
		},err=>{
			console.log(err)
		})
	}	
	saveForm(){
		var address
		var footer
		var name
		var logoLink
		if(this.admin.UM_Office_Type == 'P'){
			if(this.setAccToSurgery.PhyO_Logo){
				logoLink = this.setAccToSurgery.PhyO_Logo.Logo_Navigation_Image
			}
			address = this.setAccToSurgery.PhyO_Address + ', ' + this.setAccToSurgery.PhyO_City  + ', ' + this.setAccToSurgery.PhyO_Country
			name = this.setAccToSurgery.PhyO_DBA_Name
			if(this.setAccToSurgery.PhyO_Footer){
				footer = this.setAccToSurgery.PhyO_Footer.Footer_Text
			}

		}else if(this.admin.UM_Office_Type == 'S'){
			if(this.setAccToSurgery.SurgC_Logo){
				logoLink = this.setAccToSurgery.SurgC_Logo.Logo_Navigation_Image
			}
			address = this.setAccToSurgery.SurgC_Address + ', ' + this.setAccToSurgery.SurgC_City  + ', ' + this.setAccToSurgery.SurgC_Country
			name = this.setAccToSurgery.SurgC_DBA_Name
			if(this.setAccToSurgery.SurgC_Footer){
				footer = this.setAccToSurgery.SurgC_Footer.Footer_Text
			}
		}
		console.log(localStorage.getItem('getFormBuilder'))
		var obj = {
			Form_Data: localStorage.getItem('getFormBuilder'),
			Form_Signature:localStorage.getItem('getSignature'),
			Form_Logo:logoLink,
			Form_SC_PO_Name: name,
			Form_Address: address,
			Form_Footer: footer,
			Form_Modify_Date: new Date(),
			Form_TimeZone:this.admin.UM_TimeZone ,
			Form_Unique_ID:this.getQueryStringID,
			Slug: this.mySlug,
		}
		console.log(obj)
		this.UserService.SaveFormBuilderData(obj).subscribe((data)=>{
			console.log(data)
			this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
			this.goBackLastLocation()
		},err=>{
			console.log(err)
		})
	}
	goBackLastLocation(){
		this.location.back()
	}

}
