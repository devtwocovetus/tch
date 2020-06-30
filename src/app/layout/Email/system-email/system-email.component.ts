import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { throwError, of, empty } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TagInputComponent as SourceTagInput } from 'ngx-chips';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
export interface AutoCompleteModel {
	value: any;
	display: string;
}
@Component({
	selector: 'app-system-email',
	templateUrl: './system-email.component.html',
	styleUrls: ['./system-email.component.css']
})
export class SystemEmailComponent implements OnInit {

	reqData:any = {}
	admin
	getLanguageArray
	getUniqueid
	form
	getcreatedAt
	showLoader
	isDelete
	getDeletedLangArray
	setAccToSurgery
	getUnique
	totalTr:any = []
	myArr
	getDistImageName
	getListArray
	imageLink
	getPatientBookingId
	getpatientName
	getpatietnLastName
	getLinkOfDoc
	testNew 
	mySlug
	surPhyImg
	showMsg
	showFooter
	getPerDetails
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	defaultLogo
	// addFirstAttemptFailed
	config:any = {
		width:900,
		height : 400,
		placeholder : 'some value',
		// extraPlugins: 'divarea',
		toolbar : [
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
		{ name: 'insert', items: [ 'Image'] },
		'/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'document', items: [ 'Source',] },
		{ name: 'insert', items: [  'Table',] },
		]
	}
	siteLink
	@ViewChild('tagInput', {static: false})
	tagInput: SourceTagInput;
	config_footer:any = {
		width:900,
		height : 100,
		placeholder : 'some value',
		// extraPlugins: 'divarea',
		toolbar : [
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ],  items: [  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', ]  },
		{ name: 'insert', items: [  'Table',] },
		{ name: 'document', items: [ 'Source',] },
		
		]
	}
	constructor(private UserService:UserService,  private location: Location, private title: Title, private toster:ToastrService, private router:Router,
		private ref: ChangeDetectorRef, private route: ActivatedRoute, private sanitizer:DomSanitizer,
		private translate: TranslateService,) { 
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
		

	}

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.reqData = {}
		this.getListArray = []
		this.imageLink = environment1.image
		this.siteLink  = environment1.siteLink+'/'
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Add System Email - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Add System Email - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
			
		}else{
			this.title.setTitle('Add System Email - The Cloud Health')
		}
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_Logo){
				this.surPhyImg = this.setAccToSurgery.PhyO_Logo.Logo_Navigation_Image
				console.log('phy')
			}else if(this.setAccToSurgery.SurgC_Logo){
				this.surPhyImg = this.setAccToSurgery.SurgC_Logo.Logo_Navigation_Image
				console.log('sur')
			}else{
			console.log(123456)
			this.defaultLogo ='images/logo.png'
		}
		}else{
			this.defaultLogo ='images/logo.png'
		}
		if(this.admin.UM_Office_Type  != 'A'){
			$(document).ready(function() {
				$("#showaddbtn").hide()
			});
		}

		this.getUniqueid = ''
		this.hideShow()
		this.form = new FormGroup({
			Lang_Name: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
			// Lang_Shotname: new FormControl('',[Validators.required, Validators.pattern('^[^]+[a-zA-Z]*')]),
		});
		this.getLanguageArray = []
		this.getListOfData()
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
	}
	addData(){
		if(this.reqData.SET_Name == '' || this.reqData.SET_Name == null || this.reqData.SET_Name == undefined){
			this.toster.warning(this.translate.instant('Please fill name'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_Description == '' || this.reqData.SET_Description == null || this.reqData.SET_Description == undefined){
			this.toster.warning(this.translate.instant('Please fill description'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_From_Email == '' || this.reqData.SET_From_Email == null || this.reqData.SET_From_Email == undefined){
			this.toster.warning(this.translate.instant('Please fill from email'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_From_Name == '' || this.reqData.SET_From_Name == null || this.reqData.SET_From_Name == undefined){
			this.toster.warning(this.translate.instant('Please fill from name'), this.translate.instant('Warning'))
			return
		}
		if (this.reqData.To_Email == null || this.reqData.To_Email == []) {
			this.toster.warning(this.translate.instant('Please fill To email'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_Message == '' || this.reqData.SET_Message == null || this.reqData.SET_Message == undefined){
			this.toster.warning(this.translate.instant('Please fill body'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_Footer == '' || this.reqData.SET_Footer == null || this.reqData.SET_Footer == undefined){
			this.toster.warning(this.translate.instant('Please fill footer'), this.translate.instant('Warning'))
			return
		}


		var bcc = []
		var cc = []
		var toEmail = []
		console.log(this.reqData.Cc_Email, this.reqData.Bcc_Email, this.reqData.To_Email)
		
		this.reqData.SET_To = toEmail;
		this.reqData.SET_Bcc = bcc;
		this.reqData.SET_CC = cc;
		console.log(this.reqData)
		// return
		if(this.getUniqueid){
			if(this.reqData.Cc_Email || this.reqData.Bcc_Email || this.reqData.To_Email){
				for (var i = 0; i < this.reqData.To_Email.length; i++) {
					if(this.reqData.Bcc_Email && this.reqData.Bcc_Email.length > 0){
						bcc.push(this.reqData.Bcc_Email[i].value)
					}
					if(this.reqData.Cc_Email && this.reqData.Cc_Email.length > 0){
						cc.push(this.reqData.Cc_Email[i].value)
					}
					if(this.reqData.To_Email && this.reqData.To_Email.length > 0){
						toEmail.push(this.reqData.To_Email[i].value)
					}
					// cc.push(this.reqData.Cc_Email[i].value)
					// toEmail.push(this.reqData.To_Email[i].value)
				}
				
			}
			var imglink
			if(this.surPhyImg){

				this.reqData.SET_Header = this.removeTildSign(this.surPhyImg)
			}else{
				this.reqData.SET_Header = this.removeTildSign(this.defaultLogo)
			}
			this.reqData.SET_Unique_ID = this.getUniqueid
			this.reqData.SET_Modify_Date  =new Date()
			this.reqData.SET_Surgery_Physician_Id = this.admin.UM_Surgary_Physician_CenterID
			console.log(this.reqData, 'im in udpaet')
			this.UserService.updateSystemEmailTemp(this.reqData).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				$("#submitbtn").modal("hide");
				$('body').removeClass('modal-open');
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}else{	
			if(this.reqData.Cc_Email || this.reqData.Bcc_Email || this.reqData.To_Email){
				for (var i = 0; i < this.reqData.To_Email.length; i++) {
					if(this.reqData.Bcc_Email && this.reqData.Bcc_Email.length > 0){
						bcc.push(this.reqData.Bcc_Email[i].value)
					}
					if(this.reqData.Cc_Email && this.reqData.Cc_Email.length > 0){
						cc.push(this.reqData.Cc_Email[i].value)
					}
					if(this.reqData.To_Email && this.reqData.To_Email.length > 0){
						toEmail.push(this.reqData.To_Email[i].value)
					}
					// cc.push(this.reqData.Cc_Email[i].value)
					// toEmail.push(this.reqData.To_Email[i].value)
				}
				
			}
			var imglink
			if(this.surPhyImg){

				this.reqData.SET_Header = this.removeTildSign(this.surPhyImg)
			}else{
				this.reqData.SET_Header = this.removeTildSign(this.defaultLogo)
			}
			this.reqData.SET_Office_Type = this.admin.UM_Office_Type
			this.reqData.SET_Created_By = this.admin.UM_Unique_ID
			this.reqData.SET_User_Name = this.admin.UM_Username
			this.reqData.SET_Create_Date = new Date()
			this.reqData.SET_Modify_Date = new Date()
			this.reqData.SET_Is_Active = true
			this.reqData.SET_Is_Deleted = false
			this.reqData.SET_TimeZone = this.admin.UM_TimeZone
			this.reqData.SET_Surgery_Physician_Id = this.admin.UM_Surgary_Physician_CenterID
			this.reqData.Slug = this.mySlug
			console.log(this.reqData)
			// return
			this.UserService.saveSystemEmailTemp(this.reqData).subscribe((data)=>{
				console.log(data)
				this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
				$("#submitbtn").modal("hide");
				$('body').removeClass('modal-open');
				this.ngOnInit()
			},err=>{
				console.log(err)
			})
		}
	}
	editData(data){
		console.log(data)
		$(".edit-button").click(function(){
			$(".add-table").hide();
			$(".hide-from").show();
			$(".add-button").hide();
			$(".edit-data").show();
			$("#again-Back").show();
		});
		this.reqData = data
		this.reqData.To_Email= []
		this.reqData.Cc_Email = [] 
		this.reqData.Bcc_Email = [] 
		this.getUniqueid = data.SET_Unique_ID
		if(this.reqData.SET_To){
			for (var i = 0; i < this.reqData.SET_To.length; i++) {
				this.reqData.To_Email.push({display:this.reqData.SET_To[i], value:this.reqData.SET_To[i]})
			}
		}
		if(this.reqData.SET_CC){
			for (var i = 0; i < this.reqData.SET_CC.length; i++) {
				this.reqData.Cc_Email.push({display:this.reqData.SET_CC[i], value:this.reqData.SET_CC[i]})
			}
		}
		if(this.reqData.SET_Bcc){
			for (var i = 0; i < this.reqData.SET_Bcc.length; i++) {
				this.reqData.Bcc_Email.push({display:this.reqData.SET_Bcc[i], value:this.reqData.SET_Bcc[i]})
			}
		}
		// this.reqData.Cc_Email, this.reqData.Bcc_Email, this.reqData.To_Email
		// display: "fdsj@das.das", value: "fdsj@das.das"}

	}

	getListOfData(){
		$('#systenml').DataTable().destroy();
		this.showLoader = true
		var obj = {
			Slug: this.mySlug,
			SET_Surgery_Physician_Id: this.admin.UM_Surgary_Physician_CenterID
		}
		this.UserService.listSystemEmailTemp(obj).subscribe((data)=>{
			console.log(data)
			this.getListArray = data.DataList
			this.dtTrigger.next();
			// $(document).ready(function() {
				// 	setTimeout(function(){
					// 		$('#kbknwldge').DataTable();
					// 	}, 100);
					// } );
					this.showLoader = false
				},err=>{
					console.log(err)
				})
	}
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
	hideShow(){
		var mythis = this
		$(function() {
			$('#div' + $(this).attr('target="1"')).show();
			$('.showSingle').click(function() {
				$('.targetDiv').hide();
				$('#div' + $(this).attr('target')).show();
				$('.showSingle').removeClass('active');
				$(this).closest(this).toggleClass('active');
			});
		});
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
				mythis.reqData = {}
			});
		});
		// $('[data-toggle="tooltip"]').tooltip();
	}

	goBack(){
		$("#cancelbtn").modal("hide");
		$('body').removeClass('modal-open');
		this.hideShow()
		this.reqData = {}
	}

	getLastLocation(){
		this.location.back()
	}
	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isDelete = data
	}
	//bypassSecurityTrustHtml
	isDeletedYes(){

		console.log(this.isDelete)
		var myarr = []
		myarr.push({KBR_Unique_ID:this.isDelete.KBR_Unique_ID})
		var obj = {
			KNB_Unique_ID:this.getUnique,
			KNB_Modify_Date : new Date(),
			KNB_References:myarr,
			KNB_TimeZone: this.isDelete.KBR_TimeZone,
			Slug: this.mySlug,
		}
		console.log(obj)
		this.UserService.IsDeletedReference(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}
	removeTildSign(data){
		if(data){
			var getnew = data.replace("~", "");
		}
		return (getnew)
	}
	sendPreviewemail(){
		// console.log($('.modal-dialog').html())
		// return sendEmail
		if(this.reqData.SET_Name == '' || this.reqData.SET_Name == null || this.reqData.SET_Name == undefined){
			this.toster.warning(this.translate.instant('Please fill name'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_Message == '' || this.reqData.SET_Message == null || this.reqData.SET_Message == undefined){
			this.toster.warning(this.translate.instant('Please fill body'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.SET_Footer == '' || this.reqData.SET_Footer == null || this.reqData.SET_Footer == undefined){
			this.toster.warning(this.translate.instant('Please fill footer'), this.translate.instant('Warning'))
			return
		}
		if(this.reqData.sendEmail == '' || this.reqData.sendEmail == null || this.reqData.sendEmail == undefined){
			this.toster.warning(this.translate.instant('Please enter email'), this.translate.instant('Warning'))
			return
		}
		var tomail = []
		tomail.push(this.reqData.sendEmail)
		this.showLoader = true
		var obj = {
			from_email:'tch.techconnect@gmail.com',
			From_Name: 'TheCloudHealth',
			To_Email:tomail,
			Bcc_Email: [],
			Cc_Email: [],
			To_Name:'',
			Subject:this.reqData.SET_Name,
			PlainTextContent:'',
			HtmlContent:$('#previewTable').html()
		}
		console.log(obj)
		this.UserService.sendEmailToPatient(obj).subscribe((data)=>{
			console.log(data)
			if(data.Message == '<Response><Message>Your message could not be processed at this time. Please try again later.</Message></Response>'){
				this.toster.error('Your message could not be processed at this time. Please try again later.', 'Error')
			}else if(data.Message == '<Response><Message>Thank you for your message, someone will be in touch soon!</Message></Response>'){
				this.toster.success(this.translate.instant('Your email sent successfully'), this.translate.instant('Success'))
			}

			this.showLoader = false
			$("#preview5454").modal("hide");
			$('body').removeClass('modal-open');
		},err=>{
			console.log(err)
		})
	}
	showPreview(){
		this.showMsg = this.sanitizer.bypassSecurityTrustHtml(this.reqData.SET_Message)
		this.showFooter = this.sanitizer.bypassSecurityTrustHtml(this.reqData.SET_Footer)
		$("#preview5454").modal("show");
	}
	


	public validators = [ this.must_be_email.bind(this) ];
	public errorMessages = {
		'must_be_email': 'Please be sure to use a valid email format'
	};
	public onAddedFunc = this.beforeAdd.bind(this);

	private addFirstAttemptFailed = false;

	private must_be_email(control: FormControl) {        

		if (this.addFirstAttemptFailed && !this.validateEmail(control.value)) {
			return { "must_be_email": true };
		}
		return null;
	}

	private beforeAdd(tag: string) {

		if (!this.validateEmail(tag)) {
			if (!this.addFirstAttemptFailed) {
				this.addFirstAttemptFailed = true;
				this.tagInput.setInputValue(tag);
			}

			return throwError(this.errorMessages['must_be_email']);
			//return of('').pipe(tap(() => setTimeout(() => this.tagInput.setInputValue(tag))));

		}
		this.addFirstAttemptFailed = false;
		return of(tag);
	}
	private validateEmail(text: string) {
		var EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i;
		return (text && EMAIL_REGEXP.test(text));
	}

}