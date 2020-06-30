import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

declare var $:any
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-vc-list',
	templateUrl: './vc-list.component.html',
	styleUrls: ['./vc-list.component.css']
})
export class VcListComponent implements OnInit{
	admin
	getListData
	showLoader
	setAccToSurgery
	mySlug
	compReason
	getPerDetails
	getQueryStringID
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private sanitizer: DomSanitizer) { 
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
				this.title.setTitle('Virtual consultation List - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Virtual consultation List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Virtual consultation List - The Cloud Health')
		}
		this.getListData = []
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		this.getPatientlist()
		// this.useMergeMap()

	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
	getPatientlist(){
		var obj = {
			VCB_Booking_Physician_Office_ID:this.admin.UM_Surgary_Physician_CenterID,
			Slug:this.mySlug,
		}
		this.UserService.VCListForPO(obj).subscribe((data)=>{
			console.log(data)
			this.getListData = data.DataList
			if(this.getListData){
				for (var i = 0; i < data.DataList.length; i++) {
					if(new Date(new Date(data.DataList[i].VCB_Booking_Date).setHours(0,0,0,0)) < new Date(new Date().setHours(0,0,0,0))){
						this.getListData[i].expire =  'red'
					}
					if(new Date(new Date(data.DataList[i].VCB_Booking_Date).setHours(0,0,0,0)) < new Date(new Date().setHours(0,0,0,0)) && data.DataList[i].VCB_Status == 'Approved'){
						this.getListData[i].markAsComplete = true
					}
				}
			}
			this.dtTrigger.next();
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#vckistnow').DataTable({
			// 			"responsive": true
			// 		});
			// 	}, 1000);
			// } );

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
	getMyId(id){
		this.getQueryStringID = id
	}
	saveRejectReason(status){
		var arrData = []

		var obj:any= {
			VCB_Unique_ID: this.getQueryStringID,
			VCB_Modify_Date: new Date(),
			VCB_Status: status,
			// VCB_Reason: arrData,
			VCB_TimeZone: this.admin.UM_TimeZone,

		}

		arrData.push({
			RR_Message:this.compReason ,
			RR_Create_By: this.admin.UM_Unique_ID,
			RR_User_Name: this.admin.UM_Username,
			RR_Create_Date: new Date(),
			RR_TimeZone:this.admin.UM_TimeZone,
		})
		obj.VCB_Approved = arrData

		console.log(obj)
		this.UserService.VCBCancelledUpdate(obj).subscribe((data)=>{
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
			// this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#markascomplete").modal("hide");

		$('body').removeClass('home modal-open');
	}	

}
