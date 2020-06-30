import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $:any
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	c_url
	last_urls_str
	setAccToSurgery
	admin
	constructor(public router: Router, private ref: ChangeDetectorRef, private translate: TranslateService) {
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
	}

	ngOnInit() {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		// console.log(this.admin)
	}
	changeOfRoutes1(evt){
		// $.noConflict();
		window.scrollTo(0, 0);
		var bb  = this
		setTimeout(function(){ 
			// console.log(bb.setAccToSurgery)
			$("table.dataTable").wrap("<div class='table-responsive'></div>");  
			// setTimeout(function(){ 
				// var color = $( '.table thead th' ).css( "background-color" );
				// $( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
				// }, 100);

			}, 2500);
		// setTimeout(function(){ 
			// 	 var color = $( '.table thead th' ).css( "background-color" );
			// 		$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
			// 	$(".mat-checked input:checkbox").change(function() {
				// 		var color = $( '.table thead th' ).css( "background-color" );
				// 		var ischecked= $(this).is(':checked');
				// 		if(!ischecked)
				// 			$( ".mat-slide-toggle-thumb" ).css( "background-color", "#ffffff");
				// 		else 
				// 		 var color = $( '.table thead th' ).css( "background-color" );
				// 		$( ".mat-checked .mat-slide-toggle-thumb" ).css( "background-color", color);
				// 	});
				// 	// $(".mat-accent .mat-slide-toggle-thumb").css("background-color", '#ffffff!important')
				// 	// var str = str.replace(";", "");
				// }, 1000);

				this.c_url = this.router.url
				this.last_urls_str = this.c_url.substr(this.c_url.lastIndexOf('/') + 1);
				var last_urls_str1 = this.c_url.slice(1, 6);
				$('body').addClass('home');

				var aa  = this
				$(document ).ready(function() {
					setTimeout(function(){

						if(aa.admin.UM_Office_Type == 'S'){
							if(aa.setAccToSurgery){
								if(aa.setAccToSurgery.SurgC_Appearance){
									// alert('hy')W

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
									
									// $(".menu li a.active").css("background", 'red')
									// $('.menu li').click(function() {
										// 	$(this).closest('ul').find('li.active').removeClass('active');
										// 	$(this).addClass('active');
										// });
										// $(".menu li a.active").css("background-color", 'red')
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
										// $(".btntext").css("background-color", aa.setAccToSurgery.PhyO_Appearance.App_ButtonBackground_Hax)
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

								}			
								$(".btntext").hover(function(){
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
								$(".col-sm-12 btntext").hover(function(){
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
						}, 100);

});

}
}
