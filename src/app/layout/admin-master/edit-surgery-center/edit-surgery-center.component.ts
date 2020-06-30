import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

// import * as moment from 'moment';
import * as tz from 'moment-timezone';
declare var moment: any;
declare var $:any
import {environment1} from '../../../../environments/environment.prod';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-edit-surgery-center',
	templateUrl: './edit-surgery-center.component.html',
	styleUrls: ['./edit-surgery-center.component.css']
})
export class EditSurgeryCenterComponent implements OnInit {
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
	SurgeryUniqueId
	getphysicianDetails
	getStatus
	saveSpecsCheckBox
	trysomeing
	getIdOfspecs
	setAccToSurgery
	mySlug
	dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private translate: TranslateService,) { 
		this.SurgeryUniqueId = route.snapshot.params.id;
		console.log(this.SurgeryUniqueId)
		this.form = new FormGroup({
			

			SurgC_Address: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SurgC_Country: new FormControl('',[Validators.required]),
			SurgC_State: new FormControl('',[Validators.required]),
			SurgC_City: new FormControl('',[Validators.required]),
			SurgC_MobileNo: new FormControl('',[Validators.required]),
			SurgC_DBA_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			SurgC_Website_URL: new FormControl('',[Validators.required]),
			SurgC_Zip: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			SurgC_Address2:new FormControl(''),
			SurgC_Email:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
			SurgC_FaxNo:new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			SurgC_Name:new FormControl(''),
		});

	}
	

	ngOnDestroy(): void {
	// Do not forget to unsubscribe the event
	this.dtTrigger.unsubscribe();
}

