import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
declare var $:any
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-legal-form',
	templateUrl: './legal-form.component.html',
	styleUrls: ['./legal-form.component.css']
})
export class LegalFormComponent implements OnInit {
	showLoader
	getPackArray
	getUniqueid
	form
	reqData
	admin
	getSpecialtiesArray
	saveSpecsCheckBox
	trysomeing
	getFromArray
	setAccToSurgery
	mySlug
	getcreatedAt
	getMyFormData
	isDelete
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private toster: ToastrService,
		private translate: TranslateService) { 
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
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			responsive: true,
		};
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('General Form - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('General Form - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('General Form - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getUniqueid = ''
		this.hideShow()
		this.saveSpecsCheckBox = []
		this.getPackArray = []
		this.form = new FormGroup({
			Pack_Name: new FormControl('',[Validators.required]),
			Pack_Type: new FormControl('',[Validators.required]),
			Patient_Prefix: new FormControl(''),
		});
		this.reqData = {}
		this.getFromArray = []
		this.getSpecialtiesArray = []
		this.getEthinicityList()
		// this.getSpecialties()
		this.getPackList()
		this.form.get('Patient_Prefix').setValue('slctpck')
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
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
	getEthinicityList(){
		this.showLoader = true
		var obj = {
			Form_Surgery_Physician_Id:this.admin.UM_Surgary_Physician_CenterID,
			Slug:this.mySlug
		}
		$('#themdclfrm').DataTable().destroy();
		// $('#generalformtble').dataTable().fnDestroy();
		this.UserService.GetForm_Surgery_Physician_Id(obj).subscribe((data)=>{
			console.log(data)
			// this.getFromArray = data.DataList
			for (var i = 0; i < data.DataList.length; i++) {
				if(data.DataList[i].Form_Type == 'General'){
					this.getFromArray.push({
						Form_Unique_ID: data.DataList[i].Form_Unique_ID,
						Form_Pack_ID: data.DataList[i].Form_Pack_ID,
						Form_Pack_Name: data.DataList[i].Form_Pack_Name,
						Form_Name: data.DataList[i].Form_Name,
						Form_Description: data.DataList[i].Form_Description,
						Form_Data: data.DataList[i].Form_Data,
						Form_Type: data.DataList[i].Form_Type,
						Form_Surgery_Physician_Id: data.DataList[i].Form_Surgery_Physician_Id,
						Form_Office_Type: data.DataList[i].Form_Office_Type,
						Form_Created_By: data.DataList[i].Form_Created_By,
						Form_User_Name: data.DataList[i].Form_User_Name,
						Form_Create_Date: data.DataList[i].Form_Create_Date,
						Form_Modify_Date: data.DataList[i].Form_Modify_Date,
						Form_Is_Active: data.DataList[i].Form_Is_Active,
						Form_Is_Deleted: data.DataList[i].Form_Is_Deleted,
						Form_TimeZone: data.DataList[i].Form_TimeZone,
						Slug: data.DataList[i].Slug,
					})

				}
			}
			this.dtTrigger.next();
			// $(document).ready(function() {
				// 	setTimeout(function(){
					// 		$('#generalformtble').DataTable();
					// 	}, 500);
					// } );
					this.showLoader  = false
				},err=>{
					console.log(err)
				})
	}
	getPackList(){
		var obj = {
			Slug: this.mySlug,
			Pack_Surgery_Physician_Id: this.admin.UM_Surgary_Physician_CenterID
		}
		this.UserService.getPackList(obj).subscribe((data)=>{
			console.log(data)
			this.getPackArray = data.DataList
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
	saveData(){
		if(this.form.value.Patient_Prefix == 'slctpck' ){
			this.toster.warning('Please pelect pack', 'Warning')
			return
		}
		// console.log($('#getpack option:selected').val())
		// console.log($('#getpack option:selected').text())
		if(this.getUniqueid){
			console.log('in update')
			var obj1 = {
				Form_Unique_ID:this.getUniqueid,
				Form_Pack_ID : $('#getpack option:selected').val(),
				Form_Pack_Name : $('#getpack option:selected').text(),
				Form_Name : this.form.value.Pack_Name,
				Form_Description:this.form.value.Pack_Type,
				Form_Data : this.getMyFormData,
				Form_Surgery_Physician_Id : this.admin.UM_Surgary_Physician_CenterID,
				Form_Office_Type :this.admin.UM_Office_Type,
				Form_Created_By : this.admin.UM_Unique_ID,
				Form_User_Name : this.admin.UM_Username,
				Form_Create_Date :this.getcreatedAt,
				Form_Modify_Date : new Date(),
				Form_Is_Active : true,
				Form_Is_Deleted : false,
				Form_TimeZone : this.admin.UM_TimeZone,
				Form_Type: 'Medical',
				Slug: this.mySlug
			}
			console.log(obj1)
			this.UserService.updateForm(obj1).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
				// this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			var obj = {
				Form_Pack_ID : $('#getpack option:selected').val(),
				Form_Pack_Name : $('#getpack option:selected').text(),
				Form_Name : this.form.value.Pack_Name,
				Form_Description:this.form.value.Pack_Type,
				Form_Data : "",
				Form_Surgery_Physician_Id : this.admin.UM_Surgary_Physician_CenterID,
				Form_Office_Type :this.admin.UM_Office_Type,
				Form_Created_By : this.admin.UM_Unique_ID,
				Form_User_Name : this.admin.UM_Username,
				Form_Create_Date : new Date(),
				Form_Modify_Date : new Date(),
				Form_Is_Active : true,
				Form_Is_Deleted : false,
				Form_TimeZone : this.admin.UM_TimeZone,
				Form_Type: 'General',
				Slug: this.mySlug,
			}
			this.UserService.addForm(obj).subscribe((data)=>{
				console.log(data)
				this.ngOnInit()
				// this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
	}
	UpdateStatus(list, evt){
		var obj = {
			Form_Is_Active : evt.checked,
			Form_Modify_Date : new Date(),
			Form_Unique_ID : list.Form_Unique_ID,
			Form_TimeZone:list.Form_TimeZone,
			Slug: this.mySlug

		}
		console.log(obj)
		this.UserService.updateFromsIsActive(obj).subscribe((data)=>{
			console.log(data)
			// this.ngOnInit()
		},err=>{
			console.log(err)
		})
	}
	editform(item){
		console.log(item)
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		this.getUniqueid = item.Form_Unique_ID
		this.getcreatedAt = item.Form_Create_Date
		this.getMyFormData = item.Form_Data
		this.form.get('Pack_Name').setValue(item.Form_Name);
		this.form.get('Pack_Type' ).setValue(item.Form_Description);
		this.form.get('Patient_Prefix' ).setValue(item.Form_Pack_ID);
		

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
		// $('[data-toggle="tooltip"]').tooltip();
	}
	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
	}
	onChange(category, isChecked: boolean) {
		console.log(category)
		// this.lead_category1  = this.getIdOfLeadCat
		if(isChecked) {
			this.saveSpecsCheckBox.push({
				Spec_Name:category.Spec_Name,
				Spec_Unique_ID: category.Spec_Unique_ID,
				Spec_Is_Needed: true
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
	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data
	}


	isDeletedYes(){

		// console.log(this.isDelete)
		var obj = {

			Form_Modify_Date : new Date(),
			Form_Unique_ID : this.isDelete.Form_Unique_ID,
			Form_Is_Deleted: true,
			Form_TimeZone : this.isDelete.Form_TimeZone,
			Slug: this.mySlug

		}
		console.log(obj)


		this.UserService.updateFromsIsDelete(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}



	

}

