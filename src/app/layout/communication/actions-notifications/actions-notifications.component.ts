import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {environment1} from '../../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
import { ActivatedRoute } from '@angular/router';



@Component({
	selector: 'app-actions-notifications',
	templateUrl: './actions-notifications.component.html',
	styleUrls: ['./actions-notifications.component.css']
})
export class ActionsnotificationsComponent implements OnInit {
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	GetNotiCategoryListArray
	reqData
	reqDatatosent  
	noti_typesList
	mySlug
	isDelete
	newdata =[];
	datanew =[];

	_id: any;
	GetNotificationid
	getEthinicityArray
	showLoader: boolean;
	getPatientArray: any;
	
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		this.GetNotificationid = route.snapshot.params.id
		let uniqekey = this.GetNotificationid;
		localStorage.setItem('myDataKey', uniqekey);
		
	}

	ngOnInit() {

		this.noti_typesList = []
		this.reqData = {}
		this.dropToggle()
		this.reqDatatosent = {}
		this.reqData.NC_Category  = ''
		this.reqData.NC_Type = ''
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Actions-Notifications - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Actions-Notifications - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Actions-Notifications - The Cloud Health')
		}
		this.GetNotiCategoryList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		


		this.NotificationList();

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'item_id',
			textField: 'item_text',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			allowSearchFilter: true
		};
	}

	changeCat(e){

		var id = this.reqData.NC_Category

		var newobj = {
			NT_Category_ID:id,
			Slug: this.mySlug
		}
		this.UserService.GetNotiTypeListFilterWithCatID(newobj).subscribe((data)=>{

			this.noti_typesList = data.DataList

		},err=>{
			console.log(err)
		})

	}



	NotificationList(){
		$('#notficanview').dataTable().fnDestroy();
		var obj = {
			NFT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
			Slug: this.mySlug
		} 
		this.UserService.NotificationsGetNotiList(obj).subscribe((data)=>{			
			this.getEthinicityArray = data.DataList;
			console.log(data.DataList)
			for (var i = 0; i <this.getEthinicityArray.length; ++i) {
				if(this.getEthinicityArray[i].NFT_Unique_ID == this.GetNotificationid){
					this.datanew = this.getEthinicityArray[i].NFT_Actions
				
				}
			}
			setTimeout(function(){
				$('#notficanview').DataTable();
			}, 300);
		
		},err=>{
			console.log(err)
		})
	}



	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data  
	}

	isDeletedYes(){
		var arr = []
		arr.push(this.isDelete)

		var obj = {

			NFT_Unique_ID:this.GetNotificationid,
			NFT_Actions:arr,
			Slug: this.mySlug

		}

		console.log(obj)
	
		this.UserService.deleteNotificationsActions(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}
	
	GetNotiCategoryList(){
		this.GetNotiCategoryListArray = []
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.GetNotiCategoryList(obj).subscribe((data)=>{
			console.log(data.DataList)
			this.GetNotiCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	saveAction(id){

		this.router.navigate(['/notification-action'], { queryParams: { action: id } })
	}


	dropToggle () {
		const $menu = $('.dropdown_cust');

		$(document).mouseup(e => {
			if (!$menu.is(e.target) // if the target of the click isn't the container...
				&& $menu.has(e.target).length === 0) // ... nor a descendant of the container
			{
				$menu.removeClass('showDrop');
			}
		});

		$('.dropbtn').on('click', () => {
			$menu.toggleClass('showDrop');
		});

	}


}
