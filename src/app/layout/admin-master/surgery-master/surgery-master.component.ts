import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import {environment1} from '../../../../environments/environment.prod';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Observable, forkJoin, from } from 'rxjs';
import { flatMap, mergeMap , toArray, map, take } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-surgery-master',
	templateUrl: './surgery-master.component.html',
	styleUrls: ['./surgery-master.component.css']
})
export class SurgeryMasterComponent implements OnInit {
	surgeryForm
	admin
	getSurgeryArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	getSelectedTimeZone
	getSpecialtiesArray
	editAllspecs
	Spec_Select = []
	getDeletedSurgeryArray
	isDelete
	getSiteLink
	options = {
		componentRestrictions: { country: 'USA' }
	}
	getJsonUploadfile
	projectId
	getSurgeryUniqueId
	checkEmailAddress
	getusTimeZone
	setAccToSurgery
	newArray
	trysomeing
	getDataOfSpec
	mySlug
	getSurgryeTimeZone
	randomPasssowrd
	adminUserID
	getActiveationEmail
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService,  private location: Location, private title: Title, private translate: TranslateService, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef) { 
		this.form = new FormGroup({
			

			SurgC_Address: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SurgC_Country: new FormControl('',[Validators.required]),
			SurgC_State: new FormControl('',[Validators.required]),
			SurgC_City: new FormControl('',[Validators.required]),
			SurgC_MobileNo: new FormControl('',[Validators.required]),
			SurgC_DBA_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SurgC_Website_URL: new FormControl('',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
			SurgC_Zip: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			SurgC_Address2:new FormControl(''),
			SurgC_Email:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
			SurgC_FaxNo:new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			SurgC_Name:new FormControl('',[Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
		});
		

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
				this.title.setTitle('Surgery Center - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Surgery Center - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Surgery Center - The Cloud Health')
		}
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
		this.getSiteLink = environment1.siteLink
		this.getUniqueid = ''
		this.getSpecialtiesArray =[]
		this.getDeletedSurgeryArray = []
		this.trysomeing = []
		this.getDataOfSpec = []
		this.hideShow()
		this.getSurgeryArray = []

		this.getSurgeryCenterList()
		this.getSpecialties()
		this.surgeryForm = {}

		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.loadDefaultDateTime();
		this.loadTimeZoneList();  
		this.submitDate();
		this.getSurgeryDeletedList()
		// this.getusTimeZone = moment().tz("America/New_York").format();
		// console.log(this.getSelectedTimeZone)
		// $('#pickerDateTime').val(this.getusTimeZone)
		this.validatphone()
		this.sysEmail()
		this.newArray = []
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}

		// this.getSelectedTimeZone  = '2019-11-16 17:44:00 -05:00'
	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
	}
	sysEmail(){
		var sys = {
			Slug: this.mySlug,
			SET_Name:'Welcome to <physician center name>'
		}
		this.UserService.seletEmailViaName(sys).subscribe((data)=>{
			this.getActiveationEmail = data.Data

		},err=>{
			console.log(err)
		})

	}

	addSurgeryForm(){
		console.log(this.form.value)
		this.showLoader = true
		$("#submitbtn").modal("hide"); 
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log('im in update')
			this.form.value.SurgC_Address = this.form.value.SurgC_Address
			this.form.value.SurgC_Unique_ID = this.getUniqueid
			this.form.value.SurgC_Create_Date = this.getcreatedAt
			this.form.value.SurgC_Surgery_Center_ID = this.admin.UM_Unique_ID
			this.form.value.SurgC_Created_By = this.admin.UM_Unique_ID
			this.form.value.SurgC_Modify_Date = this.getSelectedTimeZone
			this.form.value.SurgC_Is_Active = true
			this.form.value.SurgC_TimeZone = this.getSurgryeTimeZone
			this.form.value.Project_ID  = this.admin.Project_ID	
			this.form.value.SurgC_SpecilitiesList = this.newArray
			this.form.value.Slug = this.mySlug
			console.log(this.form.value)
			this.UserService.updateSurgeryMaster(this.form.value).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			if(this.checkEmailAddress == false){
				this.toster.error(this.translate.instant('Email address alredy exist'), this.translate.instant('Error'))
				return
				// this.form.value.Staff_Email
			}
			this.form.value.SurgC_Address = this.form.value.SurgC_Address
			this.form.value.SurgC_Created_By  = this.admin.UM_Unique_ID,
			this.form.value.SurgC_User_Name  = this.admin.UM_Username,
			this.form.value.SurgC_Create_Date  = this.getSelectedTimeZone,
			this.form.value.SurgC_Created_By_Type = this.admin.UM_Office_Type
			this.form.value.SurgC_Modify_Date  = this.getSelectedTimeZone,
			this.form.value.SurgC_Surgery_Center_ID = this.admin.UM_Unique_ID
			this.form.value.SurgC_Is_Active = true
			this.form.value.SurgC_TimeZone = this.getSurgryeTimeZone	
			this.form.value.Project_ID  = this.admin.Project_ID
			this.form.value.SurgC_SpecilitiesList = this.newArray
			this.form.value.Slug = this.mySlug
			console.log(this.form.value)
			this.UserService.addSurgeryMaster(this.form.value).subscribe((data)=>{

				console.log(data)
				// this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.randomPasssowrd =  this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
				this.getSurgeryUniqueId = data.Data.SurgC_Unique_ID
				if(data.Data.SurgC_Unique_ID){
					var addUserData = {
						UM_Member_ID:data.Data.Staff_Unique_ID,
						UM_Username: this.form.value.SurgC_DBA_Name,
						UM_Password: this.randomPasssowrd,
						UM_Email: this.form.value.SurgC_Email,
						UM_PhoneNo: this.form.value.SurgC_MobileNo,
						UM_Surgary_Physician_CenterID: data.Data.SurgC_Unique_ID,
						UM_Office_Type: 'S',
						UM_Role_Type: 'Admin',
						UM_Created_By: this.admin.UM_Unique_ID,
						UM_Create_Date: new Date(),
						UM_Modify_Date: new Date(),
						UM_Is_Active: true,
						UM_TimeZone:this.admin.UM_TimeZone,
						UM_User_Name :this.admin.UM_Username,
						Project_ID  : this.admin.Project_ID,
						Slug: this.mySlug
					}
					this.UserService.addUser(addUserData).pipe(
						map(addUserData => {
							const user = addUserData;
							console.log(addUserData.Data.UM_Unique_ID)
							this.adminUserID  = addUserData.Data.UM_Unique_ID 
							console.log(this.adminUserID)
							return user;
						}),
						mergeMap( user =>  this.UserService.addPermissionWhenUserCreeate({User_ID:this.adminUserID, Slug: this.mySlug, })),take(1)
						).subscribe( patientData => {
							console.log(patientData.Data)
							this.CreateUserandSendMail()
						});
						
					}
				},err=>{
					console.log(err)
				})
		}
	}
	CreateUserandSendMail(){


		//SMS Section
		var Sms = {   
			Receiver_Contact_No:'+'   + this.form.value.SurgC_MobileNo,
			Message_Body: 'Your Email is : ' + this.form.value.SurgC_Email + ' and passcode is : ' 
			+ this.randomPasssowrd,
			Message_Date:new Date(),
			Message_Title: 'Login Credential'
		}
		console.log(Sms)

		this.showLoader = true
		this.UserService.sendsms(Sms).subscribe((SMSResponse)=>{
			console.log('Response :' +  JSON.stringify(SMSResponse))

			this.showLoader = false
		},err=>{
			console.log(err)
		})  

		//Email Section
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.form.value.SurgC_DBA_Name);
		this.getActiveationEmail.SET_Name = this.getActiveationEmail.SET_Name.replace("<physician center name>", this.form.value.SurgC_DBA_Name);
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.admin.UM_Username);
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>emailaddress</strong>", "<strong>"+ this.form.value.SurgC_Email+" </strong>");
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>password</strong>", "<strong>"+ this.randomPasssowrd+" </strong>");

		var tomail = []
		tomail.push(this.form.value.SurgC_Email)
		var Email:any= {};
		Email.to_email=tomail;
		Email.To_Name=this.form.value.SurgC_DBA_Name
		Email.Bcc_Email=this.getActiveationEmail.SET_Bcc,
		Email.Cc_Email=this.getActiveationEmail.SET_CC,
		Email.Subject=this.getActiveationEmail.SET_Name;
		Email.From_Email = "tch.techconnect@gmail.com";
		Email.From_Name = this.getActiveationEmail.SET_From_Name;
		Email.PlainTextContent = "";
		Email.HtmlContent = '<img src='+environment1.image+this.getActiveationEmail.SET_Header+' height="47.58px" width="115px" alt="logo">'+ "<br><br><br>" + this.getActiveationEmail.SET_Message + "<br><br><br>" + this.getActiveationEmail.SET_Footer
		
		console.log(Email)

		this.showLoader = true

		this.UserService.sendemail(Email).subscribe((data2)=>{
			console.log(data2)
			this.toster.success(this.translate.instant('Your account has been created, please check you mail'), this.translate.instant('Success'))
		},err=>{
			console.log(err)
		})
		this.ngOnInit()
	}

	editSurgery(item){

		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.SurgC_Unique_ID
		this.getcreatedAt = item.SurgC_Create_Date
		this.form.get('SurgC_Address').setValue(item.SurgC_Address);
		// this.form.get('SurgC_AlternateNo' ).setValue(item.SurgC_AlternateNo);
		this.form.get('SurgC_Country').setValue(item.SurgC_Country);
		this.form.get('SurgC_State' ).setValue(item.SurgC_State);
		this.form.get('SurgC_City').setValue(item.SurgC_City);
		this.form.get('SurgC_MobileNo' ).setValue(item.SurgC_MobileNo);
		this.form.get('SurgC_DBA_Name').setValue(item.SurgC_DBA_Name);
		this.form.get('SurgC_Website_URL' ).setValue(item.SurgC_Website_URL);
		this.form.get('SurgC_Zip').setValue(item.SurgC_Zip);
		this.form.get('SurgC_DBA_Name').setValue(item.SurgC_DBA_Name);
		this.form.get('SurgC_Email').setValue(item.SurgC_Email);
		this.form.get('SurgC_FaxNo').setValue(item.SurgC_FaxNo);
		this.form.get('SurgC_Name').setValue(item.SurgC_Name);
		this.form.get('SurgC_Address2').setValue(item.SurgC_Address2);


		// for (var i = 0; i < item.SurgC_SpecilitiesList.length; i++) {
			// 	this.form.get('Spec_Select').setValue(item.SurgC_SpecilitiesList[i].Spec_Select);
			// }
			for (var i = 0; i < item.SurgC_SpecilitiesList.length; i++) {
				for (var j = 0; j < this.getSpecialtiesArray.length; j++) {
					if(this.getSpecialtiesArray[j].Spec_Unique_ID == item.SurgC_SpecilitiesList[i].Spec_Unique_ID){
						this.trysomeing.push(this.getSpecialtiesArray[j].Spec_Name)
						this.getDataOfSpec.push({
							Project_ID: this.getSpecialtiesArray[j].Project_ID ,
							Spec_CB_Name: this.getSpecialtiesArray[j].Spec_CB_Name ,
							Spec_Create_By: this.getSpecialtiesArray[j].Spec_Create_By ,
							Spec_Create_By_Type: this.getSpecialtiesArray[j].Spec_Create_By_Type ,
							Spec_Create_Date: this.getSpecialtiesArray[j].Spec_Create_Date ,
							Spec_Description: this.getSpecialtiesArray[j].Spec_Description ,
							Spec_Is_Active: this.getSpecialtiesArray[j].Spec_Is_Active ,
							Spec_Is_Deleted: this.getSpecialtiesArray[j].Spec_Is_Deleted ,
							Spec_Modify_Date: this.getSpecialtiesArray[j].Spec_Modify_Date ,
							Spec_Name: this.getSpecialtiesArray[j].Spec_Name ,
							Spec_Select: this.getSpecialtiesArray[j].Spec_Select ,
							Spec_TimeZone: this.getSpecialtiesArray[j].Spec_TimeZone ,
							Spec_Type: this.getSpecialtiesArray[j].Spec_Type ,
							Spec_Unique_ID: this.getSpecialtiesArray[j].Spec_Unique_ID ,
							Spec_User_Name: this.getSpecialtiesArray[j].Spec_User_Name ,
						})
					}
					// this.getDataOfSpec[i]
				}
				// item.SurgC_SpecilitiesList[i]
			}
			this.newArray = this.getDataOfSpec
			// if(item.SurgC_SpecilitiesList){
				// 	this.getSpecialtiesArray  = item.SurgC_SpecilitiesList
				// }else{
					// 	this.getSpecialtiesArray = this.getSpecialtiesArray
					// }
					console.log(this.form.value)

				}

				getSurgeryCenterList(){
					$('#surgery_office_abcd').DataTable().destroy();
					this.showLoader = true
					var obj = {
						Slug: this.mySlug
					}
					this.UserService.getSurgeryCenterList(obj).subscribe((data)=>{
						console.log(data)
						this.getSurgeryArray = data.DataList
						this.ref.detectChanges();
						// $(document).ready(function() {
							// 	setTimeout(function(){
								// 		$('#surgery_office_abcd').DataTable();
								// 	}, 1000);
								// } );
								this.dtTrigger.next();
								this.hideShow()
								this.showLoader = false
							},err=>{
								console.log(err)
							})

				}
				UpdateStatus(list, evt){

					var obj = {
						SurgC_Unique_ID : list.SurgC_Unique_ID,
						SurgC_Modify_Date : new Date(),
						SurgC_Is_Active :evt.checked,
						SurgC_TimeZone: this.admin.UM_TimeZone,
						Project_ID  : this.admin.Project_ID,
						Slug: this.mySlug
					}

					console.log(obj)
					// this.showLoader = true
					this.UserService.updateSurgeryStatus(obj).subscribe((data)=>{
						console.log(data)
						// this.showLoader = false
						// this.ngOnInit()
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
					// $('[data-toggle="tooltip"]').tooltip();
				}



				loadTimeZoneList(){   
					let select = document.getElementById("dropdownTimeZone");
					select.innerHTML = ""; 
					let browserTimeZone = moment.tz.guess();
					let timeZones = moment.tz.names();
					timeZones.forEach((timeZone) =>{
						var option = document.createElement("option");      
						option.textContent = `${timeZone} (GMT${moment.tz(timeZone).format('Z')})`; 
						option.value = timeZone;
						if (timeZone == browserTimeZone){
							option.selected = true;
						}
						select.appendChild(option);
					});
				}

				loadDefaultDateTime(){
					// document.getElementById('pickerDateTime').value = moment().format('YYYY-MM-DDTHH:mm');
					var inputValue = (<HTMLInputElement>document.getElementById('newpickerDateTime')).value = moment().format('YYYY-MM-DDTHH:mm');
				}


				formatDate(momentDate){
					const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss Z'; 
					return momentDate.format(DEFAULT_FORMAT);
				}

				getUtcValue(localDateTime){
					return moment(localDateTime).utc();
				}

				getSelectedValue(localDateTime, timeZone)
				{
					// alert(moment.tz(localDateTime,timeZone))
					return moment.tz(localDateTime,timeZone);
				}

				getSelectedUTCValue(localDateTime, timeZone)
				{
					return moment.tz(localDateTime,timeZone).utc();
				}
				submitDate(){

					// let localValue = $('#pickerDateTime').value;
					let localValue =  (<HTMLInputElement>document.getElementById('newpickerDateTime')).value 
					let timeZoneValue =  (<HTMLInputElement>document.getElementById('dropdownTimeZone')).value 
					var text = $("#dropdownTimeZone option:selected").text();
					this.getSurgryeTimeZone = text
					// console.log('date', $(".newoickerdate").val() ,'my id-',timeZoneValue)
					// let timeZoneValue = $("#dropdownTimeZone").value;

					let local =  document.getElementById('divLocal');
					// local.innerHTML = this.formatDate(moment(localValue));

					let utc =  document.getElementById('divUTC');
					// utc.innerHTML = this.formatDate(this.getUtcValue(localValue));

					let selected =  document.getElementById('divSelected');
					// selected.innerHTML = this.formatDate(this.getSelectedValue(localValue,timeZoneValue));
					this.getSelectedTimeZone = this.formatDate(this.getSelectedValue(localValue,timeZoneValue));
					console.log(this.getSelectedTimeZone)

					let utcSelected =  document.getElementById('divUTCSelected');
					// utcSelected.innerHTML = this.formatDate(this.getSelectedUTCValue(localValue,timeZoneValue));
				}
				getSpecialties(){
					var obj = {
						Slug: this.mySlug
					}
					this.UserService.getSpecialtiesFilter(obj).subscribe((data)=>{
						console.log(data)
						this.getSpecialtiesArray = data.DataList
						this.getSpecialtiesArray.sort((a,b)=> a.Spec_Name.localeCompare(b.Spec_Name) )

						// this.ngOnInit()
					},err=>{
						console.log(err)
					})
				}


				goSettings(data){
					console.log(data)
					// this.router.navigate(['/surgery-center-settings'], { queryParams: { order: data } });
					this.router.navigate(['/surgery-center-settings'], { queryParams: { Surgery:data.SurgC_DBA_Name } });
				}


				reset(){
					this.form.reset()
					this.form.get('SurgC_Country').setValue('country');
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

					console.log(this.isDelete)
					var obj = {
						SurgC_Unique_ID : this.isDelete.SurgC_Unique_ID,
						SurgC_Modify_Date : new Date(),
						SurgC_Is_Deleted : true,
						SurgC_TimeZone: this.isDelete.SurgC_TimeZone,
						Project_ID  : this.admin.Project_ID,
						Slug: this.mySlug
					}

					this.UserService.deleteSurgeryStatus(obj).subscribe((data)=>{
						console.log(data)
						this.ngOnInit()
					},err=>{
						console.log(err)
					})
					$("#trash").modal("hide");
					$('body').removeClass('modal-open');
				}
				revertData(){

					console.log(this.isDelete)
					var obj = {
						SurgC_Unique_ID : this.isDelete.SurgC_Unique_ID,
						SurgC_Modify_Date : new Date(),
						SurgC_Is_Deleted : false,
						SurgC_TimeZone: this.isDelete.SurgC_TimeZone,
						Project_ID  : this.admin.Project_ID,
						Slug: this.mySlug
					}

					this.UserService.deleteSurgeryStatus(obj).subscribe((data)=>{
						console.log(data)
						this.ngOnInit()
					},err=>{
						console.log(err)
					})
					$("#revertDelete").modal("hide");
					$('body').removeClass('modal-open');
				}

				viewDeletedRdcs(){
					this.getSurgeryDeletedList()
					$(".view-delete-button").show();
					$(".hide-from").hide();
					$(".view-button").hide();
					$(".add-table").hide();
					$(".add-button").hide();
					$(".view-deleted").show();
					$("#again-Back").show();
					// $(document).ready(function() {
						// 	setTimeout(function(){
							// 		$('#surgery_deleted_rc_new').DataTable();
							// 	}, 100);
							// } );
							// this.dtTrigger1.next();

						}
						getSurgeryDeletedList(){
							$('#surgery_deleted_rc_new').DataTable().destroy();
							this.showLoader = true
							var obj = {
								Slug: this.mySlug
							}
							this.UserService.getSurgeryDeletedList(obj).subscribe((data)=>{
								this.getDeletedSurgeryArray =data.DataList
								// $(document).ready(function() {
									// 	setTimeout(function(){
										// 		$('#surgery_deleted_rc_new').DataTable();
										// 	}, 1000);
										// } );
										this.dtTrigger1.next();
										this.showLoader = false
									},err=>{
										console.log(err)
									})
						}

						handleAddressChange(address) {
							console.log(address)
							var addresss
							var state
							var city
							var zipcodes
							var street = ''
							var country = ''
							this.form.value.SurgC_Address = $('#addrs1').val()
							for (var i = 0; i < address.address_components.length; i++) {
								for (var j = 0; j < address.address_components[i].types.length; j++) {
									if(address.address_components[i].types[j] =='locality' || address.address_components[i].types[j] =='sublocality'){
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
							this.form.get('SurgC_City').setValue(city);
							this.form.get('SurgC_State').setValue(state);
							this.form.get('SurgC_Zip').setValue(zipcodes);
							this.form.get('SurgC_Country').setValue(country);
							this.form.get('SurgC_Address').setValue(street+', '+addresss)
							this.form.value.SurgC_Address = street+', '+addresss

						}
						UploadJSONFile(evt){
							// console.log(evt.target.files[0])
							if (evt.target.files[0].type == "application/json") {
								// console.log('im in if')
								this.getJsonUploadfile = evt.target.files[0]
							}else{
								this.toster.warning('File must be JSON type', 'Warning')
							}
						}
						saveDBSettings(){
							if(!this.getSurgeryUniqueId){
								this.toster.error('Please add surgery center first', 'Error')
								return
							}
							if(!this.projectId){
								this.toster.warning('Please Enter Project Id', 'Warning')
								return
							}
							var data = new FormData();
							var file1 = this.getJsonUploadfile
							// console.log(this.getJsonUploadfile)
							data.append('file',file1);

							var objArr = [];
							objArr.push({"SurgC_Unique_ID":this.getSurgeryUniqueId,            
								"SurgC_Create_Date" : new Date(),
								"SurgC_Modify_Date" : new Date(),
								"SurgC_TimeZone":this.admin.UM_TimeZone,
								"SurgC_Project_ID" : "Test",
								"SurgC_Created_By" : this.admin.UM_Unique_ID,
								"SurgC_User_Name" : this.admin.UM_Username
							});          
							var newthis = this  
							data.append('objArr', JSON.stringify(objArr));            
							$.ajax({
								type: "POST",
								url: environment1.endPoint+"SurgeryCenter/DBSetup",
								// url: "https://localhost:44357/api/SurgeryCenter/Create",
								processData: false,
								contentType: false,
								data: data,

								success: function (response) {
									newthis.toster.success('Data successfully uploaded', 'Success')
									newthis.ngOnInit()
								},
								failure: function (response) {

									alert(response.responseText);
								},
								error: function (response) {

									alert(response.responseText);
								}
							});

						}
						checkEmail(eml){
							var obj = {
								UM_Email: eml
							}
							console.log(obj)
							this.UserService.checkEmail(obj).subscribe((data)=>{
								console.log(data)
								if(data.Result == false){
									this.checkEmailAddress = false
									this.toster.error(this.translate.instant('Email Address already exist'), this.translate.instant('Error'))
								}else{
									this.checkEmailAddress = true
									this.toster.success(this.translate.instant('Email Address available'), this.translate.instant('Success'))
								}

							},err=>{
								console.log(err)
							})

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
								});// return this.value
							});

						}
						onChange(category, isChecked: boolean) {
							console.log(category)
							// this.lead_category1  = this.getIdOfLeadCat
							if(isChecked) {
								this.newArray.push({
									// Spec_Name:category.Spec_Name,
									// Spec_Unique_ID: category.Spec_Unique_ID,
									// Spec_Is_Needed: true
									Project_ID: category.Project_ID ,
									Spec_CB_Name: category.Spec_CB_Name ,
									Spec_Create_By: category.Spec_Create_By ,
									Spec_Create_By_Type: category.Spec_Create_By_Type ,
									Spec_Create_Date: category.Spec_Create_Date ,
									Spec_Description: category.Spec_Description ,
									Spec_Is_Active: category.Spec_Is_Active ,
									Spec_Is_Deleted: category.Spec_Is_Deleted ,
									Spec_Modify_Date: category.Spec_Modify_Date ,
									Spec_Name: category.Spec_Name ,
									Spec_Select: category.Spec_Select ,
									Spec_TimeZone: category.Spec_TimeZone ,
									Spec_Type: category.Spec_Type ,
									Spec_Unique_ID: category.Spec_Unique_ID ,
									Spec_User_Name: category.Spec_User_Name ,
								});
							} else {
								var index = this.newArray.findIndex(x => x.Spec_Unique_ID == category.Spec_Unique_ID);
								console.log(index)
								this.newArray.splice(index,1);
							}		
							console.log(this.newArray)
						}
						isSelected(topic){
							if(this.trysomeing){
								return this.trysomeing.indexOf(topic.Spec_Name) >= 0;

							}
						}
						randomString(length, chars) {
							var result = '';
							for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
								return result;
						}

					}
