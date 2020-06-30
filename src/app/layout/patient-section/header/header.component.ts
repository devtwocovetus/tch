import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service'
import {environment1} from '../../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

declare var $:any
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	admin
	setAccToSurgery
	constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService,  private toster: ToastrService) { }

	ngOnInit() {
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		this.hidemenu()
	}
	logOut(){
		localStorage.removeItem ('isLoggedin');
		localStorage.removeItem('loginData');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('setAccToSurgery');
		localStorage.removeItem('patientLogin')
		this.router.navigate(['/'])
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

}
