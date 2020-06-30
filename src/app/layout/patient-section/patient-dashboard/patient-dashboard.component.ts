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
	selector: 'app-patient-dashboard',
	templateUrl: './patient-dashboard.component.html',
	styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
	admin
	getListData
	mySlug
	setAccToSurgery
	VCgetListData
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService) { }

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.dtOptions1 = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))

		console.log(this.admin)
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getListData = []
		this.VCgetListData = []
		
		this.getList()
		this.getPatientlist()
	}
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
		this.dtTrigger1.unsubscribe();

	}
	getList(){
		var obj = {
			Slug: this.mySlug,
			PB_Booking_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID,
			PB_Patient_ID : this.admin.UM_Member_ID 
		}
		this.UserService.GetPatientBookingList(obj).subscribe((data)=>{
			console.log(data)
			this.getListData = data.DataList
			// setTimeout(function(){
				// 	$('#pastdshbrd').DataTable();
				// }, 100);
				this.dtTrigger.next();

			},err=>{
				console.log(err)
			})
	}
	logOut(){
		localStorage.removeItem ('isLoggedin');
		localStorage.removeItem('loginData');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('patientLogin')
		this.router.navigate(['/'])
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
	getPatientlist(){
		var obj = {
			VCB_Patient_ID:this.admin.UM_Member_ID,
			Slug:this.mySlug,
		}
		this.UserService.vClistForPatient(obj).subscribe((data)=>{
			console.log(data)
			this.VCgetListData = data.DataList
			var thisss = this
			setTimeout(function(){
				thisss.dtTrigger1.next();
				
				}, 1000);

		},err=>{
			console.log(err)
		})
		

	}

}
