import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	admin
	getListData
	getCountObject
	setAccToSurgery
	showLoader
	mySlug
	getcompUniqueId
	getcompPatUniqueId
	getPerDetails
	userPermission:any
	patName:string = 'Patient Name'
	getAdminCount
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private route: ActivatedRoute, private translate: TranslateService) { 
		 // translate.setDefaultLang('en');
		this.getPerDetails = []

		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'PA'){
			this.router.navigateByUrl('/patient-dashboard')
		}
		this.getUserPermissions()
		
		
	}
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	ngOnInit() {	
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.getAdminCount = {}
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Dashboard - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Dashboard - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Dashboard - The Cloud Health')
		}
		this.getCountObject = {}
		
		if(this.router.url == '/physician'){
			$('a').removeClass('active');
		}
		
		// this.getId()

		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		if(this.admin.UM_Office_Type == 'P' || this.admin.UM_Office_Type == 'S'){
			this.getBookingCounts()
		}else if(this.admin.UM_Office_Type == 'A'){
			this.countForAdmin()
		}
		this.getPatientlistfORPhy('Total')
		



	}
	countForAdmin(){
		this.UserService.getCountForAdmin(this.admin.Slug).subscribe((data2)=>{
			console.log(data2)
			this.getAdminCount = data2
		},err=>{
			console.log(err)
		})
	}
	getUserPermissions(){
		var mainId
		if(this.admin.UM_Member_ID){
			mainId = this.admin.UM_Member_ID
		}else{
			mainId = this.admin.UM_Unique_ID
		}
		var myObj ={
			Slug: this.admin.Slug,
			User_ID: mainId
		}
		this.UserService.getAllPermissionOfUser(myObj).subscribe((data2)=>{
			console.log(data2)
			this.userPermission = data2.DataList
			this.getPerDetails = this.userPermission.filter(o => o.Page_Name.includes('appointment-list'));
			

		},err=>{
			console.log(err)
		})
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


	getBookingCounts(){
		this.UserService.getBookingCounts(this.admin.UM_Surgary_Physician_CenterID, this.admin.UM_Office_Type, this.mySlug).subscribe((data)=>{
			console.log(data)
			this.getCountObject = data
		},err=>{
			console.log(err)
		})
	}
	//getBookingCounts
	actionRequiredFortheCenter(){
		var obj = {
			PB_Unique_ID:''
		}
		this.UserService.UpdateBookingStatus(obj).subscribe((data)=>{
			console.log(data)
			this.getCountObject = data
		},err=>{
			console.log(err)
		})
	}
	togglebtn(){

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