ngOnInit() {
    this.dtOptions = {
	pagingType: 'full_numbers',
	pageLength: 10
};

		this.getSpecialtiesArray = []
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Edit Surgery Center - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Edit Surgery Center - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Edit Surgery Center - The Cloud Health')
		}
		this.getSiteLink = environment1.siteLink
		this.getUniqueid = ''
		this.getDeletedSurgeryArray = []
		this.getSurgeryArray = []
		this.getIdOfspecs = []
		this.getSpecialties()
		this.ref.detectChanges()
		// this.getSurSingleList()
		this.surgeryForm = {}

		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getusTimeZone = moment().tz("America/New_York").format();
		// console.log(this.getSelectedTimeZone)
		$('#pickerDateTime').val(this.getusTimeZone)
		this.saveSpecsCheckBox  =[]
		this.getSurSingleList()
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
		this.location.back()
		// this.hideShow()
	}
	getSurSingleList(){
		var obj = {
			Slug: this.mySlug,
			SurgC_Unique_ID: this.SurgeryUniqueId
		}
		this.UserService.getSurgerySetting(obj).subscribe((data)=>{
			console.log(data)
			this.getphysicianDetails = data.Data
			this.getcreatedAt = data.Data.SurgC_Create_Date
			this.form.get('SurgC_Address').setValue(data.Data.SurgC_Address);
			// this.form.get('SurgC_AlternateNo' ).setValue(data.Data.SurgC_AlternateNo);
			this.form.get('SurgC_Country').setValue(data.Data.SurgC_Country);
			this.form.get('SurgC_State' ).setValue(data.Data.SurgC_State);
			this.form.get('SurgC_City').setValue(data.Data.SurgC_City);
			this.form.get('SurgC_MobileNo' ).setValue(data.Data.SurgC_MobileNo);
			this.form.get('SurgC_DBA_Name').setValue(data.Data.SurgC_DBA_Name);
			this.form.get('SurgC_Website_URL' ).setValue(data.Data.SurgC_Website_URL);
			this.form.get('SurgC_Zip').setValue(data.Data.SurgC_Zip);
			this.form.get('SurgC_Name').setValue(data.Data.SurgC_Name);
			this.form.get('SurgC_Email').setValue(data.Data.SurgC_Email);
			this.form.get('SurgC_FaxNo').setValue(data.Data.SurgC_FaxNo);
			this.getStatus = data.Data.SurgC_Is_Active
			if(data.Data.SurgC_SpecilitiesList){

				this.trysomeing= []
				for (var i = 0; i < data.Data.SurgC_SpecilitiesList.length; i++) {
					for (var j = 0; j < this.getSpecialtiesArray.length; j++) {
						if(data.Data.SurgC_SpecilitiesList[i].Spec_Unique_ID == this.getSpecialtiesArray[j].Spec_Unique_ID){
							this.trysomeing.push(this.getSpecialtiesArray[j].Spec_Name)
							this.getIdOfspecs.push({
								Spec_Name:this.getSpecialtiesArray[j].Spec_Name,
								Spec_Unique_ID: this.getSpecialtiesArray[j].Spec_Unique_ID,
								Spec_Select: this.getSpecialtiesArray[j].Spec_Select,
								Spec_Type : this.getSpecialtiesArray[j].Spec_Type ,
								Spec_Description : this.getSpecialtiesArray[j].Spec_Description ,
								Spec_Create_By : this.getSpecialtiesArray[j].Spec_Create_By ,
								Spec_Create_By_Type : this.getSpecialtiesArray[j].Spec_Create_By_Type ,
								Spec_User_Name : this.getSpecialtiesArray[j].Spec_User_Name ,
								Spec_Is_Active : this.getSpecialtiesArray[j].Spec_Is_Active ,
								Spec_Is_Deleted : this.getSpecialtiesArray[j].Spec_Is_Deleted ,
								Spec_Create_Date : this.getSpecialtiesArray[j].Spec_Create_Date ,
								Spec_Modify_Date : this.getSpecialtiesArray[j].Spec_Modify_Date ,
							})

						}
					}
				}

			}
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

	addSurgeryForm(){
		this.showLoader = true
		$("#submitbtn").modal("hide"); 
		$('body').removeClass('modal-open');
		console.log('im in update')
		this.form.value.SurgC_Address = this.form.value.SurgC_Address + ' , ' + this.form.value.SurgC_Address2
		this.form.value.SurgC_Unique_ID = this.SurgeryUniqueId
		this.form.value.SurgC_Create_Date = this.getcreatedAt
		// this.form.value.SurgC_Surgery_Center_ID = this.admin.UM_Unique_ID
		this.form.value.SurgC_Created_By = this.admin.UM_Unique_ID
		this.form.value.SurgC_Modify_Date = new Date()
		this.form.value.SurgC_Is_Active = this.getStatus
		this.form.value.SurgC_TimeZone = this.admin.UM_TimeZone
		this.form.value.Project_ID  = this.admin.Project_ID	
		this.form.value.SurgC_SpecilitiesList  = this.saveSpecsCheckBox
		console.log(this.form.value)
		this.UserService.updateSurgeryMaster(this.form.value).subscribe((data)=>{
			console.log(data)
			this.showLoader = false
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
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


	reset(){
		this.form.reset()
		this.form.get('SurgC_Country').setValue('country');
	}

	handleAddressChange(address) {
		console.log(address)
		var city
		var state
		var zipcodes
		var contry
		this.form.value.SurgC_Address = $('#addrs1').val()
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
				if(address.address_components[i].types[j] =='country'){
					contry = address.address_components[i].long_name
				}
			}
		}
		this.form.get('SurgC_Address').setValue($('#addrs1').val());
		this.form.get('SurgC_City').setValue(city);
		this.form.get('SurgC_State').setValue(state);
		this.form.get('SurgC_Zip').setValue(zipcodes);
		this.form.get('SurgC_Country').setValue(contry);

	}
	onChange(category, isChecked: boolean) {
		// this.lead_category1  = this.trysomeing
		this.saveSpecsCheckBox  = this.getIdOfspecs
		console.log()
		if(isChecked) {
			this.saveSpecsCheckBox.push({
				Spec_Name:category.Spec_Name,
				Spec_Unique_ID: category.Spec_Unique_ID,
				Spec_Select: category.Spec_Select,
				Spec_Type : category.Spec_Type ,
				Spec_Description : category.Spec_Description ,
				Spec_Create_By : category.Spec_Create_By ,
				Spec_Create_By_Type : category.Spec_Create_By_Type ,
				Spec_User_Name : category.Spec_User_Name ,
				Spec_Is_Active : category.Spec_Is_Active ,
				Spec_Is_Deleted : category.Spec_Is_Deleted ,
				Spec_Create_Date : category.Spec_Create_Date ,
				Spec_Modify_Date : category.Spec_Modify_Date ,
			});
		} else {
			var index = this.saveSpecsCheckBox.findIndex(x => x.Spec_Unique_ID == category.Spec_Unique_ID);
			console.log(index)
			this.saveSpecsCheckBox.splice(index,1);
		}		
		console.log(this.saveSpecsCheckBox)
	}
	isSelected(topic){
		if(this.trysomeing){
			return this.trysomeing.indexOf(topic.Spec_Name) >= 0;

		}
	}
}
