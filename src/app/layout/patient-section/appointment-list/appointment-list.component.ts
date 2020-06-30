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
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
	admin
	getPatientArray
	showLoader
	setAccToSurgery
	mySlug
	appointment=[]
	getListData
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
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Appointment List - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Appointment List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Appointment List - The Cloud Health')
		}
		this.getPatientArray = []
		// if(this.admin.UM_Office_Type == 'S' || this.admin.UM_Office_Type == 'A'){
			// 	this.getPatientlist();
			// }else{
				// 	this.getPatientlistfORPhy()
				// }
				if(this.admin.UM_Office_Type == 'P'){
					this.mySlug = this.admin.UM_Slug_PO
				}else{
					this.mySlug = this.admin.UM_Slug_SC
				}
				this.getListData = []
				this.getList()
			}
			ngOnDestroy(): void {
				// Do not forget to unsubscribe the event
				this.dtTrigger.unsubscribe();
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
					this.dtTrigger.next();

				},err=>{
					console.log(err)
				})
			}
			getPatientlist(){
				var obj:any = {}
				var mainId
				if(this.admin.UM_Office_Type == 'A'){
					obj.PB_Booking_Surgery_Center_ID = 0
				}else if(this.admin.UM_Office_Type == 'S'){
					obj.PB_Booking_Surgery_Center_ID = this.admin.UM_Surgary_Physician_CenterID
				}else{
					obj.PB_Booking_Physician_Office_ID = this.admin.UM_Surgary_Physician_CenterID
				}
				obj.Slug = this.mySlug

				this.showLoader = true
				this.UserService.getListAppointments(obj).subscribe((data)=>{
					console.log(data)
					this.getPatientArray = data.DataList
					$(document).ready(function() {
						setTimeout(function(){
							$('#app_list_now_a').DataTable();
						}, 200);
					} );
					this.showLoader = false
				},err=>{
					console.log(err)
				})
			}

			getPatientlistfORPhy(){
				// var mainId
				// if(this.admin.UM_Office_Type == 'A'){
					// 	mainId = 0
					// }else{
						// 	mainId = this.admin.UM_Surgary_Physician_CenterID
						// }
						var obj = {
							PB_Booking_Physician_Office_ID:this.admin.UM_Surgary_Physician_CenterID,
							Slug:this.mySlug
						}
						this.showLoader = true
						this.UserService.GetBookingListFilterWithPO(obj).subscribe((data)=>{
							console.log(data)
							this.getPatientArray = data.DataList
							$(document).ready(function() {
								setTimeout(function(){
									$('#app_list_now_a').DataTable();
								}, 200);
							} );
							this.showLoader = false
						},err=>{
							console.log(err)
						})
					}


				}

//getListAppointments