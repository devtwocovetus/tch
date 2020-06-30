import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute ,Params} from '@angular/router';
@Component({
  selector: 'app-assign-intake',
  templateUrl: './assign-intake.component.html',
  styleUrls: ['./assign-intake.component.css']
})
export class AssignIntakeComponent implements OnInit  {
	getbookingID
	dataListArray
	showLoader
	admin
	setAccToSurgery
	
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.dataListArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.getbookingID = this.route.snapshot.params.id
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Assign Notifications - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Assign Notifications - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle(' Assign Notifications  - The Cloud Health')
		}

		this.getnotification();
		 this.dataListArray  = []
		this.getbookingID = this.route.snapshot.params.id
	}
	getnotification(){
		var notiobj={
			Slug:'',			
			NFT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID
		}

		this.UserService.NotificationsGetNotiList(notiobj).subscribe((data)=>{
			this.dataListArray = data.DataList
			
			this.showLoader = false
		},err=>{
			console.log(err)
		})   


	}
	goBack(){
		this.location.back()
	}
	//Submit Assigned Notification
	Submit(){

     
		var favorite = [];
		$.each($("input[name='Notification']:checked"), function(){
			favorite.push($(this).val());
		});
		if(favorite.length <= 0){
			this.toster.warning('Please Select Checkbox ', 'Warning') 
			return 

		}

		var BookingObject={
			Slug:'',
			PB_Modify_Date:new Date(),
			PB_TimeZone:this.admin.UM_TimeZone,
			PB_Notifications_Array:favorite,
			PB_Unique_ID:this.getbookingID
		}

	
		console.log("Booking Object : " + BookingObject)
		this.UserService.AssignNotificationToBooking(BookingObject).subscribe(BookingResponse =>{
			console.log("Assign Notification on Booking :" + BookingResponse);
			this.toster.success('Notification Assigned Succsesfully', 'success')  
			this.ngOnInit()
			 // this.router.navigate(['/assign-notification-list'])
			 this.goBack();

		},err=>{
			console.log(err)
		})
	}

	//End of Submit Assigned Notification


}
