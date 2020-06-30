import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var $:any
@Component({
	selector: 'app-view-form-data',
	templateUrl: './view-form-data.component.html',
	styleUrls: ['./view-form-data.component.css']
})
export class ViewFormDataComponent implements OnInit {
	getFormDataFinal
	getImageValueShow
	admin
	setAccToSurgery
	mySlug
	formID
	BookingId
	savedFormID
	showLoader
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private translate: TranslateService,) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.BookingId = this.route.snapshot.params.bookId;
		this.formID =  this.route.snapshot.params.formId;

	}
	ngOnInit(): void {
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('View Form Data - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('View Form Data - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('View Form Data - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.formViaID()
		
	}
	formViaID(){
		this.showLoader = true
		var obj = {
			Slug:this.mySlug ,
			Form_Unique_ID:this.formID 
		}
		this.UserService.getFormViaId(obj).subscribe((data)=>{
			console.log(data)
			this.getFormDataFinal = data.Data.Form_Data;
			this.getImageValueShow =  data.Data.Form_Signature;
			localStorage.setItem('viewForm_Data', data.Data.Form_Data);
			localStorage.setItem('viewForm_Signature', data.Data.Form_Signature);
			// console.log(this.getImageValueShow)
			// this.myLogo = data.Data.Form_Logo
			var mythis  = this
			if(this.getFormDataFinal){
				setTimeout(function(){
					$("#myclsclikc").trigger("click");
					mythis.getFormData()
				}, 1000);
			}
			// setTimeout(function(){
				// $("#myclsclikc").trigger("click");
				mythis.getFormData()
			// }, 2500);
			this.showLoader = false
			// this.getFormData()
		},err=>{
			console.log(err)
		})
	}
	getFormData(){
		this.showLoader = true
		var obj  ={
			Slug:this.mySlug,
			PFD_Booking_ID:this.BookingId,
			PFD_Form_ID:this.formID,
		}
		this.UserService.GetFormData(obj).subscribe((data)=>{
			console.log(data)
			this.savedFormID = data.Data.PFD_Elements
			$('#Elements').val(data.Data.PFD_Elements)
			localStorage.setItem('submittedData', JSON.stringify(data.Data.PFD_Elements));
			setTimeout(function(){
				$("#datashybybhy").trigger("click");
			}, 500);
			this.showLoader = false
			
		},err=>{
			console.log(err)
		})
	}
}




