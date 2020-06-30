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

@Component({
	selector: 'app-master-cpt',
	templateUrl: './master-cpt.component.html',
	styleUrls: ['./master-cpt.component.css']
})
export class MasterCptComponent implements OnInit {

	reqData
	admin
	getRaceArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedCPTArray
	getAnesTArray
	setAccToSurgery
	mySlug
	myColorCode
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService) { 
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		console.log(this.getPerDetails[0]) 
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
				this.title.setTitle('CPT - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('CPT - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('CPT - The Cloud Health')
		}
		if(this.setAccToSurgery){
			if (this.setAccToSurgery.SurgC_Appearance) {
				this.myColorCode = this.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax
			}else if(this.setAccToSurgery.PhyO_Appearance){
				this.myColorCode = this.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax
			}
		}
		this.getUniqueid = ''
		this.getAnesTArray = []
		this.hideShow()
		this.form = new FormGroup({
			CPT_Procedure_Code_Category: new FormControl('',[Validators.required]),
			CPT_Code: new FormControl('',[Validators.required]),
			CPT_Code_Description: new FormControl('',[Validators.required]),
		});
		this.reqData = {}
		this.getRaceArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.getCPTList()
		
		// this.getAnsNameList()
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
	addCPTthesia(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update', this.form.value)
			this.form.value.CPT_Unique_ID = this.getUniqueid
			this.form.value.CPT_Create_Date = this.getcreatedAt
			this.form.value.CPT_Is_Active = true
			this.form.value.CPT_Created_By = this.admin.UM_Unique_ID
			this.form.value.CPT_Modify_Date = new Date()
			this.form.value.CPT_Created_By_Type = this.admin.UM_Office_Type
			this.form.value.CPT_User_Name = this.admin.UM_Username
			this.form.value.CPT_Is_Deleted = false
			this.form.value.CPT_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID= this.admin.Project_ID
			this.form.value.Slug  = this.mySlug
			this.UserService.updateCPT(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.CPT_Is_Active = true
			this.form.value.CPT_Created_By = this.admin.UM_Unique_ID
			this.form.value.CPT_Create_Date = new Date()
			this.form.value.CPT_Modify_Date = new Date()
			this.form.value.CPT_Created_By_Type = this.admin.UM_Office_Type
			this.form.value.CPT_User_Name = this.admin.UM_Username
			this.form.value.CPT_Is_Deleted = false
			this.form.value.CPT_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID= this.admin.Project_ID
			this.form.value.Slug  = this.mySlug
			console.log(this.form.value)
			this.UserService.addCPT(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editCPTthesiaList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.CPT_Unique_ID
		this.getcreatedAt = item.CPT_Create_Date
		this.form.get('CPT_Procedure_Code_Category').setValue(item.CPT_Procedure_Code_Category);
		this.form.get('CPT_Code').setValue(item.CPT_Code);
		this.form.get('CPT_Code_Description').setValue(item.CPT_Code_Description);

	}


	getCPTList(){
		
		this.showLoader  =true
		var obj = {
			Slug:this.mySlug
		}
		this.getRaceArray = []
		$('#mycptlist').DataTable().destroy();
		this.UserService.getCPTList(obj).subscribe((data)=>{
			console.log(data)
			var mythis = this
			$(document).ready(function() {
				setTimeout(function(){
					$(".paginate_button").hover(function(){
						$(this).css("background-color", mythis.myColorCode);
					}, function(){
						$(this).css("background-color", "white");
					});
					$('.current').each(function() {
						$(this).css("background", mythis.myColorCode);
					})
					$('#mycptlist').on('draw.dt', function() {
						$('.current').each(function() {
							$(this).css("background", mythis.myColorCode);
						})
					});
					
				}, 250);
			} );
			this.dtTrigger.next();
			this.getRaceArray = data.DataList
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		console.log(list, evt)
		var obj = {
			CPT_Is_Active : evt.checked,
			CPT_Modify_Date : new Date(),
			CPT_Unique_ID : list.CPT_Unique_ID,
			Slug: this.mySlug,
			CPT_TimeZone: this.admin.UM_TimeZone,
		}
		console.log(obj)
		this.UserService.cPTIsActive(obj).subscribe((data)=>{
			console.log(data)
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
		// $('[data-toggle="tooltip"]').tooltip();
	}
	viewDeletedRdcs(){
		this.getCPTDeletedList()
		$(".view-delete-button").show();
		$(".hide-from").hide();
		$(".view-button").hide();
		$(".add-table").hide();
		$(".add-button").hide();
		$(".view-deleted").show();
		$("#again-Back").show();
		
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
			CPT_Modify_Date : new Date(),
			CPT_Unique_ID : this.isDelete.CPT_Unique_ID,
			CPT_Is_Deleted: true,
			Slug: this.mySlug,
			CPT_TimeZone: this.admin.UM_TimeZone,
		}
		console.log(obj)
		this.UserService.cPTIsDelete(obj).subscribe((data)=>{
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
			CPT_Modify_Date : new Date(),
			CPT_Unique_ID : this.isDelete.CPT_Unique_ID,
			CPT_Is_Deleted: false,
			Slug: this.mySlug,
			CPT_TimeZone: this.admin.UM_TimeZone,
		}
		this.UserService.cPTIsDelete(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getCPTDeletedList(){
		$('#mycptlist_dleted').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug:this.mySlug
		}
		this.UserService.getCPTDeletedList(obj).subscribe((data)=>{
			var mythis = this
			$(document).ready(function() {
				setTimeout(function(){
					// $(".previous").css("background-color", 'blue')
					$('.current').each(function() {
						$(this).css("background", mythis.myColorCode);
					})
					$('#mycptlist_dleted').on('draw.dt', function() {
						$('.current').each(function() {
							$(this).css("background", mythis.myColorCode);
						})
					});
				}, 150);
			} );
			this.getDeletedCPTArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

}
