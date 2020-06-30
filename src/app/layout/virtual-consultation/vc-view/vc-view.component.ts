import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-vc-view',
	templateUrl: './vc-view.component.html',
	styleUrls: ['./vc-view.component.css']
})
export class VcViewComponent implements OnInit {

	admin
	getQueryStringID
	bookingData
	patientData
	setAccToSurgery
	mySlug
	reasons
	datePassed:boolean = false
	getPerDetails
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) {
		this.getQueryStringID = route.snapshot.params.id;
		// this.getPerDetails = []
		// var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		// this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		// if(!this.getPerDetails[0].Is_View){
		// 	this.location.back()
		// }
		this.findBooking()
	}

	ngOnInit() {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('View VC Patient - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('View VC Patient - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('View VC Patient - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.reasons= {}


		
	}
	findBooking(){
		var obj = {
			VCB_Unique_ID: this.getQueryStringID,
			Slug: this.mySlug
		}
		this.UserService.findOneVcBooking(obj).pipe(
			map( bookingData => {
				const user = bookingData;
				console.log(bookingData.Data)
				bookingData.Data.VCB_Booking_Date = new Date(bookingData.Data.VCB_Booking_Date)
				this.bookingData = bookingData.Data

				console.log(this.formateDate(new Date(bookingData.Data.VCB_Booking_Date)) , this.formateDate(new Date()))
				if(new Date(bookingData.Data.VCB_Booking_Date) <= new Date()){
					this.datePassed = true
				}
				this.loadDynamicCss()
				return user;
			}),
			mergeMap( user =>  this.UserService.getPatinetViaId({Patient_Unique_ID:user.Data.VCB_Patient_ID, Slug:'', })),take(1)
			).subscribe( patientData => {
				console.log(patientData.Data)
				this.patientData = patientData.Data
			});
		}

		goBack(){
			this.location.back()
		}
		tConvert (time) {
			if(time.length<=4){
				time =time+'0'
			}

			var hourEnd = time.indexOf(":");
			var H = +time.substr(0, hourEnd);
			var h = H % 12 || 12;
			var ampm = H < 12 ? "AM" : "PM";
			time = h + time.substr(hourEnd, 3) + ' '+ ampm;
			return time
		}
		setTime(time){
			if(time.length<=4){
				time =time+'0'
			}
			console.log(time)
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

			if(this.reasons.draft){
				arrData.push({
					RR_Message:this.reasons.draft,
					RR_Create_By: this.admin.UM_Unique_ID,
					RR_User_Name: this.admin.UM_Username,
					RR_Create_Date: new Date(),
					RR_TimeZone:this.admin.UM_TimeZone,
				})
				obj.VCB_Draft = arrData
			}
			if(this.reasons.complete){
				arrData.push({
					RR_Message:this.reasons.complete,
					RR_Create_By: this.admin.UM_Unique_ID,
					RR_User_Name: this.admin.UM_Username,
					RR_Create_Date: new Date(),
					RR_TimeZone:this.admin.UM_TimeZone,
				})
				obj.VCB_Complete = arrData
			}
			if(this.reasons.cancelled){
				arrData.push({
					RR_Message:this.reasons.cancelled,
					RR_Create_By: this.admin.UM_Unique_ID,
					RR_User_Name: this.admin.UM_Username,
					RR_Create_Date: new Date(),
					RR_TimeZone:this.admin.UM_TimeZone,
				})
				obj.VCB_Cancelled = arrData
			}
			if(this.reasons.approve){
				arrData.push({
					RR_Message:this.reasons.approve ,
					RR_Create_By: this.admin.UM_Unique_ID,
					RR_User_Name: this.admin.UM_Username,
					RR_Create_Date: new Date(),
					RR_TimeZone:this.admin.UM_TimeZone,
				})
				obj.VCB_Approved = arrData
			}
			if(this.reasons.unapproved){
				arrData.push({
					RR_Message:this.reasons.unapproved ,
					RR_Create_By: this.admin.UM_Unique_ID,
					RR_User_Name: this.admin.UM_Username,
					RR_Create_Date: new Date(),
					RR_TimeZone:this.admin.UM_TimeZone,
				})
				obj.VCB_Unapproved = arrData
			}

			console.log(obj)
			this.UserService.VCBCancelledUpdate(obj).subscribe((data)=>{
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.router.navigate(['/', 'vc-list']);
			},err=>{
				console.log(err)
			})
			$("#approve").modal("hide");
			$("#unapprove").modal("hide");
			$("#draft").modal("hide");
			$("#cancelled").modal("hide");
			$("#complete").modal("hide");
			$('body').removeClass('home modal-open');
		}
		formateDate(date) {
			var year = date.getFullYear();

			var month = (1 + date.getMonth()).toString();
			month = month.length > 1 ? month : '0' + month;

			var day = date.getDate().toString();
			day = day.length > 1 ? day : '0' + day;

			return day + '/' + month + '/' + year;
		}
		loadDynamicCss(){
			var aa  = this
			setTimeout(function(){

				if(aa.setAccToSurgery){
					if(aa.setAccToSurgery.PhyO_Appearance){
						$(".header").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorDark_Hax)
						$(".btnsubmit").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
					}else{
						$(".header").css("background-color", '#006400')
						$(".btnsubmit").css("background-color",'#04a8c5');
					}
					if(aa.setAccToSurgery.PhyO_Appearance){

						$("h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax);
						$(".menu li a").hover(function(){
							$(this).css("backgroundColor", aa.setAccToSurgery.PhyO_Appearance.App_HyperlinkHoverText_Hax);
						},
						function(){
							$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax);
						});
						$(".mh-right a").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						}
						);
						$(".btnsubmit").hover(function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
								}
							}else{

								$(this).css("background",'#fff');
								$(this).css("color", "");
							}
						},

						function(){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
								}
							}else{
								$(this).css("background",'#04a8c5');
								$(this).css("color", "");
							}
						});
					}
				}else{
					$("h1").css("color", "#2ca36c");
				}
			}, 30);
		}

	}
