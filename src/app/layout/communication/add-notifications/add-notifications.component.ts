import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
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
	selector: 'app-add-notifications',
	templateUrl: './add-notifications.component.html',
	styleUrls: ['./add-notifications.component.css']
})
export class AddNotificationsComponent implements OnInit {
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
	newaaray=[];
	newdata =[];
	datanew =[];
	_id: any;

	showLoader: boolean;
	getPatientArray: any;

	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
		this.admin = JSON.parse(localStorage.getItem('loginData'));
		console.log(this.admin);
		// localStorage.removeItem('ObjectArray')
		// if(this.newdata){
			// 	for(var i = 0; i < this.newdata.length; i++)
			// 	{
				// 		this.datanew = this.datanew.concat(this.newdata[i]);
				// 	}
				// }


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
						this.title.setTitle('Add Notification - ' +  this.setAccToSurgery.PhyO_DBA_Name)
					}else if(this.setAccToSurgery.SurgC_DBA_Name){
						this.title.setTitle('Add Notification - ' +  this.setAccToSurgery.SurgC_DBA_Name)
					}
				}else{
					this.title.setTitle('Add Notification - The Cloud Health')
				}
				this.GetNotiCategoryList()
				if(this.admin.UM_Office_Type == 'P'){
					this.mySlug = this.admin.UM_Slug_PO
				}else{
					this.mySlug = this.admin.UM_Slug_SC
				}
				console.log(JSON.parse(localStorage.getItem("this.UserService.mynotification")))

				this.dropdownSettings = {
					singleSelection: false,
					idField: 'item_id',
					textField: 'item_text',
					selectAllText: 'Select All',
					unSelectAllText: 'UnSelect All',
					//itemsShowLimit: 3,
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


			goBack(){
				this.location.back()
			}
			GetNotiCategoryList(){
				var obj = {
					Slug: this.mySlug
				} 
				this.UserService.GetNotiCategoryList(obj).subscribe((data)=>{
					this.GetNotiCategoryListArray = data.DataList
				},err=>{
					console.log(err)
				})
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
				//  console.log( this.reqDatatosent.push(this.UserService.mynotification));

				var obj = {
					NFT_Category_ID : 	this.reqData.NC_Category,
					NFT_Category_Name :  $('#categname  option:selected').text(),
					NFT_Category_Type_ID : 	this.reqData.NC_Type,
					NFT_Category_Type_Name :$('#catgnametype  option:selected').text(),
					NFT_Actions : this.datanew,
					NFT_Surgery_Physician_Id :this.admin.UM_Surgary_Physician_CenterID,
					NFT_Name:this.reqData.name,
					NFT_Description:this.reqData.messages,
					NFT_Office_Type : this.admin.UM_Office_Type,
					NFT_Created_By : this.admin.UM_Unique_ID,
					NFT_User_Name : this.admin.UM_Username,
					NFT_Create_Date : new Date(),
					NFT_Modify_Date : new Date(),
					NFT_Is_Active : true,
					NFT_Is_Deleted : false,
					NFT_TimeZone : this.admin.UM_TimeZone,
					Slug:'',
					NFT_Status:'Pending'
				}
				console.log(this.reqData);

				this.showLoader = true
				//  console.log(obj)
				//  return
				this.UserService.NotificationsCreate(obj).subscribe((data1)=>{
					console.log('Response :' +  JSON.stringify(data1))
					this.toster.success(this.translate.instant('Data added succsesfully'), this.translate.instant('Success'))
					var thisss = this
					setTimeout(function(){ 
						thisss.router.navigate(['/notifications'])
					}, 500);

					this.showLoader = false
				},err=>{
					console.log(err)
				})

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
