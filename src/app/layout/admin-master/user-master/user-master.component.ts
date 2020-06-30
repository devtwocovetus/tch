import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router,  ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
declare var $:any
@Component({
	selector: 'app-user-master',
	templateUrl: './user-master.component.html',
	styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {

	form
	getUserArray
	admin
	getUniqueid
	showLoader
	getUserType
	getCreateDate
	isActive
	maxDate = new Date()
	getRoleArray
	isDelete
	getDeletedStaffArray
	getSurgeryCenterArray
	getDesignationArray
	filterPhyWithSCArray
	setAccToSurgery
	options = {
		componentRestrictions: { country: 'USA' }
	}
	checkEmailAddress
	mySlug
	getTheSurPhyId
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	userPermisioonBoolean:boolean = true
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService, 
		private route: ActivatedRoute) { 
		this.title.setTitle('Users')
		this.getUserType = route.snapshot.params.slug;
		this.router.routeReuseStrategy.shouldReuseRoute = () => false
		console.log(this.getUserType)
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		// if(!this.getPerDetails[0].Is_View){
			// 	this.location.back()
			// }
			console.log(this.getPerDetails[0]) 
			$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");

		}
		ngOnDestroy(): void {
			// Do not forget to unsubscribe the event
			this.dtTrigger.unsubscribe();
			this.dtTrigger1.unsubscribe();
		}

		ngOnInit() {
			this.dtOptions = {
				pagingType: 'full_numbers',
				pageLength: 10
			};
			this.dtOptions1 = {
				pagingType: 'full_numbers',
				pageLength: 10
			};

			this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
			if(this.setAccToSurgery){
				if(this.setAccToSurgery.PhyO_DBA_Name){
					this.title.setTitle('Staff - ' +  this.setAccToSurgery.PhyO_DBA_Name)
				}else if(this.setAccToSurgery.SurgC_DBA_Name){
					this.title.setTitle('Staff - ' +  this.setAccToSurgery.SurgC_DBA_Name)
				}
			}else{
				this.title.setTitle('Staff - The Cloud Health')
			}

			this.admin = JSON.parse(localStorage.getItem('loginData'))
			this.getUserArray = []
			this.getRoleArray = []
			this.getDesignationArray = []
			this.getUniqueid = ''
			this.filterPhyWithSCArray = []
			if(this.admin.UM_Office_Type == 'A'){
				this.getUserListForSA()
			}else{

				this.getUserListForSCPO()
			}
			this.GetRolesFilterwithSC()
			this.getSurgeryCenterArray = []
			this.getSurgeryCenterList()
			this.getDesignation()
			this.filterPhyWithSC()
			this.hideShow()
			this.validatphone()
			this.form = new FormGroup({

				Staff_Name : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
				Staff_Last_Name : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
				Staff_Email : new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
				Staff_PhoneNo : new FormControl('',[Validators.required,]),
				Staff_Mobile: new FormControl('',[Validators.required,]),
				Staff_AlternateNo : new FormControl('',[Validators.required,]),
				Staff_Emergency_ContactNo : new FormControl('',[Validators.required,]),
				Staff_Address1 : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
				Staff_Address2 : new FormControl('',),
				Staff_City : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-z ]*')]),
				Staff_State : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-z ]*')]),
				Staff_Country : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-z ]*')]),
				Staff_ZipCode : new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
				Staff_Sex : new FormControl('',[Validators.required]),
				Staff_DOB : new FormControl('',[Validators.required]),
				Staff_SSN_No : new FormControl('',[Validators.required]),
				Staff_DOJ : new FormControl('',[Validators.required]),
				Staff_Designation : new FormControl('',[Validators.required]),
				Staff_Role_Name : new FormControl('',[Validators.required]),
				Staff_Password: new FormControl('',[Validators.required]),
				Staff_Confirm_Password: new FormControl('',[Validators.required]),
				Staff_Facility: new FormControl('',[Validators.required]),
				Staff_Emp_Code : new FormControl(''),
				Staff_Doc_Code : new FormControl(''),
				Staff_Office:  new FormControl(''),
			});

			this.form.get('Staff_Sex').setValue('Male');
			this.form.get('Staff_Facility').setValue('Select Facility');
			this.form.get('Staff_Office').setValue('Select_Office');
			this.form.get('Staff_Designation').setValue('selectDesig');
			this.form.get('Staff_Role_Name').setValue('Select Role');
			// this.form.get('first').setValue('Akshay');
			this.validateSSN()
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

		addUser(){
			$("#submitbtn").modal("hide");
			$('body').removeClass('modal-open');
			if(this.getUniqueid){
				console.log(';im in update')
				this.form.value.Staff_Unique_ID = this.getUniqueid
				// this.form.value.Staff_Surgery_Physician_Office_ID =   this.admin.UM_Unique_ID
				this.form.value.Staff_Create_Date = this.getCreateDate
				this.form.value.Staff_Created_By =  this.admin.UM_Unique_ID
				this.form.value.Staff_Modify_Date =  new Date()
				if(this.getUserType == 'surgery'){
					this.form.value.Staff_Office_Type =  'S'			
				}else{
					this.form.value.Staff_Office_Type =  'P'		
				}
				this.form.value.Staff_Is_Active = this.isActive	
				this.form.value.Staff_TimeZone = this.admin.UM_TimeZone	
				this.form.value.Staff_User_Name = this.admin.UM_Username
				this.form.value.Slug = this.mySlug

				this.UserService.updateStaff(this.form.value).subscribe((data)=>{
					console.log(data)
					this.toster.success(this.translate.instant( 'Data updated successfully'), this.translate.instant('Success'))
					this.ngOnInit()
				},err=>{
					console.log(err)
				})
			}else{
				this.form.value.mydate = $('#mydate').val()
				if(this.form.value.Staff_Password != this.form.value.Staff_Confirm_Password){
					this.toster.warning(this.translate.instant('Password and confirm password are not same'), this.translate.instant('Warning'))
					return
				}
				if(this.form.value.Staff_Role_Name == 'Select Role'){
					this.toster.warning(this.translate.instant('Please select Role'), this.translate.instant('Warning'))
					return
				}
				if(this.form.value.Staff_Designation == 'selectDesig'){
					this.toster.warning(this.translate.instant('Please select Designation'), this.translate.instant('Warning'))
					return
				}
				if(this.form.value.Staff_Emp_Code){

					var checkthis = {
						Staff_Emp_Code : this.form.value.Staff_Emp_Code,
						Staff_Is_Emp_Code : false
					}
					this.UserService.checkDocCodeEmpCode(checkthis).subscribe((data)=>{
						console.log(data)
						if(data.Result == false){
							this.toster.error(this.translate.instant('Employee Code already exist'),this.translate.instant('Error'))
							return
						}
					},err=>{
						console.log(err)
					})
				}
				if( this.form.value.Staff_Doc_Code){
					
					var checkthisNew = {
						Staff_Doc_Code : this.form.value.Staff_Doc_Code,
						Staff_Is_Emp_Code : true
					}
					this.UserService.checkDocCodeEmpCode(checkthisNew).subscribe((data)=>{
						// console.log(data)
						if(data.Result == false){
							this.toster.error(this.translate.instant('Doctor Code already exist'),this.translate.instant('Error'))
							return
						}
					},err=>{
						console.log(err)
					})
				}
				if(this.checkEmailAddress == false){
					this.toster.error(this.translate.instant('Email address already exist'), this.translate.instant('Error'))
					return
					// this.form.value.Staff_Email
				}
				var newid
				if(this.getUserType == 'surgery' && this.admin.UM_Office_Type == 'A'){
					this.getTheSurPhyId = this.form.value.Staff_Facility //this.admin.UM_Surgary_Physician_CenterID
				}else if(this.getUserType == 'surgery' && this.admin.UM_Office_Type == 'S'){
					this.getTheSurPhyId =this.admin.UM_Surgary_Physician_CenterID
				}
				if(this.getUserType == 'physician' && this.admin.UM_Office_Type == 'S'){
					this.getTheSurPhyId = this.form.value.Staff_Office //this.admin.UM_Surgary_Physician_CenterID
				}else if(this.getUserType == 'physician' && this.admin.UM_Office_Type == 'P'){
					this.getTheSurPhyId = this.admin.UM_Surgary_Physician_CenterID
				}

				this.form.value.Staff_Surgery_Physician_Office_ID =  this.getTheSurPhyId
				this.form.value.Staff_Created_By =   this.admin.UM_Unique_ID
				if(this.getUserType == 'surgery'){
					this.form.value.Staff_Office_Type =  'S'			
				}else if(this.getUserType == 'physician'){
					this.form.value.Staff_Office_Type =  'P'		
				}

				this.form.value.Staff_Create_Date =  new Date()
				this.form.value.Staff_Modify_Date =  new Date()
				this.form.value.Staff_Is_Active = true
				this.form.value.Staff_Is_Deleted = false
				this.form.value.Staff_TimeZone = this.admin.UM_TimeZone
				this.form.value.Staff_User_Name = this.admin.UM_Username,
				this.form.value.Project_ID  = this.admin.Project_ID,
				this.form.value.Slug = this.mySlug

				console.log(this.form.value)
				console.log(this.getTheSurPhyId)
				this.UserService.addStaff(this.form.value).subscribe((data)=>{
					if(data.Data.Staff_Unique_ID){
						var addUserData = {
							UM_Member_ID:data.Data.Staff_Unique_ID,
							UM_Username: this.form.value.Staff_Name,
							UM_Password: this.form.value.Staff_Password,
							UM_Email: this.form.value.Staff_Email,
							UM_PhoneNo: this.form.value.Staff_Mobile,
							UM_Surgary_Physician_CenterID: this.getTheSurPhyId,
							UM_Office_Type: this.form.value.Staff_Office_Type,
							UM_Role_Type: this.form.value.Staff_Office_Type,
							UM_Created_By: this.admin.UM_Unique_ID,
							UM_Create_Date: new Date(),
							UM_Modify_Date: new Date(),
							UM_Is_Active: true,
							UM_TimeZone:this.admin.UM_TimeZone,
							UM_User_Name :this.admin.UM_Username,
							Project_ID  : this.admin.Project_ID,
							Slug: this.mySlug
						}
						console.log(addUserData)
						var addPer = {
							Slug: this.mySlug,
							User_ID: data.Data.Staff_Unique_ID,
						}
						let addNewStaff = this.UserService.addUser(addUserData).map(res =>res)
						let addPermission = this.UserService.addPermissionWhenUserCreeate(addPer).map(res =>res)
						Observable.forkJoin([addNewStaff,addPermission	]).subscribe(results =>{
							console.log(results)
							this.ngOnInit()
						})
					}

				},err=>{
					console.log(err)
				})
			}

		}
		editStaffList(item){
			$(".edit-button").click(function(){
				$(".add-table").hide();
				$(".hide-from").show();
				$(".add-button").hide();
				$(".edit-data").show();
				$("#again-Back").show();
			});
			console.log(item)
			this.getUniqueid = item.Staff_Unique_ID

			this.getCreateDate = item.Staff_Created_By
			this.isActive = item.Staff_Is_Active
			this.form.get('Staff_Name').setValue(item.Staff_Name);
			this.form.get('Staff_Last_Name' ).setValue(item.Staff_Last_Name);
			this.form.get('Staff_Email').setValue(item.Staff_Email);
			this.form.get('Staff_PhoneNo').setValue(item.Staff_PhoneNo);
			this.form.get('Staff_AlternateNo').setValue(item.Staff_AlternateNo);
			this.form.get('Staff_Emergency_ContactNo').setValue(item.Staff_Emergency_ContactNo);
			if(item.Staff_Address1){
				this.form.get('Staff_Address1').setValue(item.Staff_Address1);
			}
			this.form.get('Staff_Mobile').setValue(item.Staff_Mobile);
			this.form.get('Staff_Address2').setValue(item.Staff_Address2);
			this.form.get('Staff_City').setValue(item.Staff_City);
			this.form.get('Staff_State').setValue(item.Staff_State);
			this.form.get('Staff_Country').setValue(item.Staff_Country);
			this.form.get('Staff_ZipCode').setValue(item.Staff_ZipCode);
			this.form.get('Staff_Sex').setValue(item.Staff_Sex);
			this.form.get('Staff_DOB').setValue(item.Staff_DOB);
			this.form.get('Staff_DOJ').setValue(item.Staff_DOJ);
			this.form.get('Staff_Designation').setValue(item.Staff_Designation);
			this.form.get('Staff_Role_Name').setValue(item.Staff_Role_Name);
			var obj = {
				Input: item.Staff_SSN_No,
			}
			this.UserService.DcryptSSNnumber(obj).subscribe((data)=>{
				// console.log(data)
				// this.form.get('Staff_Role_Name').setValue('Select Role');
				this.form.get('Staff_SSN_No').setValue(data.Output);
				// this.ngOnInit()
			},err=>{
				console.log(err)
			})
			// console.log(this.form.value)
		}

		getUserListForSCPO(){
			this.getUserArray = []
			this.showLoader = true
			var obj = {
				Slug: this.mySlug,
				Staff_Surgery_Physician_Office_ID: this.admin.UM_Surgary_Physician_CenterID,
				// Staff_Created_By : this.admin.UM_Unique_ID,
				// Staff_Office_Type : this.admin.UM_Office_Type

			}

			this.UserService.staffListForSCPO(obj).subscribe((data)=>{
				console.log(data)

				// this.getUserArray = data
				this.hideShow()
				if(this.getUserType == 'surgery'){
					for (var i = 0; i < data.DataList.length; i++) {
						if(data.DataList[i].Staff_Office_Type == 'S' || data.DataList[i].Staff_Office_Type =='s'||data.DataList[i].Staff_Office_Type =='A'){
							this.getUserArray.push(data.DataList[i])
							if(data.DataList[i].Staff_Unique_ID == this.admin.UM_Member_ID){
								this.userPermisioonBoolean = false

							}
						}
					}
				}
				if(this.getUserType == 'physician'){
					for (var i = 0; i < data.DataList.length; i++) {
						if(data.DataList[i].Staff_Office_Type == 'P' || data.DataList[i].Staff_Office_Type =='p'){
							this.getUserArray.push(data.DataList[i])
						}
					}
				}
				// $('#Stafftable').dataTable().fnDestroy();
				// $(document).ready(function() {
					// 	setTimeout(function(){
						// 		$('#Stafftable').DataTable();
						// 	}, 100);
						// } );
						this.dtTrigger.next();
						this.showLoader = false
					},err=>{
						console.log(err)
					})
		}
		getUserListForSA(){
			this.getUserArray = []
			this.showLoader = true
			var obj = {
				Slug: this.mySlug,
				Staff_Created_By: this.admin.UM_Unique_ID
			}

			this.UserService.staffListForSA(obj).subscribe((data)=>{
				console.log(data)

				// this.getUserArray = data
				this.hideShow()
				if(this.getUserType == 'surgery'){
					for (var i = 0; i < data.DataList.length; i++) {
						if(data.DataList[i].Staff_Office_Type == 'S' || data.DataList[i].Staff_Office_Type =='s'||data.DataList[i].Staff_Office_Type =='A'){
							this.getUserArray.push(data.DataList[i])
						}
					}
				}
				if(this.getUserType == 'physician'){
					for (var i = 0; i < data.DataList.length; i++) {
						if(data.DataList[i].Staff_Office_Type == 'P' || data.DataList[i].Staff_Office_Type =='p'){
							this.getUserArray.push(data.DataList[i])
						}
					}
				}
				// $('#Stafftable').dataTable().fnDestroy();
				// $(document).ready(function() {
					// 	setTimeout(function(){
						// 		$('#Stafftable').DataTable();
						// 	}, 100);
						// } );
						this.dtTrigger.next();
						this.showLoader = false
					},err=>{
						console.log(err)
					})
		}
		UpdateStatus(list, evt){
			var obj = {
				Project_ID  : this.admin.Project_ID,
				Staff_Modify_Date: new Date(),
				Staff_Is_Active: evt.checked,
				Staff_TimeZone: this.admin.UM_TimeZone,
				Staff_Unique_ID:list.Staff_Unique_ID,
				Slug: this.mySlug
			}
			// console.log(list)
			this.UserService.changeStaffStatus(obj).subscribe((data)=>{
				// console.log(data)
				var newobj = {
					UM_Member_ID:list.Staff_Unique_ID,
					UM_Is_Active:evt.checked
				}
				this.UserService.IsActiveWithUMID(newobj).subscribe((data1)=>{
					// console.log(data1)
					// this.ngOnInit()
				},err=>{
					console.log(err)
				})
			},err=>{
				console.log(err)
			})
		}
		GetRolesFilterwithSC(){
			var obj = {
				SurgeryCenterID: this.admin.UM_Unique_ID,
				OfficeType: this.admin.UM_Office_Type,
				Slug: this.mySlug
			}
			this.UserService.GetRolesFilterwithSC(obj).subscribe((data)=>{
				// console.log(data)
				this.getRoleArray = data.DataList
				this.form.get('Staff_Role_Name').setValue('Select Role');
			},err=>{
				console.log(err)
			})
		}

		hideShow(){
			$(".edit-data").hide();
			$(".view-delete-button").hide();
			$(".view-deleted").hide();
			$( ".add-button" ).show();
			$( ".add-table" ).show();
			$( ".hide-from" ).hide();
			$(".view-button").hide();
			$(document).ready(function(){
				$(".add-button").click(function(){
					$(".add-table").hide();
					$(".hide-from").show();
					$(".view-button").show();
					$(".add-button").hide();

				});
				$(".view-button").click(function(){
					$(".hide-from").hide();
					$(".view-button").hide();
					$(".add-table").show();
					$(".add-button").show();
					$(".view-delete-button").hide();
					$(".edit-data").hide();
					$(".view-deleted").hide();
				});
			});
		}
		viewDeletedRdcs(){
			this.getStaffDeletedList()
			$(".view-delete-button").show();
			$(".hide-from").hide();
			$(".view-button").hide();
			$(".add-table").hide();
			$(".add-button").hide();
			$(".view-deleted").show();
			$("#again-Back").show();
			// this.dtTrigger1.next();

		}
		goBack(){
			this.form.reset()
			$("#cancelbtn").modal("hide");
			$('body').removeClass('modal-open');
			this.hideShow()
			this.form.get('Staff_Sex').setValue('Male');
			this.form.get('Staff_Facility').setValue('Select Facility');
			this.form.get('Staff_Office').setValue('Select_Office');
			this.form.get('Staff_Designation').setValue('selectDesig');
			this.form.get('Staff_Role_Name').setValue('Select Role');

		}
		dataDeleted(data){
			$("#trash").modal("show");
			console.log(data)
			this.isDelete = data
		}
		revertDeleted(data){
			$("#revertDelete").modal("show");
			console.log(data)
			this.isDelete = data
		}

		isDeletedYes(){

			// console.log(this.isDelete)
			var obj = {
				Project_ID  : this.admin.Project_ID,
				Staff_Modify_Date : new Date(),
				Staff_Is_Deleted: true,
				Staff_TimeZone: this.isDelete.Staff_TimeZone,
				Staff_Unique_ID: this.isDelete.Staff_Unique_ID,
				Slug: this.mySlug
			}

			this.UserService.changeStaffDeleteStatus(obj).subscribe((data)=>{
				// console.log(data)
				var newobj = {
					UM_Member_ID:this.isDelete.Staff_Unique_ID,
					UM_Is_Active:true
				}
				this.UserService.IsActiveWithUMID(newobj).subscribe((data1)=>{
					// console.log(data1)
					// this.ngOnInit()
				},err=>{
					console.log(err)
				})
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
			$("#trash").modal("hide");
			$('body').removeClass('modal-open');
		}
		revertData(){

			var obj = {
				Project_ID  : this.admin.Project_ID,
				Staff_Modify_Date : new Date(),
				Staff_Is_Deleted: false,
				Staff_TimeZone: this.isDelete.Staff_TimeZone,
				Staff_Unique_ID: this.isDelete.Staff_Unique_ID,
				Slug: this.mySlug

			}
			this.UserService.changeStaffDeleteStatus(obj).subscribe((data)=>{
				// console.log(data)
				var newobj = {
					UM_Member_ID:this.isDelete.Staff_Unique_ID,
					UM_Is_Active:false
				}
				this.UserService.IsActiveWithUMID(newobj).subscribe((data1)=>{
					// console.log(data1)
					// this.ngOnInit()
				},err=>{
					console.log(err)
				})
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
			$("#revertDelete").modal("hide");
			$('body').removeClass('modal-open');
		}

		getStaffDeletedList(){
			this.showLoader = true
			var obj = {
				Slug: this.mySlug,
				Staff_Surgery_Physician_Office_ID:this.admin.UM_Surgary_Physician_CenterID,
				Staff_Office_Type:this.admin.UM_Office_Type
			}
			this.UserService.getStaffDeletedList(obj).subscribe((data)=>{
				this.getDeletedStaffArray =data.DataList
				// $('#Staff_deleted_rc').dataTable().fnDestroy();
				// $(document).ready(function() {
					// 	setTimeout(function(){
						// 		$('#Staff_deleted_rc').DataTable();
						// 	}, 100);
						// } );
						this.dtTrigger1.next();
						this.showLoader = false
					},err=>{
						console.log(err)
					})
		}



		getSurgeryCenterList(){
			this.showLoader = true
			var obj = {
				Slug: this.mySlug
			}
			this.UserService.getSurgeryCenterList(obj).subscribe((data)=>{
				console.log(data)
				this.getSurgeryCenterArray = data.DataList

				this.showLoader = false
				this.hideShow()
			},err=>{
				console.log(err)
			})

		}
		getDesignation(){
			var obj = {
				Slug: this.mySlug
			}
			this.UserService.getDesignationListDD(obj).subscribe((data)=>{
				// console.log(data)
				this.getDesignationArray = data.DataList

			},err=>{
				console.log(err)
			})

		}
		filterPhyWithSC(){

			var filterId 
			if(this.admin.UM_Office_Type == 'S'){
				filterId = this.admin.UM_Surgary_Physician_CenterID
			}else if(this.admin.UM_Office_Type == 'P'){
				filterId = this.setAccToSurgery.PhyO_Surgery_Center_ID
			}else{
				filterId = this.admin.UM_Member_ID
			}
			var obj = {
				Slug: this.mySlug,
				PhyO_Surgery_Center_ID:filterId
			}
			this.UserService.filterPhyWithSC(obj).subscribe((data)=>{
				console.log(data)
				this.hideShow()
				this.filterPhyWithSCArray = data.DataList

			},err=>{
				console.log(err)
			})

		}
		handleAddressChange(address){
			// console.log(address)
			var addresss
			var state
			var city
			var zipcodes
			var street = ''
			var country = ''

			for (var i = 0; i < address.address_components.length; i++) {
				for (var j = 0; j < address.address_components[i].types.length; j++) {
					if(address.address_components[i].types[j] =='locality'){
						city = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='administrative_area_level_1' || address.address_components[i].types[j] == 'administrative_area_level_2'){
						state = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='postal_code'){
						zipcodes = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='street_number'){
						street = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='route'){
						addresss = address.address_components[i].long_name
					}
					if(address.address_components[i].types[j] =='country'){
						country = address.address_components[i].long_name
					}

				}
			}
			this.form.get('Staff_Address1').setValue(street+', '+addresss)
			this.form.get('Staff_State').setValue(state)
			this.form.get('Staff_City').setValue(city)
			this.form.get('Staff_Country').setValue(country)
			this.form.get('Staff_ZipCode').setValue(zipcodes)
			this.form.value.Staff_Address1 = street+', '+addresss
		}
		checkEmail(eml){
			var obj = {
				UM_Email: eml,
				// UM_Surgary_Physician_CenterID: this.admin.UM_Surgary_Physician_CenterID
			}
			// console.log(obj)
			this.UserService.checkEmail(obj).subscribe((data)=>{
				// console.log(data)
				if(data.Result == false){
					this.checkEmailAddress = false
					this.toster.error(this.translate.instant('Email Address already exist'), this.translate.instant('Error'))
				}else{
					this.checkEmailAddress = true
					this.toster.success(this.translate.instant( 'Email Address available'), this.translate.instant('Success'))
				}

			},err=>{
				console.log(err)
			})

		}
		validateSSN(){
			// SSN validation
			// trap keypress - only allow numbers
			$(document).ready(function () {
				//your code here

				$('input.ssn').on('keypress', function(event){
					// trap keypress
					var character = String.fromCharCode(event.which);
					if(!isInteger(character)){
						return false;
					}    
				});

				// checks that an input string is an integer, with an optional +/- sign character
				function isInteger (s) {
					if(s === '-') return true;
					var isInteger_re     = /^\s*(\+|-)?\d+\s*$/;
					return String(s).search (isInteger_re) != -1
				}

				// format SSN 
				$('input.ssn').on('keyup', function(){
					var val = this.value.replace(/\D/g, '');
					var newVal = '';
					if(val.length > 4) {
						this.value = val;
					}
					if((val.length > 3) && (val.length < 6)) {
						newVal += val.substr(0, 3) + '-';
						val = val.substr(3);
					}
					if (val.length > 5) {
						newVal += val.substr(0, 3) + '-';
						newVal += val.substr(3, 2) + '-';
						val = val.substr(5);
					}
					newVal += val;
					this.value = newVal;   
				});
			});

		}
		validatphone(){
			$(document).ready(function () {
				// format SSN 
				$('input.phoneno').on('keyup', function(){
					var val = this.value.replace(/\D/g, '');
					var newVal = '';
					newVal = $('input.phoneno').val()
					var numbers = newVal.replace(/\D/g, ''),
					char = {0:'(',3:')-',6:'-'};
					newVal = '';
					for (var i = 0; i < numbers.length; i++) {
						newVal += (char[i]||'') + numbers[i];
					}
					this.value = newVal;   
					// console.log(this.value)
					return this.value
				});
				$('input.phoneno1').on('keyup', function(){
					var val = this.value.replace(/\D/g, '');
					var newVal = '';
					newVal = $('input.phoneno1').val()
					var numbers = newVal.replace(/\D/g, ''),
					char = {0:'(',3:')-',6:'-'};
					newVal = '';
					for (var i = 0; i < numbers.length; i++) {
						newVal += (char[i]||'') + numbers[i];
					}
					this.value = newVal;   
					// console.log(this.value)
					// return this.value
				});
				$('input.phoneno2').on('keyup', function(){
					var val = this.value.replace(/\D/g, '');
					var newVal = '';
					newVal = $('input.phoneno2').val()
					var numbers = newVal.replace(/\D/g, ''),
					char = {0:'(',3:')-',6:'-'};
					newVal = '';
					for (var i = 0; i < numbers.length; i++) {
						newVal += (char[i]||'') + numbers[i];
					}
					this.value = newVal;   
					// console.log(this.value)
					// return this.value
				});

				$('input.phoneno3').on('keyup', function(){
					var val = this.value.replace(/\D/g, '');
					var newVal = '';
					newVal = $('input.phoneno3').val()
					var numbers = newVal.replace(/\D/g, ''),
					char = {0:'(',3:')-',6:'-'};
					newVal = '';
					for (var i = 0; i < numbers.length; i++) {
						newVal += (char[i]||'') + numbers[i];
					}
					this.value = newVal;   
					// console.log(this.value)
					// return this.value
				});

			});
		}
		froTimeZone(data){
			// console.log(data)
		}


	}

	// Staff_Country
