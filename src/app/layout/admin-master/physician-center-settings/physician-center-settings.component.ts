import { Component, OnInit, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {environment1} from '../../../../environments/environment.prod';
declare const tinymce: any;
import { DOCUMENT } from '@angular/common';
declare var $:any
@Component({
	selector: 'app-physician-center-settings',
	templateUrl: './physician-center-settings.component.html',
	styleUrls: ['./physician-center-settings.component.css']
})
export class PhysicianCenterSettingsComponent implements OnInit {
	reqData
	getQueryString
	website
	siteUrl
	physicianUniqueId
	getphysicianDetails
	admin
	appearance
	slider
	footer
	misc
	getnavigationDark
	getnavigationLight
	gethyperLinkText
	getbuttonBG
	getbuttontext
	getbtnMouseHover
	gethyperlinkHovertxt
	gettitle1color
	gettitle2color
	getloginBgcolor
	getlogintextColor
	getloginBtncolor
	logoObject
	saveFormData
	getFooterIsShow
	getSliderArray
	getImagepath
	myformData = new FormData()
	isSliderDeleted
	LogoLoginImage
	LogoNavigationImage
	Logo_Fav_Image
	showLoader
	setAccToSurgery
	PhyO_Footer
	validmessage
	mySlug
	getSiteUrlFromDB
	checksiteUrlFromNew
	siteLink
	dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor( private route: ActivatedRoute,private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private domSanitizer: DomSanitizer, @Inject(DOCUMENT) private _document: HTMLDocument) {
		this.physicianUniqueId = route.snapshot.params.id;
		console.log(this.physicianUniqueId)
		this.getphysicianDetails = {}
		this.siteLink = environment1.siteLink
		this.admin = JSON.parse(localStorage.getItem('loginData'))
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

		this.appearance = {}
		this.getnavigationDark = '#006400'
		this.getnavigationLight = '#2CA36C'
		this.gethyperLinkText = '#04a8c5'
		this.getbuttonBG = '#04A8C5'
		this.getbuttontext = '#A8E9FF'
		this.getbtnMouseHover = '#F2F3F8'
		this.gethyperlinkHovertxt = '#04a8c5'
		this.gettitle1color = '#2CA399'
		this.gettitle2color = '#2CA36C'
		this.getloginBgcolor = '#04a8c5'
		this.getlogintextColor = '#04a8c5'
		this.getloginBtncolor = '#04a8c5'
		this.appearance.App_NavigationColorDark_Hax = '#006400'
		this.appearance.App_NavigationColorLight_Hax = '#2CA36C'
		this.appearance.App_Hyperlinktext_Hax = '#04a8c5'
		this.appearance.App_ButtonBackground_Hax = '#04A8C5'
		this.appearance.App_ButtonText_Hax = '#A8E9FF'
		this.appearance.App_ButtonMouseHover_Hax = '#F2F3F8'
		this.appearance.App_HyperlinkHoverText_Hax = '#04a8c5'
		this.appearance.App_Title1Color_Hax = '#2CA399'
		this.appearance.App_Title2Color_Hax = '#2CA36C'
		this.appearance.App_LoginBackgroundColor_Hax = '#04a8c5'
		this.appearance.App_LoginTextColor_Hax = '#04a8c5'
		this.appearance.App_LoginButtonColor_Hax = '#04a8c5'
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Physician Setting - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Physician Setting - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Physician Setting - The Cloud Health')
		}
		if(this.admin.UM_Office_Type == 'P'){
			this.mySlug = this.admin.UM_Slug_PO
		}else{
			this.mySlug = this.admin.UM_Slug_SC
		}
		this.validmessage = 0
		this.getImagepath = environment1.image
		console.log(this.getImagepath)
		this.siteUrl = new FormGroup({
			Site_Domain: new FormControl('',[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
			Site_URL:new FormControl(''),
		})
		this.slider = new FormGroup({
			Slider_Title: new FormControl('', [Validators.required]),
			Slider_Description:new FormControl('', [Validators.required]),
		})
		this.footer = new FormGroup({
			Footer_Text: new FormControl(''),
			Footer_Is_Show:new FormControl(''),
		})
		this.misc = new FormGroup({
			Misc_GoogleAnalytics_Code: new FormControl(''),
			Misc_Header_Code:new FormControl(''),
			Misc_BodyStart_Code: new FormControl(''),
			Misc_BodyEnd_Code:new FormControl(''),

		})
		this.logoObject = {}
		this.getSliderArray = []
		this.showLoader = true
		var obj  ={
			Slug: this.mySlug,
			PhyO_Unique_ID: this.physicianUniqueId

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
		}, 2500);
		this.UserService.getPhysicianSetting(obj).subscribe((data)=>{
			console.log(data)
			this.getphysicianDetails = data.Data
			if(data.Data.PhyO_SiteURL){
				this.siteUrl.get('Site_URL').setValue(data.Data.PhyO_SiteURL.Site_URL);
				this.siteUrl.get('Site_Domain').setValue( data.Data.PhyO_SiteURL.Site_Domain)
				
			}
			this.reqData.notificationstime = "19:00"
			
			// this.siteUrl.get('Site_URL').setValue(data.Data.PhyO_SiteURL.Site_URL);
			if(data.Data.PhyO_Appearance){
				this.getnavigationDark = data.Data.PhyO_Appearance.App_NavigationColorDark_Hax
				this.getnavigationLight = data.Data.PhyO_Appearance.App_NavigationColorLight_Hax
				this.gethyperLinkText = data.Data.PhyO_Appearance.App_Hyperlinktext_Hax
				this.getbuttonBG = data.Data.PhyO_Appearance.App_ButtonBackground_Hax
				this.getbuttontext = data.Data.PhyO_Appearance.App_ButtonText_Hax
				this.getbtnMouseHover = data.Data.PhyO_Appearance.App_ButtonMouseHover_Hax
				this.gethyperlinkHovertxt = data.Data.PhyO_Appearance.App_HyperlinkHoverText_Hax
				this.gettitle1color = data.Data.PhyO_Appearance.App_Title1Color_Hax
				this.gettitle2color = data.Data.PhyO_Appearance.App_Title2Color_Hax
				this.getloginBgcolor = data.Data.PhyO_Appearance.App_LoginBackgroundColor_Hax
				this.getlogintextColor = data.Data.PhyO_Appearance.App_LoginTextColor_Hax
				this.getloginBtncolor = data.Data.PhyO_Appearance.App_LoginButtonColor_Hax
				this.appearance.App_NavigationColorDark_Hax = data.Data.PhyO_Appearance.App_NavigationColorDark_Hax
				this.appearance.App_NavigationColorLight_Hax = data.Data.PhyO_Appearance.App_NavigationColorLight_Hax
				this.appearance.App_Hyperlinktext_Hax = data.Data.PhyO_Appearance.App_Hyperlinktext_Hax
				this.appearance.App_ButtonBackground_Hax = data.Data.PhyO_Appearance.App_ButtonBackground_Hax
				this.appearance.App_ButtonText_Hax = data.Data.PhyO_Appearance.App_ButtonText_Hax
				this.appearance.App_ButtonMouseHover_Hax = data.Data.PhyO_Appearance.App_ButtonMouseHover_Hax
				this.appearance.App_HyperlinkHoverText_Hax = data.Data.PhyO_Appearance.App_HyperlinkHoverText_Hax
				this.appearance.App_Title1Color_Hax = data.Data.PhyO_Appearance.App_Title1Color_Hax
				this.appearance.App_Title2Color_Hax = data.Data.PhyO_Appearance.App_Title2Color_Hax
				this.appearance.App_LoginBackgroundColor_Hax = data.Data.PhyO_Appearance.App_LoginBackgroundColor_Hax
				this.appearance.App_LoginTextColor_Hax = data.Data.PhyO_Appearance.App_LoginTextColor_Hax
				this.appearance.App_LoginButtonColor_Hax = data.Data.PhyO_Appearance.App_LoginButtonColor_Hax
			}
			if(data.Data.PhyO_Footer){
				this.footer.get('Footer_Text').setValue( data.Data.PhyO_Footer.Footer_Text)
				if(data.Data.PhyO_Footer.Footer_Is_Show){
					this.footer.get('Footer_Is_Show').setValue('true');
				}else{
					this.footer.get('Footer_Is_Show').setValue('false');
				}
			}
			if(data.Data.PhyO_Miscellaneous){
				this.misc.get('Misc_GoogleAnalytics_Code').setValue( data.Data.PhyO_Miscellaneous.Misc_GoogleAnalytics_Code)
				this.misc.get('Misc_Header_Code').setValue( data.Data.PhyO_Miscellaneous.Misc_Header_Code)
				this.misc.get('Misc_BodyStart_Code').setValue( data.Data.PhyO_Miscellaneous.Misc_BodyStart_Code)
				this.misc.get('Misc_BodyEnd_Code').setValue( data.Data.PhyO_Miscellaneous.Misc_BodyEnd_Code)
			}
			// this.getSliderArray = data.Data.PhyO_SliderList
			this.getSliderArray = []
			this.getSliderArray.push({Slider_Unique_ID:0,Slider_Slider_Image:'Images/track_every_message.png', name:'Default image', Slider_Title:'Default ', Slider_Description: 'this is default image'})
			if(data.Data.PhyO_SliderList != null && data.Data.PhyO_SliderList.length > 0){
				for (var i = 0; i < data.Data.PhyO_SliderList.length; i++) {
					this.getSliderArray.push({
						Slider_Unique_ID:data.Data.PhyO_SliderList[i].Slider_Unique_ID,
						Slider_Title: data.Data.PhyO_SliderList[i].Slider_Title,
						Slider_Description: data.Data.PhyO_SliderList[i].Slider_Description,
						Slider_Background_Image: data.Data.PhyO_SliderList[i].Slider_Background_Image,
						Slider_Slider_Image: data.Data.PhyO_SliderList[i].Slider_Slider_Image,
						Slider_Is_Active: data.Data.PhyO_SliderList[i].Slider_Is_Active,

					})
				}
			}
			if(data.Data.PhyO_Logo){
				this.LogoLoginImage = data.Data.PhyO_Logo.Logo_Login_Image 
				this.LogoNavigationImage  = data.Data.PhyO_Logo.Logo_Navigation_Image
				this.Logo_Fav_Image  = data.Data.PhyO_Logo.Logo_Fav_Image
				var logoLink = this.removeTildSign(data.Data.PhyO_Logo.Logo_Fav_Image)
				console.log(this.getImagepath+'/'+logoLink)
				if(data.Data.PhyO_Logo.Logo_Fav_Image){
					this._document.getElementById('appFavicon').setAttribute('href', this.getImagepath+'/'+logoLink);
				}

			}
			this.showLoader = false
		},err=>{
			console.log(err)
		})
this.reqData = {}
this.hideShow()
console.log('im in oninit')

}

NavigationUpload(evt: any){
	if (!evt.target) {
		return;
	}
	if (!evt.target.files) {
		return;
	}
	if (evt.target.files.length !== 1) {
		return;
	}
	const file = evt.target.files[0];
	if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
		this.toster.warning('you can only upload jpg, png or jpeg', 'Warning')
		return;
	}
	console.log(evt)
	const fr = new FileReader();
	fr.onloadend = (loadEvent) => {
		let mainImage = fr.result;
		this.logoObject.Logo_Navigation_Image  = mainImage;
	};
	fr.readAsDataURL(file);
}
dashboardImage(evt: any){
	const file = evt.target.files[0]
	const fr = new FileReader();
	fr.onloadend = (loadEvent) => {
		let mainImage = fr.result;
		this.reqData.poster = mainImage;
	};
	fr.readAsDataURL(file);
}
uploadSlider(evt: any){
	const file = evt.target.files[0]
	const fr = new FileReader();
	fr.onloadend = (loadEvent) => {
		let mainImage = fr.result;
		this.reqData.poster = mainImage;
	};
	fr.readAsDataURL(file);
}
hideShow(){
	$(function() {
		// $('#showall').click(function() {
			// 	$('.targetDiv').show();
			// });
			$('#div' + $(this).attr('target="1"')).show();
			$('.showSingle').click(function() {
				$('.targetDiv').hide();
				$('#div' + $(this).attr('target')).show();
				$('.showSingle').removeClass('active');
				$(this).closest(this).toggleClass('active');
			});
		});
	$("#back_btn").hide();
	$(".add-slider").hide();
	$("#addsliderBox").hide();
	$(".edit-slider").hide()
	$("#add_more").click(function(){
		$("#tableGrid").hide();
		$("#addsliderBox").show();
		$(this).hide();
		$("#back_btn").show();
		$(".add-slider").show()
	});
	$("#back_btn").click(function(){
		$("#addsliderBox").hide();
		$("#tableGrid").show();
		$("#add_more").show();
		$(".add-slider").hide();
		$(this).hide();
		$(".edit-slider").hide()
	});
}
navigationDark(evt){
	console.log(evt)
	this.appearance.App_NavigationColorDark_Hax = evt.color.hex
	this.appearance.App_NavigationColorDark_R = evt.color.rgb.r
	this.appearance.App_NavigationColorDark_G = evt.color.rgb.g
	this.appearance.App_NavigationColorDark_B = evt.color.rgb.b
	this.appearance.App_NavigationColorDark_A = evt.color.rgb.a
	console.log(this.appearance)
}
navigationLight(evt){
	console.log(evt)
	this.appearance.App_NavigationColorLight_Hax = evt.color.hex
	this.appearance.App_NavigationColorLight_R = evt.color.rgb.r
	this.appearance.App_NavigationColorLight_G = evt.color.rgb.g
	this.appearance.App_NavigationColorLight_B = evt.color.rgb.b
	this.appearance.App_NavigationColorLight_A = evt.color.rgb.a
}
hyperLinkText(evt){
	console.log(evt)
	this.appearance.App_Hyperlinktext_Hax = evt.color.hex
	this.appearance.App_Hyperlinktext_R = evt.color.rgb.r
	this.appearance.App_Hyperlinktext_G = evt.color.rgb.g
	this.appearance.App_Hyperlinktext_B = evt.color.rgb.b
	this.appearance.App_Hyperlinktext_A = evt.color.rgb.a
}
buttonBG(evt){
	console.log(evt)
	this.appearance.App_ButtonBackground_Hax = evt.color.hex
	this.appearance.App_ButtonBackground_R = evt.color.rgb.r
	this.appearance.App_ButtonBackground_G = evt.color.rgb.g
	this.appearance.App_ButtonBackground_B = evt.color.rgb.b
	this.appearance.App_ButtonBackground_A = evt.color.rgb.a
}
buttontext(evt){
	console.log(evt)
	this.appearance.App_ButtonText_Hax = evt.color.hex
	this.appearance.App_ButtonText_R = evt.color.rgb.r
	this.appearance.App_ButtonText_G = evt.color.rgb.g
	this.appearance.App_ButtonText_B = evt.color.rgb.b
	this.appearance.App_ButtonText_A = evt.color.rgb.a
}
btnMouseHover(evt){
	console.log(evt)
	this.appearance.App_ButtonMouseHover_Hax = evt.color.hex
	this.appearance.App_ButtonMouseHover_R = evt.color.rgb.r
	this.appearance.App_ButtonMouseHover_G = evt.color.rgb.g
	this.appearance.App_ButtonMouseHover_B = evt.color.rgb.b
	this.appearance.App_ButtonMouseHover_A = evt.color.rgb.a
}
hyperlinkHovertxt(evt){
	console.log(evt)
	this.appearance.App_HyperlinkHoverText_Hax = evt.color.hex
	this.appearance.App_HyperlinkHoverText_R = evt.color.rgb.r
	this.appearance.App_HyperlinkHoverText_G = evt.color.rgb.g
	this.appearance.App_HyperlinkHoverText_B = evt.color.rgb.b
	this.appearance.App_HyperlinkHoverText_A = evt.color.rgb.a
}
title1color(evt){
	console.log(evt)
	this.appearance.App_Title1Color_Hax = evt.color.hex
	this.appearance.App_Title1Color_R = evt.color.rgb.r
	this.appearance.App_Title1Color_G = evt.color.rgb.g
	this.appearance.App_Title1Color_B = evt.color.rgb.b
	this.appearance.App_Title1Color_A = evt.color.rgb.a
}
title2color(evt){
	console.log(evt)
	this.appearance.App_Title2Color_Hax = evt.color.hex
	this.appearance.App_Title2Color_R = evt.color.rgb.r
	this.appearance.App_Title2Color_G = evt.color.rgb.g
	this.appearance.App_Title2Color_B = evt.color.rgb.b
	this.appearance.App_Title2Color_A = evt.color.rgb.a
}
loginBgcolor(evt){
	console.log(evt)
	this.appearance.App_LoginBackgroundColor_Hax = evt.color.hex
	this.appearance.App_LoginBackgroundColor_R = evt.color.rgb.r
	this.appearance.App_LoginBackgroundColor_G = evt.color.rgb.g
	this.appearance.App_LoginBackgroundColor_B = evt.color.rgb.b
	this.appearance.App_LoginBackgroundColor_A = evt.color.rgb.a
}
logintextColor(evt){
	console.log(evt)
	this.appearance.App_LoginTextColor_Hax = evt.color.hex
	this.appearance.App_LoginTextColor_R = evt.color.rgb.r
	this.appearance.App_LoginTextColor_G = evt.color.rgb.g
	this.appearance.App_LoginTextColor_B = evt.color.rgb.b
	this.appearance.App_LoginTextColor_A = evt.color.rgb.a
}
loginBtncolor(evt){
	console.log(evt)
	this.appearance.App_LoginButtonColor_Hax = evt.color.hex
	this.appearance.App_LoginButtonColor_R = evt.color.rgb.r
	this.appearance.App_LoginButtonColor_G = evt.color.rgb.g
	this.appearance.App_LoginButtonColor_B = evt.color.rgb.b
	this.appearance.App_LoginButtonColor_A = evt.color.rgb.a
}
saveSiteUrl(){
	if(!this.getSiteUrlFromDB){
		this.toster.error('URL already Exist', 'Error')
		return
	}else{
		this.toster.success('URL set successfully', 'Success')
	}
	var Site = new Object();
	var obj = {
		PhyO_Unique_ID :this.physicianUniqueId,                
		PhyO_Modify_Date :new Date(),
		PhyO_TimeZone:this.admin.UM_TimeZone,
		PhyO_SiteURL :this.siteUrl.value

	}
	console.log(obj)
	this.UserService.savePhySiteUrl(obj).subscribe((data)=>{
		console.log(data)
		this.ngOnInit()
		this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
	},err=>{
		console.log(err)
	})
}
saveAppearance(){
	var obj = {
		PhyO_Unique_ID :this.physicianUniqueId,                
		PhyO_Modify_Date :new Date(),
		PhyO_TimeZone:this.admin.UM_TimeZone,
		PhyO_Appearance :this.appearance

	}
	console.log(obj)
	this.UserService.savePhyAppearance(obj).subscribe((data)=>{
		console.log(data)
		this.setAccToSurgery.PhyO_Appearance = data.Data.PhyO_Appearance
		localStorage.removeItem('setAccToSurgery')
		localStorage.setItem('setAccToSurgery', JSON.stringify(this.setAccToSurgery))
		this.ngOnInit()
		this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
		window.location.reload()
	},err=>{
		console.log(err)
	})
}
saveLogo(){
	this.validmessage = 0
	var objArr = []
	objArr.push({

		"PhyO_Unique_ID" :this.physicianUniqueId,                
		"PhyO_Modify_Date" :new Date(),
		"PhyO_TimeZone":this.admin.UM_TimeZone,
		Slug:this.mySlug
	})

	// debugger
	var data = new FormData();
	var file1 = $('form input[type=file]')[0].files[0];
	var file2 = $('form input[type=file]')[1].files[0];
	var file3 = $('form input[type=file]')[2].files[0];
	console.log(file3)
	if(file1!=null)
		data.append('file1',file1);
	if(file2!=null)
		data.append('file2',file2);
	if(file3!=null){
		var ico  = file3.type.split("/")
		// if (ico[1] != 'x-icon') {
			// 	$("#make_blank").val(null);
			// 	this.validmessage = 1
			// 	return false
			// }
			data.append('file3',file3);
		}

		var objArr = [];
		objArr.push({PhyO_Unique_ID: this.physicianUniqueId, PhyO_Modify_Date: new Date(), PhyO_TimeZone: this.admin.UM_TimeZone, Slug:this.mySlug}); 
		data.append('objArr', JSON.stringify(objArr));
		console.log(objArr);
		console.log(JSON.stringify(objArr));
		console.log(data);
		var tthi = this
		$.ajax({
			//url: 'http://tchapi.thecloudhealth.com/API/physicianCenter/AddLogo',
			url: environment1.endPoint+'PhysicianOffice/AddLogos',
			processData: false,
			contentType: false,
			data: data,
			type: 'POST',
			success: function (response) {
				// debugger;
				alert('Data added successfully')
				console.log(response)
				tthi.setAccToSurgery.PhyO_Logo = response.Data.PhyO_Logo
				localStorage.removeItem('setAccToSurgery')
				localStorage.setItem('setAccToSurgery', JSON.stringify(tthi.setAccToSurgery))
				tthi.ngOnInit()
				window.location.reload()
			},
			failure: function (response) {
				// debugger;
				alert(response.responseText);
			},
			error: function (response) {
				// debugger;
				alert(response.responseText);
			}
		});

	}
	saveSlider(){
		if($('#bgImg')[0].files[0] == null){
			this.toster.warning(this.translate.instant('Please upload image'), this.translate.instant('Warning'))
			return
		}
		if($('#sliderImg')[0].files[0] == null){
			this.toster.warning(this.translate.instant('Please upload image'), this.translate.instant('Warning'))
			return
		}
		var data:any = new FormData();
		var file1 = $('#bgImg')[0].files[0]
		var file2 = $('#sliderImg')[0].files[0]
		data.append('file1',file1);
		data.append('file2',file2);
		var objArrPhyO = [];
		objArrPhyO.push({
			"PhyO_Unique_ID": this.physicianUniqueId,
			"PhyO_Modify_Date": new Date(),
			"PhyO_TimeZone": this.admin.UM_TimeZone,
			"PhyO_Create_By":this.admin.UM_Unique_ID,
			"PhyO_User_Name":this.admin.UM_Username

		}); 
		data.append('objArrPhyO', JSON.stringify(objArrPhyO));
		var objArrSlider = [];
		objArrSlider.push({
			"Slider_Title": this.slider.value.Slider_Title,
			"Slider_Description": this.slider.value.Slider_Descripti
		}); 
		console.log(objArrSlider)
		return
		data.append('objArrSlider', JSON.stringify(objArrSlider));
		var thhis = this
		$.ajax({
			url: environment1.endPoint+'PhysicianOffice/AddSliders',
			processData: false,
			contentType: false,
			data: data,
			type: 'POST',
			success: function (response) {
				// debugger;
				alert('Data added successfully')
				window.location.reload()
			},
			failure: function (response) {
				// debugger;
				alert(response.responseText);
			},
			error: function (response) {
				// debugger;
				alert(response.responseText);
			}
		});
	}

	saveFooter(){
		var obj = {
			PhyO_Unique_ID :this.physicianUniqueId,                
			PhyO_Modify_Date :new Date(),
			PhyO_TimeZone:this.admin.UM_TimeZone,
			PhyO_Footer :this.footer.value

		}
		console.log(obj)
		this.UserService.addPhyFooter(obj).subscribe((data)=>{
			console.log(data)
			this.setAccToSurgery.PhyO_Footer = data.Data.PhyO_Footer
			localStorage.removeItem('setAccToSurgery')
			localStorage.setItem('setAccToSurgery', JSON.stringify(this.setAccToSurgery))
			var newUpdatd = JSON.parse(localStorage.getItem('setAccToSurgery'))
			this.ngOnInit()
			this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
			window.location.reload()
		},err=>{
			console.log(err)
		})
	}

	saveMisc(){
		var obj = {
			PhyO_Unique_ID :this.physicianUniqueId,                
			PhyO_Modify_Date :new Date(),
			PhyO_TimeZone:this.admin.UM_TimeZone,
			PhyO_Miscellaneous :this.misc.value

		}
		console.log(obj)
		this.UserService.addPhyMiscellaneous(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
			this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
			window.location.reload()
		},err=>{
			console.log(err)
		})
	}
	removeTildSign(data){
		if(data){

			var getnew = data.replace("~", "");
		}
		return (getnew)
	}
	updateSliderStatus(list, evt){
		var data = {
			Slider_Unique_ID : list.Slider_Unique_ID,
			Slider_Is_Active : evt.checked

		}
		var obj = {
			PhyO_Unique_ID :this.physicianUniqueId,                
			PhyO_Modify_Date :new Date(),
			PhyO_TimeZone:this.admin.UM_TimeZone,
			PhyO_Slider :data

		}
		console.log(data)

		this.UserService.chnageStatusPhySlider(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
			window.location.reload()
		},err=>{
			console.log(err)
		})
	}
	isDeletedYes(){
		console.log(this.isSliderDeleted)
		var data = {
			Slider_Unique_ID : this.isSliderDeleted.Slider_Unique_ID,
			Slider_Is_Deleted : true

		}
		var obj = {
			PhyO_Unique_ID :this.physicianUniqueId,                
			PhyO_Modify_Date :new Date(),
			PhyO_TimeZone:this.admin.UM_TimeZone,
			PhyO_Slider :data

		}
		console.log(data)

		this.UserService.deletePhySlider(obj).subscribe((data)=>{
			console.log(data)
			this.ngOnInit()
			this.toster.success(this.translate.instant('Data updated successfully'), this.translate.instant('Success'))
		},err=>{
			console.log(err)
		})
		$("#trash").modal("hide");
		$('body').removeClass('modal-open');
	}
	dataDeleted(data){
		$("#trash").modal("show");
		console.log(data)
		this.isSliderDeleted = data
	}
	deletelogotemp(){
		this.LogoLoginImage = ""
	}
	deleteNavitemp(){
		this.LogoNavigationImage = ""
	}
	copyInputMessage(data:string){
		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = data;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}



	finalAction(){

		if(this.reqData.notificationstime == '' || this.reqData.notificationstime == undefined || this.reqData.notificationstime == null){
			this.toster.warning(this.translate.instant('Select Notification Time'), this.translate.instant('Warning'))
			return
		}

		var obj = {


			NTT_Time : 	this.reqData.notificationstime,
			NTT_Surgery_Physician_Center_ID :this.admin.UM_Surgary_Physician_CenterID,
			NTT_Office_Type : this.admin.UM_Office_Type,
			NTT_Created_By : this.admin.UM_Unique_ID,
			NTT_User_Name : this.admin.UM_Username,
			NTT_Create_Date : new Date(),
			NTT_Modify_Date : new Date(),
			NTT_Is_Active : true,
			NTT_Is_Deleted : false,
			NTT_TimeZone : this.admin.UM_TimeZone,
			Slug:''

		}
		console.log(obj);
		// return

		this.showLoader = true
		//  console.log(obj)
		//  return
		this.UserService.CreateNotificationTime(obj).subscribe((notificationtimingresponse)=>{
			console.log('Response :' +  JSON.stringify(notificationtimingresponse))

			this.showLoader = false
		},err=>{
			console.log(err)
		})
		this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
		this.router.navigate(['/dashboard'])

	}
	isURLExist(url){
		console.log(url)
		var obj = {
			Site_URL:url,
			Project_ID  : this.admin.Project_ID,
		}
		this.UserService.isURLExist(obj).subscribe((data)=>{
			console.log(data)
			this.getSiteUrlFromDB = data
			if(this.checksiteUrlFromNew != this.siteUrl.value.Site_URL){
				if(!data){
					this.toster.error('URL already Exist', 'Error')
					return
				}else{
					this.toster.success('URL available', 'Success')
				}
			}
		},err=>{
			console.log(err)
		})
	}


	// editSlider(list){
		// 	console.log(list)
		// 	$(".add_more_edit").click(function(){
			// 		$("#tableGrid").hide();
			// 		$("#addsliderBox").show();
			// 		$(this).hide();
			// 		$("#back_btn").show();
			// 		$("#add_more").hide()
			// 		$(".add-slider").hide()
			// 		$(".edit-slider").show()
			// 	});
			// 	this.slider.get('Slider_Title').setValue(list.Slider_Title);
			// 	this.slider.get('Slider_Description').setValue(list.Slider_Description);
			// 	var data:any = new FormData();
			// 	var file1 = $('#bgImg')[0].files[0]
			// 	var file2 = $('#sliderImg')[0].files[0]
			// 	data.append('file1',file1);
			// 	data.append('file2',file2);
			// 	var objArrPhyO = [];
			// 	objArrPhyO.push({
				// 		"PhyO_Unique_ID": this.physicianUniqueId,
				// 		"PhyO_Modify_Date": new Date(),
				// 		"PhyO_TimeZone": this.admin.UM_TimeZone,
				// 		"PhyO_Create_By":this.admin.UM_Unique_ID,
				// 		"PhyO_User_Name":this.admin.UM_Username

				// 	}); 
				// 	data.append('objArrPhyO', JSON.stringify(objArrPhyO));
				// 	var objArrSlider = [];
				// 	objArrSlider.push({
					// 		"Slider_Title": this.slider.value.Slider_Title,
					// 		"Slider_Description":  this.slider.value.Slider_Description.text
					// 	}); 
					// 	data.append('objArrSlider', JSON.stringify(objArrSlider));

					// 	$.ajax({
						// 		url: environment1.endPoint+'physicianCenter/AddSlider',
						// 		processData: false,
						// 		contentType: false,
						// 		data: data,
						// 		type: 'POST',
						// 		success: function (response) {
							// 			// debugger;
							// 			this.toster.success(this.translate.instant('Data added successfully'), this.translate.instant('Success'))
							// 		},
							// 		failure: function (response) {
								// 			// debugger;
								// 			alert(response.responseText);
								// 		},
								// 		error: function (response) {
									// 			// debugger;
									// 			alert(response.responseText);
									// 		}
									// 	});


									// }


								}
