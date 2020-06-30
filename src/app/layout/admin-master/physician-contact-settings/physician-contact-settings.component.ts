import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
declare var $:any
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-physician-contact-settings',
  templateUrl: './physician-contact-settings.component.html',
  styleUrls: ['./physician-contact-settings.component.css']
})
export class PhysicianContactSettingsComponent implements OnInit {

  reqData
	adminContactationArray
	getUniqueid
	form
	admin
	getContactArray
	getcreatedAt
	showLoader
	isDelete
	getDeletedPCSArray
	surgeryUniqueId
	getSurgeryName
	saveFormData
	setAccToSurgery
	mySlug
	dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute,  private domSanitizer: DomSanitizer) { 
		this.surgeryUniqueId = route.snapshot.params.id;
		console.log(this.surgeryUniqueId)
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

		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Contact Setting - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Contact Setting - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Contact Setting - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getUniqueid = ''
		this.getSurgeryName = ''
		this.hideShow()
		this.form = new FormGroup({
			PCS_Contact_Type: new FormControl('',[Validators.required ]),
			PCS_First_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PCS_Last_Name: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[a-zA-Z0-9 ?%!@#$&()-`.+,/\"]*')]),
			PCS_Phone_No: new FormControl('',[Validators.required, Validators.pattern('^[^ ]+[0-9]*')]),
			PCS_Email: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
		});
		this.form.get('PCS_Contact_Type').setValue('selectType');
		
		this.reqData = {}
		this.getContactArray = []
		this.getRelationList()
	}

	addRelation(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			if(this.form.value.PCS_Contact_Type == 'selectType'){
				this.toster.warning('Please select contact type','Warning')
				return
			}
			console.log(';im in update')
			var MT_PhyO_Contact_Setting = {
				PhyO_Unique_ID: "MFV94371bb1d952df"
			}

			this.form.value.PhyO_Unique_ID= this.surgeryUniqueId
			this.form.value.PCS_Unique_ID = this.getUniqueid
			
			this.form.value.PCS_Is_Active = true
			this.form.value.PCS_Created_By = this.admin.UM_Unique_ID
			
			
			this.form.value.PCS_User_Name = this.admin.UM_Username
			this.form.value.PCS_Is_Deleted = false
			
			var PhyO_ContactSetting =  []
			PhyO_ContactSetting.push(this.form.value)
			var obj = {
				PhyO_Unique_ID:  this.surgeryUniqueId,
				PhyO_ContactSetting:PhyO_ContactSetting
			}
			this.UserService.updatePhysicianSetting(obj).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			if(this.form.value.PCS_Contact_Type == 'selectType'){
				this.toster.warning('Please select contact type','Warning')
				return
			}
			this.form.value.PhyO_Unique_ID= this.surgeryUniqueId
			this.form.value.PCS_Is_Active = true
			this.form.value.PCS_Created_By = this.admin.UM_Unique_ID
			
			
			
			this.form.value.PCS_User_Name = this.admin.UM_Username
			this.form.value.PCS_Is_Deleted = false
			
			// this.form.value.MT_PhyO_Contact_Setting = MT_PhyO_Contact_Setting
			var PhyO_ContactSetting =  []
			PhyO_ContactSetting.push(this.form.value)
			var obj = {
				PhyO_Unique_ID:  this.surgeryUniqueId,
				PhyO_ContactSetting:PhyO_ContactSetting
			}
			console.log(obj)
			// return
			this.UserService.addPhysicianSetting(obj).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				// this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editRelationList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.PCS_Unique_ID
		
		this.form.get('PCS_Name').setValue(item.PCS_Name);
	}

	getRelationList(){
		this.hideShow()
		this.showLoader = true
		$('#nationality').dataTable().fnDestroy();
		var obj  ={
			Slug: this.mySlug,
			PhyO_Unique_ID: this.surgeryUniqueId

		}
		this.UserService.getSinglePhysicianOffice(obj).subscribe((data)=>{
			console.log(data)
			this.getContactArray = data.Data
			this.getSurgeryName = data.Data.PhyO_DBA_Name
			console.log(this.getContactArray)
			$(document).ready(function() {
				setTimeout(function(){
					$('#nationality').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		console.log(list)

		var obj = {
			PCS_Created_By : list.PCS_Created_By,
			
			PCS_Is_Active : evt.checked,
			
			PCS_Contact_Type:  list.PCS_Contact_Type,
			PCS_First_Name : list.PCS_First_Name,
			PCS_Last_Name : list.PCS_Last_Name,
			PCS_Phone_No : list.PCS_Phone_No,
			PCS_Email : list.PCS_Email,
			PCS_Unique_ID : list.PCS_Unique_ID,
			
			PCS_User_Name : list.PCS_User_Name,
			PCS_Is_Deleted : list.PCS_Is_Deleted,
			
		}

		var PhyO_ContactSetting =  []
			PhyO_ContactSetting.push(obj)
			var newobj = {
				PhyO_Unique_ID:  this.surgeryUniqueId,
				PhyO_ContactSetting:PhyO_ContactSetting
			}
		console.log(obj)
		this.UserService.updatePhysicianSetting(newobj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
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
				$(".hide-from").hide();
			});
		});
		// $('[data-toggle="tooltip"]').tooltip();
	}
	viewDeletedRdcs(){
		this.getRelationDeletedList()
		$(".view-delete-button").show();
		$(".hide-from").hide();
		$(".view-button").hide();
		$(".add-table").hide();
		$(".add-button").hide();
		$(".view-deleted").show();
		$("#again-Back").show();
		$(document).ready(function() {
			setTimeout(function(){
				$('#PCS_deleted_rc').DataTable();
			}, 100);
		} );
		
	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
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
			PCS_Unique_ID : this.isDelete.PCS_Unique_ID,
		}
		var PhyO_ContactSetting =  []
			PhyO_ContactSetting.push(obj)
			var newobj = {
				PhyO_Unique_ID:  this.surgeryUniqueId,
				PhyO_ContactSetting:PhyO_ContactSetting
			}
			console.log(newobj)

		this.UserService.updatePhysicianSetting(newobj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}
	revertData(){
		
		var obj = {
			PCS_Contact_Type : this.isDelete.PCS_Contact_Type,
			PCS_First_Name : this.isDelete.PCS_First_Name,
			PCS_Last_Name : this.isDelete.PCS_Last_Name,
			PCS_Phone_No : this.isDelete.PCS_Phone_No,
			PCS_Email : this.isDelete.PCS_Email,
			PCS_Created_By : this.isDelete.PCS_Created_By,
			
			PCS_Is_Active :  this.isDelete.PCS_Is_Active,
			
			PCS_Unique_ID : this.isDelete.PCS_Unique_ID,
			PCS_User_Name : this.isDelete.PCS_User_Name,
			
			PCS_Is_Deleted: false,
			
		}
		var PhyO_ContactSetting =  []
			PhyO_ContactSetting.push(obj)
			var newobj = {
				PhyO_Unique_ID:  this.surgeryUniqueId,
				PhyO_ContactSetting:PhyO_ContactSetting
			}
		this.UserService.updatePhysicianSetting(newobj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getRelationDeletedList(){
		this.showLoader = true
		$('#PCS_deleted_rc').dataTable().fnDestroy();
		this.UserService.getPhysicianSetting(this.surgeryUniqueId).subscribe((data)=>{
			this.getDeletedPCSArray =data
			$(document).ready(function() {
				setTimeout(function(){
					$('#PCS_deleted_rc').DataTable();
				}, 100);
			} );
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	onuploadFiles(event){
		console.log("KKKKKKKKKKKKKKKKKKKKKK")
		const file = event.target.files[0];
		var fileType = file.type.split('/')[0]
		var updatedType
		// if(type == 'song'){
		// 	if(fileType != 'audio'){
		// 		this.toastr.error('You can upload audio only!', 'Oops!');
		// 		return;
		// 	}
		// }else if (type == 'threeImage'){
		// 	if (file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'image/jpg') {
		// 		this.toastr.error('You can upload image only!', 'Oops!');
		// 		return;
		// 	}
		// }else if (type == 'video'){
		// 	if(fileType != 'video'){
		// 		this.toastr.error('You can upload video only!', 'Oops!');
		// 		return;
		// 	}
		// }
		let tmppath = URL.createObjectURL(event.target.files[0]);
		var uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
		var newUploadFiles=event.target.files;
		console.log(newUploadFiles[0])
		this.onUploadVideo(newUploadFiles)
	}

	onUploadVideo(newUploadFiles){
		let formData: FormData = new FormData();
		var uploadFile = newUploadFiles[0];
		formData.append('tutorial', uploadFile);
		console.log("KKKKKKKKKKKKKKKKKKKKKKKK")
		console.log(formData)
		console.log("KKKKKKKKKKKKKKKKKKKKKKKK")
		var videoFormData = formData
		console.log(videoFormData)
		this.saveFormData = videoFormData
		//this.DocUpload(videoFormData)
	}

}