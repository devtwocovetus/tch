import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
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
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	getEthinicityArray : any = []
	GetNotiCategoryListArray
	reqData
	NT_User_Name
	NT_Created_By
	NC_CategoryID
	NC_CategoryName
	isDelete
	mySlug
	showLoader: boolean;
	getUniqueid
	form
	getcreatedAt
	getPerDetails

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		console.log(this.getPerDetails[0])

	}

	ngOnInit() {
		this.NC_CategoryID = ""
		this.NC_CategoryName = ""
		this.NT_User_Name = ''
		this.reqData = {}
		this.reqData.NC_Category  = ''
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Notifications - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Notifications - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Notifications - The Cloud Health')
		}

		this.GetNotiCategoryList()
		this.NotificationList()
		console.log(this.getEthinicityArray)
		
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		setTimeout(function(){ 
			var color = $( '.table thead th' ).css( "background-color" );
			$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
			$(".mat-checked input:checkbox").change(function() {
				var color = $( '.table thead th' ).css( "background-color" );
				var ischecked= $(this).is(':checked');
				if(!ischecked)
					$( ".mat-slide-toggle-thumb" ).css( "background-color", "#ffffff");
				else 
					var color = $( '.table thead th' ).css( "background-color" );
				$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
			});
			// $(".mat-accent .mat-slide-toggle-thumb").css("background-color", '#ffffff!important')
			// var str = str.replace(";", "");
$(".add-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".view-button").show();
				$(".add-button").hide();
				
			});
		}, 2000);


	}

	GetNotiCategoryList(){
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.GetNotiCategoryList(obj).subscribe((data)=>{
			console.log(data)
			this.GetNotiCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	NotificationList(){
		var obj = {
			NFT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
			Slug: this.mySlug
		} 
		this.UserService.NotificationsGetNotiList(obj).subscribe((data)=>{
			console.log(data)
			this.getEthinicityArray = data.DataList
			setTimeout(function(){
				$('#newtblevewiewneto').DataTable();
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

	// revertDeleted(data){
		// 	$("#revertDelete").modal("show");
		// 	console.log(data)
		// 	this.isDelete = data
		// }
		isDeletedYes(){

			var obj = {

				NFT_Unique_ID:this.isDelete.NFT_Unique_ID,
				NFT_Is_Deleted:true,
				NFT_Modify_Date:new Date(),
				NFT_TimeZone:this.isDelete.NFT_TimeZone,			
				Slug: this.mySlug

			}
			console.log(obj)

			this.UserService.deleteNotifications(obj).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
			$("#trash").modal("hide");
			$('body').removeClass('modal-open');
		}
		

		SaveNotification(){
			console.log(this.reqData)
			if(this.setAccToSurgery.PhyO_User_Name){
				this.NT_User_Name = this.setAccToSurgery.PhyO_User_Name
			}else if(this.setAccToSurgery.SurgC_User_Name){
				this.NT_User_Name = this.setAccToSurgery.SurgC_User_Name
			}
			if(this.setAccToSurgery.PhyO_Unique_ID){
				this.NT_Created_By = this.setAccToSurgery.PhyO_Unique_ID
			}else if(this.setAccToSurgery.SurgC_Unique_ID){
				this.NT_Created_By = this.setAccToSurgery.SurgC_Unique_ID
			}

			if(this.reqData.NC_Category == '' || this.reqData.NC_Category == undefined || this.reqData.NC_Category == null){
				this.toster.warning('Select Category', 'Warning')	
				return
			}else if(this.reqData.NC_Type == '' || this.reqData.NC_Type == undefined || this.reqData.NC_Type == null){
				this.toster.warning('Select Type', 'Warning')	
				return
			}

			for (var i =0;i< this.GetNotiCategoryListArray.length; i++) {
				if(this.GetNotiCategoryListArray[i].NC_Unique_ID == this.reqData.NC_Category){

					this.NC_CategoryID = this.GetNotiCategoryListArray[i].NC_Unique_ID
					this.NC_CategoryName = this.GetNotiCategoryListArray[i].NC_Category_Name
				}
			}


			var obj= {
				NT_Category_ID:this.NC_CategoryID,
				NT_Category_Name:this.NC_CategoryName,
				NT_Category_Type_Name:this.reqData.NC_Type,
				NT_Created_By:this.NT_Created_By,
				NT_User_Name:this.NT_User_Name ,
				NT_Create_Date:new Date(),
				NT_Modify_Date:new Date(),
				NT_Is_Active:true,
				NT_Is_Deleted:false,
				NT_TimeZone:this.admin.UM_TimeZone
			}
			
			this.UserService.notiTypeCreateService(obj).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.reqData.NC_Category  = ''
				this.reqData.NC_Type  = ''
				$('#addnotificationtype').modal('toggle')
			},err=>{
				console.log(err)
			})
		}
	}
