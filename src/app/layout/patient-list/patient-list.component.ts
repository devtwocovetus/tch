import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
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
	selector: 'app-patient-list',
	templateUrl: './patient-list.component.html',
	styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
	admin
	getPatientArray
	showLoader
	setAccToSurgery
	mySlug
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private translate: TranslateService) { 
		// translate.setDefaultLang('fr');
	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		console.log(this.getPerDetails[0])
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Patient List - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Patient List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Patient List - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getPatientArray = []
		this.getPatientlist()
	}
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
	test(){
		var  a = 'data added successfully'
		this.translate.instant('data added successfully')
		this.toster.success(this.translate.instant('data added successfully'), 'Success')
		}
		getPatientlist(){
		var obj = {
			Patient_Surgery_Physician_Center_ID: this.admin.UM_Surgary_Physician_CenterID,
			Patient_Office_Type: this.admin.UM_Office_Type,
			Slug: this.mySlug,
		}
		// $('#patinr_list').dataTable().fnDestroy();
		this.showLoader = true
		this.UserService.getpatientList(obj).subscribe((data)=>{
			console.log(data)
			this.getPatientArray = data.DataList
			this.dtTrigger.next();
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#patinr_list').DataTable();

			// 	}, 10);
			// 	mythis.getPatientArray = data.DataList
			// } );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	gotoBookNow(data){
		// data.Patient_Unique_ID
		// this.router.navigate(['/booking-form'], { queryParams: { patientID:data.Patient_Unique_ID},  patientName:data.Patient_First_Name});
		this.router.navigate(['/booking'], { queryParams: { id: data.Patient_Unique_ID, name: data.Patient_First_Name}});
	}

}
