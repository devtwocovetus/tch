import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router'
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { filter, pairwise } from 'rxjs/operators';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
	setAccToSurgery
	previousUrl
	currentUrl
	constructor(private title: Title,private router: Router) {
		console.log('im not fond', document.referrer)
		console.log('hitted url', document.location.href)
		

	}

	ngOnInit() {
		console
		this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Page Not Found - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Page Not Found - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Page Not Found - The Cloud Health')
		}
	}

}
