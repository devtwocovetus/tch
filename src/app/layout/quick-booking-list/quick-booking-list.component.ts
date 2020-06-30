import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
declare var $:any
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-quick-booking-list',
  templateUrl: './quick-booking-list.component.html',
  styleUrls: ['./quick-booking-list.component.css']
})
export class QuickBookingListComponent implements OnInit {

  admin
  gettotalappointment
	
	showLoader
	setAccToSurgery
	mySlug
	isDelete
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private translate: TranslateService,) { 
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
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
				this.title.setTitle('Quick Booking List - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Quick Booking List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Quick Booking List - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
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
		
			// obj.PB_Status ='QB',
		    obj.Slug =this.mySlug,


		
		this.showLoader = true
		this.UserService.GetQuickBookingList(obj).subscribe((data)=>{
			console.log(data)
			this.gettotalappointment = data.DataList
			for (var i = 0; i < data.DataList.length; i++) {
				if(data.DataList[i].PB_Status == 'Approved' || data.DataList[i].PB_Status == 'Action Required' ||
						data.DataList[i].PB_Status == 'Complete'){
						this.gettotalappointment[i].checkData = false
				}else{
					this.gettotalappointment[i].checkData = true
				}
			}
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