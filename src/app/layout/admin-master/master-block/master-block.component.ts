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
	selector: 'app-master-block',
	templateUrl: './master-block.component.html',
	styleUrls: ['./master-block.component.css']
})
export class MasterBlockComponent implements OnInit {

	reqData
	admin
	getRaceArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedBlockArray
	getAnesTArray
	setAccToSurgery
	mySlug
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
				this.title.setTitle('Block - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Block - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Block - The Cloud Health')
		}
		this.getUniqueid = ''
		this.getAnesTArray = []
		this.hideShow()
		this.form = new FormGroup({
			Block_Name: new FormControl('',[Validators.required, ]),
			Block_Type: new FormControl('',[Validators.required, ]),
		});
		this.reqData = {}
		this.getRaceArray = []
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getBlockList()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
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
	addBlockthesia(){
		$("#submitbtn").modal("hide");
		$('body').removeClass('modal-open');
		if(this.getUniqueid){
			console.log(';im in update', this.form.value)
			this.form.value.Block_Unique_ID = this.getUniqueid
			this.form.value.Block_Create_Date = this.getcreatedAt
			this.form.value.Block_Is_Active = true
			this.form.value.Block_Create_By = this.admin.UM_Unique_ID
			this.form.value.Block_Modify_Date = new Date()
			this.form.value.Block_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Block_User_Name = this.admin.UM_Username
			this.form.value.Block_Is_Deleted = false
			this.form.value.Block_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID =  this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.updateBlock(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{
			this.form.value.Block_Is_Active = true
			this.form.value.Block_Create_By = this.admin.UM_Unique_ID
			this.form.value.Block_Create_Date = new Date()
			this.form.value.Block_Modify_Date = new Date()
			this.form.value.Block_Create_By_Type = this.admin.UM_Office_Type
			this.form.value.Block_User_Name = this.admin.UM_Username
			this.form.value.Block_Is_Deleted = false
			this.form.value.Block_TimeZone = this.admin.UM_TimeZone
			this.form.value.Project_ID =  this.admin.Project_ID
			this.form.value.Slug = this.mySlug
			this.UserService.addBlock(this.form.value).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}

	}
	editBlockthesiaList(item){
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});

		this.getUniqueid = item.Block_Unique_ID
		this.getcreatedAt = item.Block_Create_Date
		this.form.get('Block_Name').setValue(item.Block_Name);
		this.form.get('Block_Type').setValue(item.Block_Type);
		// this.form.get('Block_Anesthesia_Id').setValue(item.Block_Anesthesia_Id);

	}

	getBlockList(){
		$('#mstrblck').DataTable().destroy();
		this.showLoader  =true
		var obj = {
			Slug : this.mySlug
		}
		this.UserService.getBlockList(obj).subscribe((data)=>{
			console.log(data)
			this.getRaceArray = data.DataList
			this.dtTrigger.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}
	UpdateStatus(list, evt){
		var obj = {

			Block_Is_Active : evt.checked,
			Block_Modify_Date : new Date(),
			Block_Unique_ID : list.Block_Unique_ID,
			Block_TimeZone: this.admin.UM_TimeZone,
			Slug : this.mySlug
			

		}
		console.log(obj)
		this.UserService.blockIsActive(obj).subscribe((data)=>{
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
		this.getBlockDeletedList()
		$(".view-delete-button").show();
		$(".hide-from").hide();
		$(".view-button").hide();
		$(".add-table").hide();
		$(".add-button").hide();
		$(".view-deleted").show();
		$("#again-Back").show();
		// this.dtTrigger.next();
		
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
		
		console.log(this.isDelete)
		var obj = {
			Block_Modify_Date : new Date(),
			Block_Unique_ID : this.isDelete.Block_Unique_ID,
			Block_Is_Deleted: true,
			Block_TimeZone: this.isDelete.Block_TimeZone,
			Slug : this.mySlug
		}

		this.UserService.blockIsDelete(obj).subscribe((data)=>{
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
			Block_Modify_Date : new Date(),
			Block_Unique_ID : this.isDelete.Block_Unique_ID,
			Block_Is_Deleted: false,
			Block_TimeZone: this.isDelete.Block_TimeZone,
			Slug : this.mySlug
		}
		this.UserService.blockIsDelete(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#revertDelete").modal("hide");
		$('body').removeClass('modal-open');
	}

	getBlockDeletedList(){
		this.showLoader = true
		$('#Block_deleted_rc').DataTable().destroy();
		var obj = {
			Slug : this.mySlug
		}
		this.UserService.getBlockDeletedList(obj).subscribe((data)=>{
			this.getDeletedBlockArray =data.DataList
			this.dtTrigger1.next();
			this.showLoader = false
		},err=>{
			console.log(err)
		})
	}

	// getAnsNameList(){
		// 	this.UserService.getAnesthesiaList().subscribe((data)=>{
			// 		console.log(data)
			// 		this.getAnesTArray =data.DataList
			// 		this.form.get('Block_Anesthesia_Id').setValue(data.DataList[0].Anes_Unique_ID);
			// 		this.showLoader = false
			// 	},err=>{
				// 		console.log(err)
				// 	})
				// }
				getcategoryName(id){
					for (var i = 0; i < this.getAnesTArray.length; i++) {
						if(this.getAnesTArray[i].Anes_Unique_ID == id)
							return (this.getAnesTArray[i].Anes_Name)
					}

				}

			}

