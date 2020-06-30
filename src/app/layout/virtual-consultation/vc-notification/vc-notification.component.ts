import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute ,Params} from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-vc-notification',
	templateUrl: './vc-notification.component.html',
	styleUrls: ['./vc-notification.component.css']
})
export class VcNotificationComponent implements OnInit {
	showLoader
	admin
	setAccToSurgery
	dataListArray
	getbookingID
	mySlug
	isDelete
	notiArray

	selectedNoti 
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.dataListArray = []
		this.notiArray  =[]
		this.selectedNoti = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.getbookingID = this.route.snapshot.params.id
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Assign Notifications List- ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Assign Notifications List - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Assign Notifications List - The Cloud Health')
		}


		var BookingObj={
			Slug:'',
			VCB_Unique_ID:this.getbookingID
		}

		this.UserService.findOneVcBooking(BookingObj).subscribe((BookingResponse)=>{
			if(BookingResponse.Data.VCB_Notifications!=null){
				this.dataListArray=BookingResponse.Data.VCB_Notifications
			}
			// $(document).ready(function() {
			// 	setTimeout(function(){
			// 		$('#assignvclist').DataTable();
			// 	}, 200);
			// } );
			this.dtTrigger.next();
			
			this.showLoader = false
		},err=>{
			console.log(err)
		})   
		this.getnotification()

	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data  
	}

	isDeletedYes(){
		var arr = []
		arr.push(this.isDelete.NFT_Unique_ID)

		var obj = {
			Slug:this.mySlug,
			VCB_Modify_Date:new Date(),
			VCB_TimeZone:this.admin.UM_TimeZone,
			VCB_Notifications_Array:arr,
			VCB_Unique_ID:this.getbookingID

		}

		console.log(obj)
		// return
		this.UserService.deleteAssignedVCNotification(obj).subscribe((data)=>{
			console.log(data)
			this.toster.success('Deleted Succsesfully', 'success')  

			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}


	goBack(){
		this.location.back()
	}
	SubmitData(){


		var favorite = [];
		$.each($("input[name='Notification']:checked"), function(){
			favorite.push($(this).val());
		});
		if(favorite.length <= 0){
			this.toster.warning('Please Select Checkbox ', 'Warning') 
			return 

		}

		var BookingObject={
			Slug:'',
			VCB_Modify_Date:new Date(),
			VCB_TimeZone:this.admin.UM_TimeZone,
			VCB_Notifications_Array:favorite,
			VCB_Unique_ID:this.getbookingID
		}


		console.log("Booking Object : " + BookingObject)
		this.UserService.assignVCNotification(BookingObject).subscribe(BookingResponse =>{
			console.log("Assign Notification on Booking :" + JSON.stringify(BookingResponse));
			this.toster.success('Notification Assigned Succsesfully', 'success')  
			$("#assignNoti").modal("hide");
			$('body').removeClass('modal-open');
			this.ngOnInit()
			// this.router.navigate(['/assign-notification-list'])
			this.goBack();

		},err=>{
			console.log(err)
		})
	}
	getnotification(){
		var notiobj={
			Slug:'',			
			NFT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID
		}

		this.UserService.NotificationsGetNotiList(notiobj).subscribe((data)=>{
			this.notiArray = data.DataList
			
			this.showLoader = false
		},err=>{
			console.log(err)
		})   


	}
	GetNotiData(name, isChecked){
		if(isChecked){
			if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
			}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
				$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
			}else{
				$(".fa-check").css("background-color", 'green!important')
			}
		}

		console.log(name)
		this.selectedNoti.push(name)
		for (var i = 0; i < this.selectedNoti.length; i++) {
			if(this.selectedNoti[i] == name){
				this.selectedNoti.splice(i, 1);
			}
		}
		console.log(this.selectedNoti)

	}


}
