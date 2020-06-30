import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
	selector: 'app-edit-physician-office',
	templateUrl: './edit-physician-office.component.html',
	styleUrls: ['./edit-physician-office.component.css']
})
export class EditPhysicianOfficeComponent implements OnInit {
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
	physicianUniqueId
	checkEmailAddress
	getphysicianDetails
	activeStatus
	saveSpecsCheckBox
	getIdOfspecs
	trysomeing
	mySlug
	dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.physicianUniqueId = route.snapshot.params.id;
		console.log(this.physicianUniqueId)
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

		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Edit Physicain Center - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Edit Physicain Center - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Edit Physicain Center - The Cloud Health')
		}
		this.getSiteLink = environment1.siteLink
		this.getUniqueid = ''
		this.getSpecialtiesArray =[]
		this.getIdOfspecs = []
		this.saveSpecsCheckBox = []
		this.getSpecialties()
		this.form = new FormGroup({

			PhyO_Address: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PhyO_Country: new FormControl('',[Validators.required]),
			PhyO_State: new FormControl('',[Validators.required]),
			PhyO_City: new FormControl('',[Validators.required]),
			PhyO_MobileNo: new FormControl('',[Validators.required]),
			PhyO_DBA_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PhyO_Website_URL: new FormControl('',[Validators.required]),
			PhyO_Zip: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			PhyO_Address2:new FormControl(''),
			PhyO_Email:new FormControl({value: '', disabled: true} ,[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
			PhyO_FaxNo:new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			PhyO_Name:new FormControl(''),

		});
		this.getPhysicianArray = []
		this.getDeletedPhysicianArray = []
		this.getSingleDataList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
	}
	getSingleDataList(){
		var obj = {
			Slug: this.mySlug,
			PhyO_Unique_ID:this.physicianUniqueId
		}
		this.UserService.getPhysicianSetting(obj).subscribe((data)=>{
			console.log(data)
			this.getphysicianDetails = data.Data
			this.form.get('PhyO_Address').setValue(data.Data.PhyO_Address);
			this.form.get('PhyO_Address2').setValue(data.Data.PhyO_Address2);
			this.form.get('PhyO_Country').setValue(data.Data.PhyO_Country);
			this.form.get('PhyO_State' ).setValue(data.Data.PhyO_State);
			this.form.get('PhyO_City').setValue(data.Data.PhyO_City);
			this.form.get('PhyO_MobileNo' ).setValue(data.Data.PhyO_MobileNo);
			this.form.get('PhyO_DBA_Name').setValue(data.Data.PhyO_DBA_Name);
			this.form.get('PhyO_Website_URL' ).setValue(data.Data.PhyO_Website_URL);
			this.form.get('PhyO_Zip').setValue(data.Data.PhyO_Zip);
			this.form.get('PhyO_Name').setValue(data.Data.PhyO_Name);
			this.form.get('PhyO_Email').setValue(data.Data.PhyO_Email);
			this.form.get('PhyO_FaxNo').setValue(data.Data.PhyO_FaxNo);
			this.getcreatedAt = data.Data.PhyO_Create_Date
			// this.getSpecialtiesArray  = data.Data.PhyO_SpecilitiesList
			this.getThePhySurId = data.Data.UM_Surgary_Physician_CenterID
			this.activeStatus =  data.Data.PhyO_Is_Active
			if(data.Data.PhyO_SpecilitiesList){

				this.trysomeing= []
				for (var i = 0; i < data.Data.PhyO_SpecilitiesList.length; i++) {
					for (var j = 0; j < this.getSpecialtiesArray.length; j++) {
						if(data.Data.PhyO_SpecilitiesList[i].Spec_Unique_ID == this.getSpecialtiesArray[j].Spec_Unique_ID){
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
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.location.back()
	}

	addPhysicianForm(){
		this.showLoader = true
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.form.value.PhyO_Address = this.form.value.PhyO_Address
		this.form.value.PhyO_Unique_ID = this.physicianUniqueId
		this.form.value.PhyO_Create_Date = this.getcreatedAt
		this.form.value.PhyO_Physician_Center_ID = this.admin.UM_Unique_ID
		this.form.value.PhyO_Created_By = this.admin.UM_Unique_ID
		this.form.value.PhyO_Modify_Date  = new Date()
		this.form.value.PhyO_Is_Active = this.activeStatus
		this.form.value.PhyO_TimeZone = this.admin.UM_TimeZone	
		// this.form.value.PhyO_Surgery_Center_ID = this.admin.UM_Surgary_Physician_CenterID
		this.form.value.UM_Surgary_Physician_CenterID = this.getThePhySurId
		this.form.value.Project_ID = this.admin.Project_ID
		this.form.value.PhyO_SpecilitiesList  = this.saveSpecsCheckBox
		this.UserService.updatePhysicianMaster(this.form.value).subscribe((data)=>{
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
		this.form.get('PhyO_Country').setValue('country');
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
