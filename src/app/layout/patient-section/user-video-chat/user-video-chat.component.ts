import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import {environment1} from '../../../../environments/environment.prod';declare var $:any
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-user-video-chat',
	templateUrl: './user-video-chat.component.html',
	styleUrls: ['./user-video-chat.component.css']
})
export class UserVideoChatComponent implements OnInit {
	setAccToSurgery
	admin
	getUniqueId
	mySlug
	getbookingObject
	roomName
	patientInfo
	getPatientFullName
	siteLink
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) { 
		this.roomName = route.snapshot.params.id
		// this.getPatientFullName = route.snapshot.params.name
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		console.log(this.getPatientFullName)
		localStorage.setItem('identityId', this.admin.UM_Unique_ID)
		localStorage.setItem('identityName', this.admin.UM_Username)
		this.siteLink = environment1.siteLink
	}

	ngOnInit(): void {
		this.getbookingObject= {}
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Virtual Consultation Video Call - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Virtual Consultation Video Call - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Virtual Consultation Video Call - The Cloud Health')
		}
		setTimeout(function(){
			$(".generttknmy").trigger("click");
		}, 1000);
		var obj = {
			VCB_Unique_ID: this.getUniqueId,
			Slug: this.mySlug
		}
		// this.findBooking()


	}
}
