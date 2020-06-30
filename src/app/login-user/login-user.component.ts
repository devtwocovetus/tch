import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
	SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
	declare var $:any
	@Component({
		selector: 'app-login-user',
		templateUrl: './login-user.component.html',
		styleUrls: ['./login-user.component.css']
	})
	export class LoginUserComponent implements OnInit {
		reqData
		showLoader
		getRouterLink
		public slides = [
		'First slide',
		'Second slide',
		'Third slide',
		'Fourth slide',
		'Fifth slide',
		'Sixth slide'
		];
		public config: SwiperConfigInterface = {
			a11y: false,
			direction: 'horizontal',
			slidesPerView: 1,
			keyboard: true,
			mousewheel: true,
			scrollbar: false,
			navigation: true,
			pagination: true
		};
		private scrollbar: SwiperScrollbarInterface = {
			el: '.swiper-scrollbar',
			hide: false,
			draggable: true
		};

		private pagination: SwiperPaginationInterface = {
			el: '.swiper-pagination',
			clickable: true,
			hideOnClick: false
		};

		@ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
		@ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
		constructor(public router: Router, public UserService:UserService,
			private toastr: ToastrService, private ref: ChangeDetectorRef) { }

		ngOnInit() {
			this.reqData = {}
			localStorage.setItem('getUrl', this.router.url)
		}
		onLoggedin() {
		// localStorage.setItem('isLoggedin', 'true');
		// this.router.navigate(['/dashboard'])
		if(this.reqData.email == '' || this.reqData.email == undefined || this.reqData.email == null && this.reqData.password == '' || this.reqData.password == undefined || this.reqData.password == null){
			this.toastr.error('Please enter email and password', 'Error')
			return
		}else if(this.reqData.email == '' || this.reqData.email == undefined || this.reqData.email == null){
			this.toastr.error('Please enter email', 'Error')
			return
		}else if(this.reqData.password == '' || this.reqData.password == undefined || this.reqData.password == null){
			this.toastr.error('Please enter password', 'Error')
			return
		}
		var obj = {
			UM_Email:this.reqData.email,
			UM_Password:this.reqData.password,
			Project_ID:""
		}
		console.log(obj)
		this.showLoader = true
		this.UserService.Login(obj).subscribe((data)=>{
			if(data.Status == 1){
				localStorage.setItem('loginData', JSON.stringify(data.Data));
				// getPhysicianSetting
				if(data.Data.UM_Role_Type == "Patient"){
					console.log('im in patient')
					localStorage.setItem('patientLogin', 'true');
					var obj00 = {
						PhyO_Unique_ID:data.Data.UM_Surgary_Physician_CenterID,
						Slug: data.Data.UM_Slug_PO
					}
					this.UserService.getPhysicianSetting(obj00).subscribe((data2)=>{
						console.log(data2)
						localStorage.setItem('setAccToSurgery', JSON.stringify(data2.Data))
						var mythis = this
						setTimeout(function(){ 
							mythis.router.navigate(['/dashboard'])  
						}, 2000);
						// this.router.navigate(['/patient-dashboard'])
						// this.router.navigate(['/dashboard'])
					},err=>{
						console.log(err)
					})
				}
				if(data.Data.UM_Office_Type == 'S'){
					
					console.log('im in surgery')
					localStorage.setItem('isLoggedin', 'true');
					var obj1 = {
						SurgC_Unique_ID:data.Data.UM_Surgary_Physician_CenterID,
						Slug: data.Data.UM_Slug_SC
					}
					this.UserService.findOneSurgeryCenter(obj1).subscribe((data1)=>{
						console.log(data1)
						
						localStorage.setItem('setAccToSurgery', JSON.stringify(data1.Data))
						var mythis = this
						setTimeout(function(){ 
							mythis.router.navigate(['/dashboard'])  
						}, 2000);
						// this.router.navigate(['/dashboard'])
					},err=>{
						console.log(err)
					})
				}else if(data.Data.UM_Office_Type == 'P'){
					
					console.log('im in physican')
					localStorage.setItem('isLoggedin', 'true');
					var obj2 = {
						PhyO_Unique_ID:data.Data.UM_Surgary_Physician_CenterID,
						Slug: data.Data.UM_Slug_PO
					}
					this.UserService.getPhysicianSetting(obj2).subscribe((data2)=>{
						console.log(data2)
						localStorage.setItem('setAccToSurgery', JSON.stringify(data2.Data))
						var mythis = this
						setTimeout(function(){ 
							mythis.router.navigate(['/dashboard'])  
						}, 2000);
						// this.router.navigate(['/dashboard'])
					},err=>{
						console.log(err)
					})
				}else if(data.Data.UM_Office_Type == 'A'){
					console.log('im in admin')
					localStorage.setItem('isLoggedin', 'true');
					var mythis = this
					setTimeout(function(){ 
						mythis.router.navigate(['/dashboard'])  
					}, 2000);
					// this.router.navigate(['/dashboard'])
				}
			}else{

				this.toastr.warning('Please enter correct email or password', 'Warning')
			}
			console.log('admin',localStorage.getItem('isLoggedin'),'patient',localStorage.getItem('patientLogin'))
			
			// this.router.navigate(['/dashboard'])
			this.showLoader = false
		},err=>{   
			console.log(err)
		})

	}

	}
