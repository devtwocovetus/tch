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
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
declare var $:any
@Component({
	selector: 'app-vc-history',
	templateUrl: './vc-history.component.html',
	styleUrls: ['./vc-history.component.css']
})
export class VcHistoryComponent implements OnInit {
	admin
	getListData
	showLoader
	setAccToSurgery
	mySlug
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private sanitizer: DomSanitizer) { 
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
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Virtual consultation history list - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Virtual consultation history list - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Virtual consultation List - The Cloud Health')
		}
		this.getListData = []
		// if(this.admin.UM_Office_Type == 'S' || this.admin.UM_Office_Type == 'A'){
			// 	this.getPatientlist()
			// }else{
				// 	this.getPatientlistfORPhy()
				// }
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
			}
			getPatientlist(){
				var obj = {
					Slug:this.mySlug,
					VCB_Booking_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID
				}
				this.showLoader = true
				this.UserService.vcHistoryList(obj).subscribe((data)=>{
					console.log(data)
					this.getListData = data.DataList
					this.dtTrigger.next();

					// $(document).ready(function() {
					// 	setTimeout(function(){
					// 		$('#vchistrylism').DataTable({
					// 			"responsive": true
					// 		});
					// 	}, 500);
					// } );
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
			formateDate(date) {
				var year = date.getFullYear();

				var month = (1 + date.getMonth()).toString();
				month = month.length > 1 ? month : '0' + month;

				var day = date.getDate().toString();
				day = day.length > 1 ? day : '0' + day;

				return day + '/' + month + '/' + year;
			}
			goBack(){
				this.location.back()
			}



		}