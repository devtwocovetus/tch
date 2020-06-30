import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Compiler } from '@angular/core';
declare var $:any
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import {environment1} from '../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'the-cloud-health';
	c_url
	last_urls_str
	setAccToSurgery
	admin
	siteLink
	constructor(public router: Router, private compiler:Compiler, private bnIdle: BnNgIdleService,
		private translate: TranslateService) {
		this.siteLink = environment1.siteLink
		$('body').removeClass('mat-typography');
		this.bnIdle.startWatching(1800).subscribe((res) => {
			if (res) {
				localStorage.removeItem ('isLoggedin');
				localStorage.removeItem('loginData');
				localStorage.removeItem('setAccToSurgery');
				localStorage.removeItem('setAccToSurgery');
				localStorage.removeItem('patientLogin')
				localStorage.removeItem('userPermission')

				// $("#logout").modal("hide");
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
		});
		// $.getJSON("https://api.ipify.org?format=json", function(data) { 
  //           console.log(data.ip)
  //       }) 
	}

	ngOnInit() {
		this.compiler.clearCache()
		if(localStorage.getItem('setAccToSurgery')){
			this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		}
		this.admin = JSON.parse(localStorage.getItem('loginData'))


	}
	changeOfRoutes(event){
		window.scroll(0,0);
		this.c_url = this.router.url
		this.last_urls_str = this.c_url.substr(this.c_url.lastIndexOf('/') + 1);
		var last_urls_str1 = this.c_url.slice(1, 6);
		if(this.last_urls_str=='login'){
			$('body').removeClass('home');
		}else{
			$('body').addClass('home');
		} 
		if(this.last_urls_str=='not-found'){
			$('body').removeClass('home');
		}else{
			$('body').addClass('home');
		} 
		// $.noConflict();
		
		
		

	}
}
