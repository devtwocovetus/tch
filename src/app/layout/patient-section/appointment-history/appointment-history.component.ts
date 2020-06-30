import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import {environment1} from '../../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

declare var $:any

@Component({
	selector: 'app-appointment-history',
	templateUrl: './appointment-history.component.html',
	styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

	admin
	gettotalappointment
	
	showLoader
	setAccToSurgery
	mySlug
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService) { 
	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.gettotalbookinglist();
		this.gettotalappointment =[]


		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Appointment History - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Appointment History - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Appointment History - The Cloud Health')
		}

	}
	ngOnDestroy(): void {
	// Do not forget to unsubscribe the event
	this.dtTrigger.unsubscribe();
}


	gettotalbookinglist(){

		var obj:any = {}

		if(this.admin.UM_Office_Type == 'P'){
			obj.PB_Booking_Physician_Office_ID = this.admin.UM_Surgary_Physician_CenterID
		}else if(this.admin.UM_Office_Type == 'S'){
			obj.PB_Booking_Surgery_Center_ID = this.admin.UM_Surgary_Physician_CenterID
		}
		
		obj.PB_Status ='',
		obj.Slug =this.mySlug,

		
		this.showLoader = true
		this.UserService.GetCompletedBookingList(obj).subscribe((data)=>{
			console.log(data)
			this.gettotalappointment = data.DataList
			console.log(this.gettotalappointment)
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#app_list_now_a').DataTable();
			// 	}, 200);
			// } );
			this.dtTrigger.next();

			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}






	tConvert (time) {
		// Check correct time format and split into components
		time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) { // If time format correct
			time = time.slice (1);  // Remove full string match value
			time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join (''); // return adjusted time or original string
	}


}
