import { Component, OnInit, ViewChild, HostListener, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../environments/environment.prod';
// import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { ActivatedRoute } from '@angular/router';
// import * as ObjFormData from '../../assets/TCHStyles/fbuilder';


@Component({
	selector: 'app-view-patient-forms',
	templateUrl: './view-patient-forms.component.html',
	styleUrls: ['./view-patient-forms.component.css']
})
export class ViewPatientFormsComponent implements OnInit {
	admin
	setAccToSurgery
	bookingUniqueId
	mySlug
	imageLink
	getFormId
	getFormData
	showLoader
	getFormDataFinal
	getImageValueShow
	myLogo
	timezone
	getFormObject
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		// this.getQueryStringID = route.snapshot.params.id;
		this.bookingUniqueId = route.snapshot.params.id;
		this.getFormId = route.snapshot.params.formId;
		// console.log(this.bookingUniqueId)
		// console.log(this.getFormId)
		this.imageLink = environment1.image
	}

	ngOnInit() {
		// ObjFormData.ShowFormDataS();
		//myclsclikc
		this.getFormObject = {}

		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))

		this.getDataofBooking()

	}
	getDataofBooking(){
		this.showLoader = true
		var obj = {
			Slug: this.mySlug,
			PB_Unique_ID: this.bookingUniqueId
		} 
		var getFormData
		this.UserService.getBookingViaId(obj).subscribe((data)=>{
			// console.log(data)
			this.timezone=data.Data.PB_TimeZone;
			if(data.Data.PB_Forms){
				for (var i = 0; i < data.Data.PB_Forms.length; i++) {
					if(data.Data.PB_Forms[i].PF_Form_ID == this.getFormId ){
						getFormData = data.Data.PB_Forms[i]
					}
				}
			}
			// console.log(getFormData)
			var obj1 = {
				Slug: this.mySlug,
				Form_Unique_ID: getFormData.PF_Form_ID
			}
			this.UserService.getFormViaId(obj1).subscribe((data1)=>{
				console.log(data1)
				this.getFormObject = data1.Data
				this.getFormDataFinal = data1.Data.Form_Data;
				this.getImageValueShow =  data1.Data.Form_Signature;
				// console.log(this.getImageValueShow)
				this.myLogo = data1.Data.Form_Logo
				if(this.getFormDataFinal){
					setTimeout(function(){
						$("#myclsclikc").trigger("click");
					}, 1000);

				}
				this.showLoader = false

			},err=>{
				console.log(err)
			})
		},err=>{
			console.log(err)
		})
	}
	removeTildSign(data){
		if(data){
			var getnew = data.replace("~", "");
		}
		return (getnew)
	}
	saveFormData(){
		this.GetPatienMedicalFormData();
	}
	GetPatienMedicalFormData(){
		// var ElementID;
		// var ElementValue;
		var controlandvalue=[];
		// var ElementObj:any = {};
		$.each($("#FormB").find(':input'),function(index){
			// debugger;
			var innerchild1=$("#" + this.id);
			switch(this.type) {
				case "text":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "number":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "textinput":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "date":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "file":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#h" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "select-multiple":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=($("#" + this.id).val()).toString();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "select-one":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=this.selectedOptions[0].value;
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "textarea":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=$("#" + this.id).val();
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "checkbox":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=this.checked;
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;
				case "radio":
				var ElementObj:any={};
				ElementObj.Element_ID = this.id;
				ElementObj.Element_Value=this.checked;
				controlandvalue.push(ElementObj);
				console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
				break;

				default:
			}
		});

		$.each($("#FormB").find("canvas"),function(index){
			// debugger;
			var ElementObj:any={};
			ElementObj.Element_ID = this.id;
			var image = new Image();
			image.src = this.toDataURL("image/png");
			ElementObj.Element_Value = image.src;
			controlandvalue.push(ElementObj);
			console.log("Element ID : " + ElementObj.Element_ID + ", Element Value : " + ElementObj.Element_Value);
		});

		//var Formvalue:any
		var Formvalue = {
			Slug: this.mySlug,
			PFD_Booking_ID: this.bookingUniqueId,
			PFD_Form_ID:this.getFormId,
			PFD_Elements:controlandvalue,
			PFD_TimeZone:this.timezone,
			PFD_Create_Date:new Date(),
			PFD_Modify_Date:new Date()
		}
		console.log(Formvalue)
		this.UserService.FormDataFilledByPatient(Formvalue).subscribe((data)=>{
			this.toster.success('Data saved successfully', 'Success')
			console.log(data);
			this.router.navigateByUrl('/login')
		},err=>{
			console.log(err)
		});									    
	}


}


