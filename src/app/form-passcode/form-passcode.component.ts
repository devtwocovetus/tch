import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {environment1} from '../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-form-passcode',
  templateUrl: './form-passcode.component.html',
  styleUrls: ['./form-passcode.component.css']
})
export class FormPasscodeComponent implements OnInit {

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

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
		this.getpatientid = route.snapshot.params.id

	}

	ngOnInit() {

		this.reqData = {}


		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle(' Appointment Passcode - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle(' Appointment Passcode - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle(' Appointment Passcode - The Cloud Health')
		}
		

	}

	finalAction(){

		if(this.reqData.passcode == '' || this.reqData.passcode == undefined || this.reqData.passcode == null){
			this.toster.warning('Please  update your passcode ', 'Warning')  
			return
		}
		console.log(this.reqData);



		var VarifyPasscode = {   
			UM_Passcode:this.reqData.passcode.trim(),
			UM_Unique_ID:this.getpatientid
		}
		console.log(VarifyPasscode)

		this.UserService.VarifyPasscode(VarifyPasscode).subscribe((UserVerifyResponse)=>{
			console.log(UserVerifyResponse)
			if(UserVerifyResponse.Message=="OK"){
				this.router.navigate(['/reset-password/'+ this.getpatientid])
				this.toster.success('Passcode varified successefully ', 'Success')  
			}else{
				this.toster.warning('Invalid passcode', 'Warning')  
			}					        								        
			this.showLoader = false
		},err=>{
			console.log(err)
		})




	}




}
