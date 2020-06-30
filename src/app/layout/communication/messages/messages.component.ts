import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {environment1} from '../../../../environments/environment.prod';
import * as tz from 'moment-timezone';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $:any

import { ActivatedRoute } from '@angular/router';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

declare var $:any
@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  maxDate = new Date()
  maxDate1 = new Date()
  admin	
  setAccToSurgery
  constructor(private UserService:UserService, private router:Router,
		private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService,
		private route: ActivatedRoute) {
  			this.admin = JSON.parse(localStorage.getItem('loginData'))
  		}

  ngOnInit() {
  	this.setAccToSurgery = JSON.parse(localStorage.getItem('setAccToSurgery'))
		if(this.setAccToSurgery){
			if(this.setAccToSurgery.PhyO_DBA_Name){
				this.title.setTitle('Messages - ' +  this.setAccToSurgery.PhyO_DBA_Name)
			}else if(this.setAccToSurgery.SurgC_DBA_Name){
				this.title.setTitle('Messages - ' +  this.setAccToSurgery.SurgC_DBA_Name)
			}
		}else{
			this.title.setTitle('Messages - The Cloud Health')
		}
		this.validatphone()
	}
	validatphone(){
		$(document).ready(function () {
			// format SSN 
			$('input.phoneno').on('keyup', function(){
				var val = this.value.replace(/\D/g, '');
				var newVal = '';
				newVal = $('input.phoneno').val()
				var numbers = newVal.replace(/\D/g, ''),
				char = {0:'(',3:')-',6:'-'};
				newVal = '';
				for (var i = 0; i < numbers.length; i++) {
					newVal += (char[i]||'') + numbers[i];
				}
				this.value = newVal; 

			});
		});
	}

}
