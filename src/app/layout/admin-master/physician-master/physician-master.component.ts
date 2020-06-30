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
	selector: 'app-physician-master',
	templateUrl: './physician-master.component.html',
	styleUrls: ['./physician-master.component.css']
})
export class PhysicianMasterComponent implements OnInit {
	getPhysicianForm
	admin
	getPhysicianArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	getSelectedTimeZone
	getSpecialtiesArray
	editAllspecs
	Spec_Select = []
	getDeletedPhysicianArray
	isDelete
	getSiteLink
	getThePhySurId
	setAccToSurgery
	options = {
		componentRestrictions: { country: 'USA' }
	}
	checkEmailAddress
	newArray
	trysomeing
	getDataOfSpec
	mySlug
	randomPasssowrd
	adminUserID
	getActiveationEmail
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService,  private location: Location, private title: Title, private translate: TranslateService, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
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
				this.title.setTitle('Physician Office - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Physician Office - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Physician Office - The Cloud Health')
		}
		this.getSiteLink = environment1.siteLink
		this.getUniqueid = ''
		this.getSpecialtiesArray =[]
		this.hideShow()
		$(".required").after("<span class='text-danger' style='float:right;color:red;'>*</span>");
		this.form = new FormGroup({

			PhyO_Address: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PhyO_Country: new FormControl('',[Validators.required]),
			PhyO_State: new FormControl('',[Validators.required]),
			PhyO_City: new FormControl('',[Validators.required]),
			PhyO_MobileNo: new FormControl('',[Validators.required]),
			PhyO_DBA_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PhyO_Website_URL: new FormControl('',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
			PhyO_Zip: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			PhyO_Address2:new FormControl(''),
			PhyO_Email:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
			PhyO_FaxNo:new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			PhyO_Name:new FormControl('',[Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),

		});
		this.getPhysicianArray = []

		this.getgetPhysicianCenterList()
		this.getSpecialties()
		this.getPhysicianForm = {}

		
		this.loadDefaultDateTime();
		this.loadTimeZoneList();  
		this.submitDate();
		this.getDeletedPhysicianArray = []
		this.validatphone()
		this.sysEmail()
		this.trysomeing = []
		this.getDataOfSpec = []
		this.newArray = []
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}

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
			console.log(data)
			this.getActiveationEmail = data.Data

		},err=>{
			console.log(err)
		})

	}

	addPhysicianForm(){
		this.showLoader = true
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log('im in update')
			this.form.value.PhyO_Address = this.form.value.PhyO_Address
			this.form.value.PhyO_Unique_ID = this.getUniqueid
			this.form.value.PhyO_Create_Date = this.getcreatedAt
			this.form.value.PhyO_Physician_Center_ID = this.admin.UM_Unique_ID
			this.form.value.PhyO_Created_By = this.admin.UM_Unique_ID
			this.form.value.PhyO_Modify_Date = this.getSelectedTimeZone
			this.form.value.PhyO_Is_Active = true
			this.form.value.PhyO_TimeZone = this.admin.UM_TimeZone	
			// this.form.value.PhyO_Surgery_Center_ID = this.admin.UM_Surgary_Physician_CenterID
			this.form.value.UM_Surgary_Physician_CenterID = this.getThePhySurId
			this.form.value.Project_ID = this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.form.value.PhyO_SpecilitiesList = this.newArray
			
			console.log(this.form.value)
			this.UserService.updatePhysicianMaster(this.form.value).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.showLoader = true
			if(this.checkEmailAddress == false){
				this.toster.error(this.translate.instant('Email address alredy exist'), this.translate.instant('Error'))
				return
				// this.form.value.Staff_Email
			}
			this.form.value.PhyO_Address = this.form.value.PhyO_Address
			this.form.value.PhyO_Created_By  = this.admin.UM_Unique_ID,
			this.form.value.PhyO_User_Name  = this.admin.UM_Username,
			this.form.value.PhyO_Create_Date  = this.getSelectedTimeZone,
			this.form.value.PhyO_Created_By_Type = this.admin.UM_Office_Type
			this.form.value.PhyO_Modify_Date  = this.getSelectedTimeZone,
			this.form.value.PhyO_Surgery_Center_ID = this.admin.UM_Surgary_Physician_CenterID
			this.form.value.PhyO_Is_Active = true
			this.form.value.PhyO_Physician_Center_ID = this.admin.UM_Unique_ID
			this.form.value.PhyO_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID = this.admin.Project_ID	
			this.form.value.Slug = this.mySlug
			this.form.value.PhyO_SpecilitiesList = this.newArray

			console.log(this.form.value)
			this.UserService.addPhysicianMaster(this.form.value).subscribe((data)=>{
				console.log(data)
				this.randomPasssowrd =  this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
				if(data.Data.PhyO_Unique_ID){
					var addUserData = {
						UM_Member_ID:data.Data.Staff_Unique_ID,
						UM_Username: this.form.value.PhyO_DBA_Name,
						UM_Password: this.randomPasssowrd,
						UM_Email: this.form.value.PhyO_Email,
						UM_PhoneNo: this.form.value.PhyO_MobileNo,
						UM_Surgary_Physician_CenterID: data.Data.PhyO_Unique_ID,
						UM_Office_Type: 'P',
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
							this.adminUserID = addUserData.Data.UM_Unique_ID
							return user;
						}),
						mergeMap( user =>  this.UserService.addPermissionWhenUserCreeate({User_ID:this.adminUserID, Slug: this.mySlug, })),take(1)
						).subscribe( patientData => {
							console.log(patientData.Data)
							this.showLoader = false
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
		this.showLoader = true
		var Sms = {   
			Receiver_Contact_No:'+'   + this.form.value.PhyO_MobileNo,
			Message_Body: 'Your Email is : ' + this.form.value.PhyO_Email + ' and passcode is : ' 
			+ this.randomPasssowrd,
			Message_Date:new Date(),
			Message_Title: 'Login Credential'
		}
		console.log(Sms)
		this.UserService.sendsms(Sms).subscribe((SMSResponse)=>{
			console.log('Response :' +  JSON.stringify(SMSResponse))

			
		},err=>{
			console.log(err)
		})  

		//Email Section
		// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.form.value.PhyO_DBA_Name);
		// this.getActiveationEmail.SET_Name = this.getActiveationEmail.SET_Message.replace("<physician center name>", this.form.value.PhyO_DBA_Name);
		// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.admin.UM_Username);
		// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>emailaddress</strong>", "<strong>"+ this.form.value.PhyO_Email+" </strong>");
		// this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>password</strong>", "<strong>"+ this.randomPasssowrd+" </strong>");

		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Firstname", this.form.value.PhyO_DBA_Name);
		this.getActiveationEmail.SET_Name = this.getActiveationEmail.SET_Name.replace("<physician center name>", this.form.value.PhyO_DBA_Name);
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.admin.UM_Username);
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>emailaddress</strong>", "<strong>"+ this.form.value.PhyO_Email+" </strong>");
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("<strong>password</strong>", "<strong>"+ this.randomPasssowrd+" </strong>");
		this.getActiveationEmail.SET_Message = this.getActiveationEmail.SET_Message.replace("Physician office name", this.admin.UM_Username);

		var tomail = []
		tomail.push(this.form.value.PhyO_Email)
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
				// "<p>Your Email is : " + this.form.value.PhyO_Email + 
		// " and passcode is : " + this.randomPasssowrd + "</p>";

		console.log(Email)

		this.UserService.sendemail(Email).subscribe((data2)=>{
			console.log(data2)
			this.toster.success(this.translate.instant('Your account has been created, please check you mail'), this.translate.instant('Success'))
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		this.showLoader = false
	}
	editPhysician(item){

		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.PhyO_Unique_ID
		this.getcreatedAt = item.PhyO_Create_Date
		this.getThePhySurId = item.UM_Surgary_Physician_CenterID
		this.form.get('PhyO_Address').setValue(item.PhyO_Address);
		this.form.get('PhyO_Address2').setValue(item.PhyO_Address2);
		this.form.get('PhyO_Country').setValue(item.PhyO_Country);
		this.form.get('PhyO_State' ).setValue(item.PhyO_State);
		this.form.get('PhyO_City').setValue(item.PhyO_City);
		this.form.get('PhyO_MobileNo' ).setValue(item.PhyO_MobileNo);
		this.form.get('PhyO_DBA_Name').setValue(item.PhyO_DBA_Name);
		this.form.get('PhyO_Website_URL' ).setValue(item.PhyO_Website_URL);
		this.form.get('PhyO_Zip').setValue(item.PhyO_Zip);
		this.form.get('PhyO_DBA_Name').setValue(item.PhyO_DBA_Name);
		this.form.get('PhyO_Email').setValue(item.PhyO_Email);
		this.form.get('PhyO_FaxNo').setValue(item.PhyO_FaxNo);
		this.form.get('PhyO_Name').setValue(item.PhyO_Name);

		
		// for (var i = 0; i < item.PhyO_SpecilitiesList.length; i++) {
			// 	this.form.get('Spec_Select').setValue(item.PhyO_SpecilitiesList[i].Spec_Select);
			// }
			if(item.PhyO_SpecilitiesList){
				for (var i = 0; i < item.PhyO_SpecilitiesList.length; i++) {
					for (var j = 0; j < this.getSpecialtiesArray.length; j++) {
						if(this.getSpecialtiesArray[j].Spec_Unique_ID == item.PhyO_SpecilitiesList[i].Spec_Unique_ID){
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
					// item.PhyO_SpecilitiesList[i]
				}
			}
			this.newArray = this.getDataOfSpec

		}

		getgetPhysicianCenterList(){
			$('#Physician_office').DataTable().destroy();
			this.showLoader = true
			console.log(this.admin)
			var obj = {
				Slug: this.mySlug
			}
			if(this.admin.UM_Office_Type == 'A'){
				this.UserService.getPhysicianCenterList(obj).subscribe((data)=>{
					console.log(data)
					this.getPhysicianArray = data.DataList
					this.ref.detectChanges();
					this.dtTrigger.next();
					this.hideShow()
					this.showLoader = false
				},err=>{
					console.log(err)
				})
			}else{
				var obj1 = {
					Slug: this.mySlug,
					PhyO_Surgery_Center_ID:this.admin.UM_Surgary_Physician_CenterID
				}
				$('#Physician_office').DataTable().destroy();
				this.UserService.filterPhyWithSC(obj1).subscribe((data)=>{
					console.log(data)
					this.getPhysicianArray = data.DataList
					this.ref.detectChanges();
					this.dtTrigger.next();
					this.hideShow()
					this.showLoader = false
				},err=>{
					console.log(err)
				})
			}

		}
		UpdateStatus(list, evt){

			var obj = {
				PhyO_Unique_ID : list.PhyO_Unique_ID,
				PhyO_Modify_Date : new Date(),
				PhyO_Is_Active : evt.checked,
				PhyO_TimeZone: list.PhyO_TimeZone,
				Project_ID : this.admin.Project_ID,
				Slug: this.mySlug
			}
			console.log(obj)
			this.showLoader = true
			this.UserService.updatePhysicianStatus(obj).subscribe((data)=>{
				console.log(data)
				this.showLoader = false
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
			var inputValue = (<HTMLInputElement>document.getElementById('pickerDateTime')).value = moment().format('YYYY-MM-DDTHH:mm');
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
			let localValue =  (<HTMLInputElement>document.getElementById('pickerDateTime')).value 
			let timeZoneValue =  (<HTMLInputElement>document.getElementById('dropdownTimeZone')).value 
			let local =  document.getElementById('divLocal');
			let utc =  document.getElementById('divUTC');
			let selected =  document.getElementById('divSelected');
			this.getSelectedTimeZone = this.formatDate(this.getSelectedValue(localValue,timeZoneValue));
			console.log(this.getSelectedTimeZone)
			let utcSelected =  document.getElementById('divUTCSelected');
		}
		getSpecialties(){
			var obj = {
				Slug: this.mySlug
			}
			this.UserService.getSpecialtiesFilter(obj).subscribe((data)=>{
				console.log(data)
				this.getSpecialtiesArray = data.DataList
				this.getSpecialtiesArray.sort((a,b)=> a.Spec_Name.localeCompare(b.Spec_Name) )
			},err=>{
				console.log(err)
			})
		}

		selectSpec(ID)	{
			var checkBox = $("#chk_" + ID);
			var hiddenfield = $("#hf_" + ID);
			if (checkBox.prop("checked") == true){
				// debugger;
				hiddenfield.val("true");		    
			} else {
				// debugger;
				hiddenfield.val("false");		    
			}
			this.finalSubmitData()
		}

		finalSubmitData(){
			var ObjectArray = [];
			this.form.value.PhyO_SpecilitiesList = []
			// ObjectArray.push(obj)

			var oTable = $('.newtableHaiye');
			var rowLength = $('.newtableHaiye').length;

			//loops through rows    
			for (var i = 0; i < rowLength; i++){


				// debugger
				var test:any = {};
				// debugger
				var cell0=$('#hf_' + i + '0');
				var cell1=$('#hf_' + i + '1');
				var cell2=$('#hf_' + i + '2');
				var cell3=$('#hf_' + i + '3');
				var cell4=$('#hf_' + i + '4');
				var cell5=$('#hf_' + i + '5');
				var cell6=$('#hf_' + i + '6');
				var cell7=$('#hf_' + i + '7');
				var cell8=$('#hf_' + i + '8');
				var cell9=$('#hf_' + i + '9');
				var cell12=$('#hf_' + i + '12');
				var cell11=$('#hf_' + i + '11');

				// console.log(cell0.val())
				test.Spec_Select=cell0.val();
				test.Spec_Unique_ID=cell1.val();
				test.Spec_Name=cell2.val();	
				test.Spec_Type =cell3.val();	
				test.Spec_Description =cell4.val();	
				test.Spec_Create_By =cell5.val();	
				test.Spec_Create_By_Type =cell6.val();	
				test.Spec_User_Name =cell7.val();	
				test.Spec_Is_Active =cell8.val();	
				test.Spec_Is_Deleted =cell9.val();	
				test.Spec_Create_Date =cell12.val();	
				test.Spec_Modify_Date =cell11.val();
				this.form.value.PhyO_SpecilitiesList.push(test)	
				// console.log(test.Spec_Select)
				//PhyO_SpecilitiesList
			}
		}
		goSettings(data){
			console.log(data)
			// this.router.navigate(['/getPhysician-center-settings'], { queryParams: { order: data } });
			this.router.navigate(['/physician-center-settings'], { queryParams: { getPhysician:data.PhyO_DBA_Name } });
		}
		reset(){
			this.form.reset()
			this.form.get('PhyO_Country').setValue('country');
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
				PhyO_Unique_ID : this.isDelete.PhyO_Unique_ID,
				PhyO_Modify_Date : new Date(),
				PhyO_Is_Deleted : true,
				PhyO_TimeZone: this.isDelete.PhyO_TimeZone,
				Project_ID : this.admin.Project_ID,
				Slug: this.mySlug
			}

			this.UserService.deletePhysicianStatus(obj).subscribe((data)=>{
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
				PhyO_Unique_ID : this.isDelete.PhyO_Unique_ID,
				PhyO_Modify_Date : new Date(),
				PhyO_Is_Deleted : false,
				PhyO_TimeZone: this.isDelete.PhyO_TimeZone,
				Project_ID : this.admin.Project_ID,
				Slug: this.mySlug
			}

			this.UserService.deletePhysicianStatus(obj).subscribe((data)=>{
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
			// this.dtTrigger1.next();

		}
		getSurgeryDeletedList(){
			this.showLoader = true
			$('#phy_deleted_rc_new').DataTable().destroy();
			var obj = {
				Slug: this.mySlug
			}
			this.UserService.getPhysicainDeletedList(obj).subscribe((data)=>{
				this.getDeletedPhysicianArray =data.DataList
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
			this.form.get('PhyO_City').setValue(city);
			this.form.get('PhyO_State').setValue(state);
			this.form.get('PhyO_Zip').setValue(zipcodes);
			this.form.get('PhyO_Country').setValue(country);
			this.form.get('PhyO_Address').setValue(street+', '+addresss)
			this.form.value.PhyO_Address = street+', '+addresss

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
				});

			});
		}
		onChange(category, isChecked: boolean) {
			console.log(category)
			// this.lead_category1  = this.getIdOfLeadCat
			if(isChecked) {
				if(this.setAccToSurgery && this.setAccToSurgery.PhyO_Appearance){
					$(".fa-check").css("background-color", this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax+'!important')
				}else if(this.setAccToSurgery && this.setAccToSurgery.SurgC_Appearance){
					$(".fa-check").css("background-color", this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax+'!important')
				}else{
					$(".fa-check").css("background-color", 'green!important')
				}
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
