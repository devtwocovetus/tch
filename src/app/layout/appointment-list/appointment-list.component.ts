import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnDestroy, OnInit {
	admin
	getListData
	showLoader
	setAccToSurgery
	mySlug
	getcompUniqueId
	getPerDetails
	getcompPatUniqueId
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private sanitizer: DomSanitizer, private translate: TranslateService,) { 
		// dtOptions: DataTables.Settings = {};
		// dtTrigger: Subject = new Subject();
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
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Appointment List - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Appointment List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Appointment List - The Cloud Health')
		}
		this.getListData = []

		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getPatientlistfORPhy('Total')
	}
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
	getPatientlistfORPhy(status){
		$('#new-dash').DataTable().destroy();
		this.getListData  = []
		this.showLoader = true
		this.UserService.statusFilter(this.admin.UM_Surgary_Physician_CenterID, this.admin.UM_Office_Type, status, this.mySlug).subscribe((data)=>{
			console.log(data)
			this.getListData = data.DataList
			if(this.getListData){
				for (var i = 0; i < data.DataList.length; i++) {
					if(data.DataList[i].PB_Surgical_Procedure_Information){
						if(new Date(new Date(data.DataList[i].PB_Surgical_Procedure_Information.SPI_Date).setHours(0,0,0,0)) < new Date(new Date().setHours(0,0,0,0))){
							this.getListData[i].expire =  'red'
						}
						if(new Date(new Date(data.DataList[i].PB_Surgical_Procedure_Information.SPI_Date).setHours(0,0,0,0)) < new Date(new Date().setHours(0,0,0,0)) && data.DataList[i].PB_Status == 'Approved'){
							this.getListData[i].markAsComplete = true
						}
					}
					if(data.DataList[i].PB_Status == 'Approved' || data.DataList[i].PB_Status == 'Action Required' ||
						data.DataList[i].PB_Status == 'Complete'){
						this.getListData[i].checkData = false
				}else{
					this.getListData[i].checkData = true
				}
			}
		}
		this.dtTrigger.next();
		// $(document).ready(function() {
			// 	setTimeout(function(){
				// 		$('#app_list_now_a').DataTable();
				// 	}, 500);
				// } );
				this.showLoader = false
			},err=>{
				console.log(err)
			})
	}
	getCompId(data){
		this.getcompUniqueId = data.PB_Unique_ID
		this.getcompPatUniqueId = data.PB_Patient_ID
	}
	updateStatus(stats){
		var onbj = {
			PB_TimeZone: this.admin.UM_TimeZone,
			Slug:this.mySlug,
			PB_Unique_ID: this.getcompUniqueId,
			PB_Modify_Date: new Date(),
			PB_Patient_ID:this.getcompPatUniqueId,
			PB_Created_By: this.admin.UM_Unique_ID,
			PB_User_Name: this.admin.UM_Username,

		}
		this.UserService.MarkAsCompleteBooking(onbj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
			$("#myModal").modal("hide");
			$('body').removeClass('home modal-open');
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
	formateDate(date) {
		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;

		return day + '/' + month + '/' + year;
	}



}

//getListAppointments