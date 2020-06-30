import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {environment1} from '../../../../environments/environment.prod'
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../../services/user.service'
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
declare var $:any
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	value
	admin
	setAccToSurgery
	imageLink
	siteLink
	userPermission
	reqData
	vcMainComp:boolean = false

	appointmentList
	masterAlert:boolean = false
	masterEquipment:boolean = false
	masterEthinicity:boolean = false
	masterDesignation:boolean = false
	documentCategory:boolean =false
	masterForms:boolean = false
	kbCategory:boolean =false
	masterInstrumentation:boolean = false
	masterLanguage:boolean = false
	masterNationality:boolean = false
	addNotiType
	masterPhysician:boolean = false
	masterRace:boolean = false
	masterReligion:boolean = false
	masterRight:boolean = false
	masterrole:boolean = false
	masterSurgery:boolean = false
	userPhysicain:boolean =false
	userSurgery:boolean =false
	masterIncident:boolean = false
	masterSupplies:boolean = false
	masterAnesthesia:boolean = false
	masterRelationship:boolean = false
	masterBlock:boolean = false
	masterIcdCode:boolean = false
	masterProcedure:boolean = false
	masterCpt:boolean = false
	masterSpecility:boolean = false
	appointmentHistory:boolean = false
	chat:boolean = false
	notifications:boolean = false
	intake:boolean = false
	knowledgeBase:boolean = false
	kbArticles:boolean = false
	languages:boolean = false
	medicalForm:boolean = false
	legalForm:boolean = false
	patientList:boolean = false
	systemEmail:boolean = false
	changePassword:boolean = false
	editSurgery = false
	surgeryCenterSettings = false
	physicianCenterSettings:boolean = false
	editPhysician:boolean = false
	vcHistory:boolean = false
	vcList:boolean = false
	walkinList:boolean = false
	quickList:boolean = false
	appointmentAdd:boolean = false
	quickBookingAdd:boolean = false
	walkinBookingAdd:boolean = false
	vcBookingAdd:boolean = false
	dash:string = "Dashboard"
	public config: PerfectScrollbarConfigInterface = {};

	@ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: false }) directiveRef?: PerfectScrollbarDirective;
	constructor(public router: Router, @Inject(DOCUMENT) private _document: HTMLDocument,
		private ref: ChangeDetectorRef,public UserService:UserService, private translate: TranslateService) { 
		// translate.setDefaultLang('en');
		// this.dashboard = 'Dashboard'
		// this.userPermission = []
		// this.userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		// console.log(this.userPermission)
		// translate.setDefaultLang('fr');
		this.reqData = {}
		this.imageLink = environment1.image
		this.siteLink = environment1.siteLink
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.getUserPermissions(this.admin)
	}
	getUserPermissions(admin){
		var mainId
		if(admin.UM_Member_ID){
			mainId = admin.UM_Member_ID
		}else{
			mainId = admin.UM_Unique_ID
		}
		var myObj ={
			Slug: admin.Slug,
			User_ID: mainId
		}
		this.UserService.getAllPermissionOfUser(myObj).subscribe((data2)=>{
			console.log(data2)
			localStorage.setItem('userPermission', JSON.stringify(data2.DataList));
			this.userPermission = data2.DataList
			this.userPermissionFunc(data2.DataList)

		},err=>{
			console.log(err)
		})
	}
	changeLang(language: string) {
		this.translate.use(language);
		localStorage.setItem('lang', language)

	}

	ngOnInit() {

		
		this.hidemenu()
		console.log(JSON.parse(localStorage.getItem('loginData')))
		console.log(this.setAccToSurgery)
		if(this.setAccToSurgery){

			if(this.setAccToSurgery.PhyO_Logo ){
				if(this.setAccToSurgery.PhyO_Logo.Logo_Fav_Image){
					var logoLink = this.removeTildSign(this.setAccToSurgery.PhyO_Logo.Logo_Fav_Image)
					this._document.getElementById('appFavicon').setAttribute('href', this.imageLink+logoLink);
				}
			}else if(this.setAccToSurgery.SurgC_Logo){
				if(this.setAccToSurgery.SurgC_Logo.Logo_Fav_Image){
					console.log('in the sur')
					var logoLink1 = this.removeTildSign(this.setAccToSurgery.SurgC_Logo.Logo_Fav_Image)
					this._document.getElementById('appFavicon').setAttribute('href', this.imageLink+logoLink1);
				}
			}
		}
		var aa = this
		$(document).ready(function(){
			if(this.setAccToSurgery){
				if(this.setAccToSurgery.SurgC_Appearance){
					setTimeout(function(){
						$(".menu li a").hover(function(){
							if(aa.setAccToSurgery){
								$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_Hyperlinktext_Hax);
							}else{
								$(this).css("background",'#2ca36c');
							}
						},
						function(){
							if(aa.setAccToSurgery){
								$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax);
							}else{
								$(this).css("background", 'green');
							}
						});
					}, 500);
				}else{
					console.log('fdsjbfds')
				}
			}

		});

	}
	onLoggedout() {
		localStorage.removeItem ('isLoggedin');
		localStorage.removeItem('loginData');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('patientLogin')
		localStorage.removeItem('userPermission')

		$("#logout").modal("hide");
		$('body').removeClass('modal-open');
		var uurrll = localStorage.getItem('getUrl')
		if(uurrll){
			localStorage.removeItem('getUrl');
			//window.location.href = 'http://localhost:4200/#'+uurrll
			window.location.href = this.siteLink+uurrll
		}else{
			this.router.navigate(['/login'])
		}
	}

	hidemenu(){
		setTimeout(function(){
			$('#my_table4').DataTable();

			$(".sidebar-dropdown > a").click(function() {
				$(".side-nav-dropdown").slideUp(200);
				if (
					$(this)
					.parent()
					.hasClass("active")
					) {
					$(".sidebar-dropdown").removeClass("active");
				$(this)
				.parent()
				.removeClass("active");
			} else {
				$(".sidebar-dropdown").removeClass("active");
				$(this)
				.next(".side-nav-dropdown")
				.slideDown(200);
				$(this)
				.parent()
				.addClass("active");
			}
		});
			$('.header .nav-toggle').on('click', function () {

				$(".left-bar").toggleClass('show-side-nav');
				$(".home").toggleClass('show-full');
				$(".right-bar .section-container").toggleClass('padding-full');

			});
			$('.menu li a').on('click', function () {

				if($(".home ").hasClass("show-full")){
					$('.home').removeClass('show-full');
					$('.left-bar').removeClass('show-side-nav');
				}

			});
		}, 150);

	}
	removeTildSign(data){
		if(data){

			var getnew = data.replace("~", "");
		}
		return (getnew)
	} //kb-category
	userPermissionFunc(userPermission){
		userPermission.forEach((element, index) => {
			if(element.Page_Name == 'appointment-list' && element.Is_View){
				this.appointmentList = true
			}if(element.Page_Name == 'appointment-list' && element.Is_Add){
				this.appointmentAdd = true
			}if(element.Page_Name == 'master-alert' && element.Is_View){
				this.masterAlert = true
			}if(element.Page_Name == 'master-equipment' && element.Is_View){
				this.masterEquipment = true
			}if(element.Page_Name == 'master-ethinicity' && element.Is_View){
				this.masterEthinicity = true
			}if(element.Page_Name == 'master-designation' && element.Is_View){
				this.masterDesignation = true
			}if(element.Page_Name == 'document-category' && element.Is_View){
				this.documentCategory = true
			}if(element.Page_Name == 'master-forms' && element.Is_View){
				this.masterForms = true
			}if(element.Page_Name == 'kb-category' && element.Is_View){
				this.kbCategory = true
			}if(element.Page_Name == 'master-instrumentation' && element.Is_View){
				this.masterInstrumentation = true
			}if(element.Page_Name == 'master-language' && element.Is_View){
				this.masterLanguage = true
			}if(element.Page_Name == 'master-nationality' && element.Is_View){
				this.masterNationality = true
			}if(element.Page_Name == 'add-notification-type' && element.Is_View){
				this.addNotiType = true
			}if(element.Page_Name == 'master-race' && element.Is_View){
				this.masterRace = true
			}if(element.Page_Name == 'master-religion' && element.Is_View){
				this.masterReligion = true
			}if(element.Page_Name == 'master-right' && element.Is_View){
				this.masterRight = true
			}if(element.Page_Name == 'master-role' && element.Is_View){
				this.masterrole = true
			}if(element.Page_Name == 'master-surgery' && element.Is_View){
				this.masterSurgery = true
			}if(element.Page_Name == 'master-user/physician' && element.Is_View){
				this.userPhysicain = true
			}if(element.Page_Name == 'master-user/surgery' && element.Is_View){
				this.userSurgery = true
			}if(element.Page_Name == 'master-incident' && element.Is_View){
				this.masterIncident = true
			}if(element.Page_Name == 'master-supplies' && element.Is_View){
				this.masterSupplies = true
			}if(element.Page_Name == 'master-anesthesia' && element.Is_View){
				this.masterAnesthesia = true
			}if(element.Page_Name == 'master-relationship' && element.Is_View){
				this.masterRelationship = true
			}if(element.Page_Name == 'master-block' && element.Is_View){
				this.masterBlock = true
			}if(element.Page_Name == 'master-icd-code' && element.Is_View){
				this.masterIcdCode = true
			}if(element.Page_Name == 'master-procedure' && element.Is_View){
				this.masterProcedure = true
			}if(element.Page_Name == 'master-cpt' && element.Is_View){
				this.masterCpt = true
			}if(element.Page_Name == 'master-specility' && element.Is_View){
				this.masterSpecility = true
			}if(element.Page_Name == 'appointment-history'  && element.Is_View){
				this.appointmentHistory = true
			}if(element.Page_Name == 'chat'  && element.Is_View){
				this.chat = true
			}if(element.Page_Name == 'notifications'  && element.Is_View){
				this.notifications = true
			}if(element.Page_Name == 'intake'  && element.Is_View){
				this.intake = true
			}if(element.Page_Name == 'knowledge-base'  && element.Is_View){
				this.knowledgeBase = true
			}if(element.Page_Name == 'kb-articles'  && element.Is_View){
				this.kbArticles = true
			}if(element.Page_Name == 'languages'  && element.Is_View){
				this.languages = true
			}if(element.Page_Name == 'medical-form'  && element.Is_View){
				this.medicalForm = true
			}if(element.Page_Name == 'legal-form'  && element.Is_View){
				this.legalForm = true
			}if(element.Page_Name == 'patient-list'  && element.Is_View){
				this.patientList = true
			}if(element.Page_Name == 'master-physician'  && element.Is_View){
				this.masterPhysician = true
			}if(element.Page_Name == 'system-email'  && element.Is_View){
				this.systemEmail = true
			}if(element.Page_Name == 'change-password'  && element.Is_View){
				this.changePassword = true
			}if(element.Page_Name == 'edit-surgery-center'  && element.Is_View){
				this.editSurgery = true
			}if(element.Page_Name == 'surgery-center-settings'  && element.Is_View){
				this.surgeryCenterSettings = true
			}if(element.Page_Name == 'physician-center-settings'  && element.Is_View){
				this.physicianCenterSettings = true
			}if(element.Page_Name == 'edit-physician-office'  && element.Is_View){
				this.editPhysician = true
			}if(element.Page_Name == 'vc-history'  && element.Is_View){
				this.vcHistory = true
			}if(element.Page_Name == 'vc-list'  && element.Is_View){
				this.vcList = true
			}if(element.Page_Name == 'walkin-list'  && element.Is_View){
				this.walkinList = true
			}if(element.Page_Name == 'quick-booking-list'  && element.Is_View){
				this.quickList = true
			}if(element.Page_Name == 'quick-booking-list'  && element.Is_Add){
				this.quickBookingAdd = true
			}if(element.Page_Name == 'walkin-list'  && element.Is_Add){
				this.walkinBookingAdd = true
			}if(element.Page_Name == 'vc-list'  && element.Is_Add){
				this.vcBookingAdd = true
			}
		})
if(this.vcList || this.vcHistory){
	$('.vcHide').show()
}else{
	$('.vcHide').hide()
}
if(this.appointmentList || this.appointmentHistory){
	$('.appHide').show()
}else{
	$('.appHide').hide()
}
if(this.medicalForm || this.legalForm){
	$('.patform').show()
}else{
	$('.patform').hide()
}
if(this.notifications || this.intake){
	$('.commMod').show()
}else{
	$('.commMod').hide()
}
if(this.knowledgeBase || this.kbCategory){
	$('.knwbse').show()
}else{
	$('.knwbse').hide()
}
if(this.userSurgery || this.userPhysicain){
	$('.staffmsgnt').show()
}else{
	$('.staffmsgnt').hide()
}
if(this.userPhysicain){
	$('.staffPhy').show()
}else{
	$('.staffPhy').hide()
}
if(this.masterAlert || this.masterEquipment || this.masterDesignation || this.documentCategory || this.masterForms || this.masterIncident || this.kbCategory || this.masterInstrumentation || this.addNotiType || this.masterSupplies){
	$('.phyMstrLib').show()
}else{
	$('.phyMstrLib').hide()
}
if(this.masterAlert || this.masterAnesthesia || this.masterBlock || this.masterCpt || this.masterEquipment || this.masterDesignation || this.documentCategory || this.masterForms || this.masterIcdCode || this.masterIncident || this.kbCategory || this.masterInstrumentation || this.addNotiType || this.masterProcedure || this.masterSupplies){
	$('.SurMstrLib').show()
}else{
	$('.SurMstrLib').hide()
}
this.laodthis()
}
laodthis(){
	var aa  = this
				$(document ).ready(function() {
					setTimeout(function(){

						if(aa.admin.UM_Office_Type == 'S'){
							if(aa.setAccToSurgery){

								if(aa.setAccToSurgery.SurgC_Appearance){

									$(".mh-right a").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
									$('.mh-right a').css('border', 'solid 1px '+ aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									// $(".btntext").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
									$(".btnsubmit").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
									$(".btnsubmit").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax)
									$(".header").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorDark_Hax)
									$(".h1.add-button").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax)
									$('.h1.add-button').css('border', 'solid 1px '+ aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax);
									$("h3.title_text").css("color", aa.setAccToSurgery.SurgC_Appearance.App_Title2Color_Hax)
									$(".btn-primary").css("background-color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)
									$('.btn-primary').css('border', 'solid 1px '+ aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									$(".kt-nav__link-text").css("color", '#9492a1')
									// $(".menu li a.active").css("cssText", "background: blue !important;");
									// $(".kt-nav__link").css("border-left", '3px solid'+aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax)

									// .ui-state-disabled

								}else{
									$(".header").css("background-color", '#006400')
								}
							}else{
								$(".mh-right a").css("background-color",'#04a8c5');
								// $(".btntext").css("background-color",'#04a8c5');
								$(".btnsubmit").css("background-color",'#04a8c5');
								$(".header").css("background-color", '#006400')
								// $(".btncancel").css("background-color",'#fff');
							}

							if(aa.setAccToSurgery){

								if(aa.setAccToSurgery.SurgC_Appearance){
									$('table.dataTable thead th').css("background", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax);

								}else{
									$('table.dataTable thead th').css("background", '#2ca36d');
								}
								if(aa.setAccToSurgery.SurgC_Appearance){

									$("h1").css("color", aa.setAccToSurgery.SurgC_Appearance.App_Title1Color_Hax);
									$(".menu li a.active, .menu li:hover, .menu li:focus").hover(function(){

										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									},
									function(){
										$(this).css("background", '#fff');
									}
									);
								}
							}else{
								$("h1").css("color", "#2ca36c");
							}
							$(".left-bar .nav > li > a").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_HyperlinkHoverText_Hax);
									}
								}else{

									$(this).css("background",'#fff');
									$(this).css("color", "");
								}
							},

							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_HyperlinkHoverText_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
									$(this).css("color", "");
								}
							}
							);
							if(aa.setAccToSurgery){
								if( aa.setAccToSurgery.SurgC_Appearance){
									$(".mh-right a").css("color", aa.setAccToSurgery.SurgC_Appearance.App_ButtonText_Hax);
								}

							}else{
								$(".mh-right a").css("color", "#2ca36c");
								// $(".mh-right a").css("color", "#04a8c5");
							}

							$(".mh-right a").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{

									$(this).css("background",'#fff');
									$(this).css("color", "");
								}
							},

							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
									$(this).css("color", "");
								}
							}
							);

							$(".btntext").hover(function(){
								if(aa.setAccToSurgery){
									if( aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							}
							);
							$(".btnsubmit").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							});
							$(".btn-primary").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.SurgC_Appearance){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							});
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.SurgC_Appearance){
									$('.kt-nav__link-text').hover(function () {
										$(this).css('color', aa.setAccToSurgery.SurgC_Appearance.App_ButtonMouseHover_Hax);
									},
									function () {
										$(this).css('color', '#9492a1');
									});
								}
							}

							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.SurgC_Appearance){
									$(".menu li a").hover(function(){

										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_HyperlinkHoverText_Hax);
									},
									function(){
										$(this).css("background", aa.setAccToSurgery.SurgC_Appearance.App_NavigationColorLight_Hax);
									}
									);
								}
							}else{
								$(".menu li a").hover(function(){

									$(this).css("background", '#2ca36c');
								},
								function(){
									$(this).css("background", 'green');
								}
								);
							}
						}else if(aa.admin.UM_Office_Type == 'P' || aa.admin.UM_Office_Type == 'PA'){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(".mh-right a").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
									$('.mh-right a').css('border', 'solid 1px '+ aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									$(".btntext").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
									$(".btnsubmit").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
									$(".btnsubmit").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax)
									$(".btn-primary").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
									$('.btn-primary').css('border', 'solid 1px '+ aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									$(".kt-nav__link-text").css("color", '#9492a1')
									$(".header").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorDark_Hax)
									$(".h1.add-button").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax)
									$('.h1.add-button').css('border', 'solid 1px '+ aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax);
									$("h3.title_text").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title2Color_Hax)
									$(".ui-state-disabled").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax)
									$(".main-heading h1").css("color", "red!important")
								}else{
									$(".header").css("background-color", '#006400')
								}
							}else{
								$(".mh-right a").css("background-color",'#04a8c5');
								$(".btntext").css("background-color",'#04a8c5');
								$(".btnsubmit").css("background-color",'#04a8c5');
								$(".header").css("background-color", '#006400')
								// $(".btncancel").css("background-color",'#fff');
							}

							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){

									$("h1").css("color", aa.setAccToSurgery.PhyO_Appearance.App_Title1Color_Hax);
								}
							}else{
								$("h1").css("color", "#2ca36c");
							}
							if(aa.setAccToSurgery){
								if( aa.setAccToSurgery.PhyO_Appearance){
									$(".mh-right a").css("color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonText_Hax);
								}

							}else{
								$(".mh-right a").css("color", "#fff");
								// $(".mh-right a").css("color", "#04a8c5");
							}

							$(".mh-right a").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{

									$(this).css("background",'#fff');
									$(this).css("color", "");
								}
							},

							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
									$(this).css("color", "");
								}
							}
							);
							$(".btntext").hover(function(){
									if(aa.setAccToSurgery){
										if(aa.setAccToSurgery.PhyO_Appearance){
											$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
										}
									}else{

										$(this).css("background",'#fff');
										$(this).css("color", "");
									}
								},

								function(){
									if(aa.setAccToSurgery){
										if(aa.setAccToSurgery.PhyO_Appearance){
											$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
										}
									}else{
										$(this).css("background",'#04a8c5');
										$(this).css("color", "");
									}
								});
							//kt-nav__link-text
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$('.kt-nav__link-text').hover(function () {
										$(this).css('color', aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
									},
									function () {
										$(this).css('color', '#9492a1');
									});
								}

							}				$(".btntext").hover(function(){
								if(aa.setAccToSurgery){
									if( aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							}
							);
							$(".btnsubmit").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							});
							$(".btn-primary").hover(function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonMouseHover_Hax);
									}
								}else{
									$(this).css("background",'#fff');
								}
							},
							function(){
								if(aa.setAccToSurgery){
									if(aa.setAccToSurgery.PhyO_Appearance){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax);
									}
								}else{
									$(this).css("background",'#04a8c5');
								}
							});
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.PhyO_Appearance){
									$(".menu li a").hover(function(){

										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_HyperlinkHoverText_Hax);
									},
									function(){
										$(this).css("background", aa.setAccToSurgery.PhyO_Appearance.App_NavigationColorLight_Hax);
									}
									);
								}
							}else{
								$(".menu li a").hover(function(){

									$(this).css("background", '#2ca36c');
								},
								function(){
									$(this).css("background", 'green');
								}
								);
							}

						}else{
							// $(".nav").css("background",'red');
							$(".header").css('background-color', '#006400')
							$(".menu li a").hover(function(){

								$(this).css("background", '#2ca36c');
							},
							function(){
								$(this).css("background", 'green');
							}
							);
						}
					}, 50);

});
}

}
