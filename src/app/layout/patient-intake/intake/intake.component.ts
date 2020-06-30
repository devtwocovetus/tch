import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
@Component({
	selector: 'app-intake',
	templateUrl: './intake.component.html',
	styleUrls: ['./intake.component.css']
})
export class IntakeComponent implements OnInit {
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	getEthinicityArray : any = []
	GetIntakeCategoryListArray
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
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) {

		this.admin = JSON.parse(localStorage.getItem('loginData'))
		console.log(this.admin)
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
				this.title.setTitle('patient Intake - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('patient Intake - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('patient Intake - The Cloud Health')
		}

		this.GetIntakeCategoryList()
		this.NotificationList()
		console.log(this.getEthinicityArray)
		setTimeout(function(){
			$('#ntitbleview').DataTable();
		}, 300);
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}

	}

	GetIntakeCategoryList(){
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.GetIntakeCategoryList(obj).subscribe((data)=>{
			console.log(data)
			this.GetIntakeCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	NotificationList(){
		var obj = {
			PIT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
			Slug: this.mySlug
		} 
		this.UserService.IntakeGetInatkeList(obj).subscribe((data)=>{
			console.log(data)
			this.getEthinicityArray = data.DataList
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

				PIT_Unique_ID:this.isDelete.PIT_Unique_ID,
				PIT_Is_Deleted:true,
				PIT_Modify_Date:new Date(),
				PIT_TimeZone:this.isDelete.PIT_TimeZone,			
				Slug: this.mySlug

			}
			console.log(obj)

			this.UserService.deleteIntakes(obj).subscribe((data)=>{
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

			for (var i =0;i< this.GetIntakeCategoryListArray.length; i++) {
				if(this.GetIntakeCategoryListArray[i].NC_Unique_ID == this.reqData.NC_Category){

					this.NC_CategoryID = this.GetIntakeCategoryListArray[i].NC_Unique_ID
					this.NC_CategoryName = this.GetIntakeCategoryListArray[i].NC_Category_Name
				}
			}


			var obj= {
				PITT_Category_ID:this.NC_CategoryID,
				PITT_Category_Name:this.NC_CategoryName,
				PITT_Category_Type_Name:this.reqData.NC_Type,
				PITT_Category_Type_Code:'',
				PITT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
				PITT_Created_By:this.NT_Created_By,
				PITT_User_Name:this.NT_User_Name ,
				PITT_Create_Date:new Date(),
				PITT_Modify_Date:new Date(),
				PITT_Is_Active:true,
				PITT_Is_Deleted:false,
				PITT_TimeZone:this.admin.UM_TimeZone
			}

			this.UserService.IntakeTypeCreateService(obj).subscribe((data)=>{
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
