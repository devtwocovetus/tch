import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {environment1} from '../../../../environments/environment.prod'
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	imageLink
	admin
	setAccToSurgery
	version
	getFooterName = ''
	constructor(public router: Router, private ref: ChangeDetectorRef) { 
		this.imageLink = environment1.image
	}

	ngOnInit() {
		this.version = '0.0.1'
		this.admin = JSON.parse(localStorage.getItem('loginData'))
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		// if(this.setAccToSurgery.PhyO_Footer){
		// 	this.setAccToSurgery.SurgC_Footer = this.setAccToSurgery.PhyO_Footer
		// }
		// console.log('updated', this.setAccToSurgery)
	}
	foooter_value(value){
		// console.log(value, 'gnsdjk')
		this.getFooterName = value
		localStorage.removeItem('setAccToSurgery')
		this.ref.detectChanges();
		localStorage.setItem('setAccToSurgery', JSON.stringify(value))
		this.ngOnInit()
		
	}

}
