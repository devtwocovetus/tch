import { Component, OnInit} from '@angular/core';
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
  selector: 'app-update-intake',
  templateUrl: './update-intake.component.html',
  styleUrls: ['./update-intake.component.css']
})
export class UpdateIntakeComponent implements OnInit {
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	maxDate = new Date()
	maxDate1 = new Date()
	admin	
	setAccToSurgery
	GetNotificationListArray
	reqData
	GetNotificationid
	reqDatatosent  
	noti_typesList
	mySlug
	notitype
	newdata =[];
	datanew =[];
	notiupdatedata=[];
	_id: any;
	GetNotiCategoryListArray
	showLoader: boolean;
	getEthinicityArray

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		this.GetNotificationid = route.snapshot.params.id
		console.log(this.GetNotificationid)
		

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
				this.title.setTitle('Update Notification - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Update Notification - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Update Notification - The Cloud Health')
		}
		
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getDataViaId()
		this.GetNotiCategoryList()
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'item_id',
			textField: 'item_text',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			allowSearchFilter: true
		};
	}
	getDataViaId(){
		var obj:any = {
			PIT_Unique_ID:this.GetNotificationid,
			Slug:''

		}
		this.UserService.getSingleInatke(obj).subscribe(data =>{
			console.log(data);
			this.reqData.NC_Category =	data.Data.PIT_Category_ID
			this.reqData.NC_Type = data.Data.PIT_Category_Type_ID
			this.reqData.name =	data.Data.PIT_Name 
			this.reqData.messages = data.Data.PIT_Description
			this.changeCat('w')
			console.log(this.reqData)
		},err=>{
			console.log(err)
		})
	}
	
  

GetNotiCategoryList(){
		var obj = {
			Slug: this.mySlug
		} 
		this.UserService.GetIntakeCategoryList(obj).subscribe((data)=>{
			this.GetNotiCategoryListArray = data.DataList
		},err=>{
			console.log(err)
		})
	}


	changeCat(e){

		var id = this.reqData.NC_Category

		var newobj = {
			PITT_Category_ID:id,
			Slug: this.mySlug
		}
		this.UserService.GetIntakeTypeListFilterWithCatID1(newobj).subscribe((data)=>{

			this.noti_typesList = data.DataList
			console.log(this.noti_typesList)

		},err=>{
			console.log(err)
		})

	}
	

	NotificationList(){
		var obj = {
			PIT_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
			Slug: this.mySlug
		} 
		this.UserService.NotificationsGetNotiList(obj).subscribe((data)=>{
			console.log(data)
			this.getEthinicityArray = data.DataList
		},err=>{
			console.log(err)
		})
	}

  goBack(){
      this.location.back()
    }

	finalAction(){

		if(this.reqData.NC_Category == '' || this.reqData.NC_Category == undefined || this.reqData.NC_Category == null){
			this.toster.warning('Select Category', 'Warning')  
			return
		}else if(this.reqData.NC_Type == '' || this.reqData.NC_Type == undefined || this.reqData.NC_Type == null){
			this.toster.warning('Select Type', 'Warning')  
			return
		}
		if(this.reqData.name == '' || this.reqData.name == undefined || this.reqData.name == null){
			this.toster.warning('Please fill the black name field', 'Warning')  
			return
		}else if(this.reqData.messages == '' || this.reqData.messages == undefined || this.reqData.messages == null){
			this.toster.warning('Please fill the black messages field', 'Warning')  
			return
		}
		for (var i =0;i< this.GetNotiCategoryListArray.length; i++) {
			if(this.GetNotiCategoryListArray[i].NC_Unique_ID == this.reqData.NC_Category){

				this.reqDatatosent.NC_CategoryID = this.GetNotiCategoryListArray[i].NC_Unique_ID
				this.reqDatatosent.NC_CategoryName = this.GetNotiCategoryListArray[i].NC_Category_Name
			}
		}

		for (var i =0;i< this.noti_typesList.length; i++) {
			if(this.noti_typesList[i].NT_Unique_ID == this.reqData.NC_Type){

				this.reqDatatosent.NC_TypeID = this.noti_typesList[i].NT_Unique_ID
				this.reqDatatosent.NC_TypeName = this.noti_typesList[i].NT_Category_Type_Name
			}
		}
		

			var obj = {
             PIT_Unique_ID :this.GetNotificationid,
            PIT_Category_ID : 	this.reqData.NC_Category,
			PIT_Category_Name :  $('#categname  option:selected').text(),
			PIT_Category_Type_ID : 	this.reqData.NC_Type,
			PIT_Category_Type_Name :$('#catgnametype  option:selected').text(),
			PIT_Name:this.reqData.name,
			PIT_Description:this.reqData.messages,
			PIT_Modify_Date : new Date(),
			PIT_TimeZone : this.admin.UM_TimeZone,
			Slug: this.mySlug
		}
		console.log(obj)
		this.UserService.UpdatePatientIntake(obj).subscribe((data)=>{
			console.log(data)
			 this.ngOnInit()
		},err=>{
			console.log(err)
		})

		this.toster.success('Updated Succsesfully', 'success')  
		this.router.navigate(['/intake'])

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
