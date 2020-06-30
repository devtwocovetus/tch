// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { ToastrService } from 'ngx-toastr';
declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    reqData
	showLoader
	getMyslug
	  emailcheak = false;

	constructor(public router: Router, public UserService:UserService,
	 private toastr: ToastrService, private ref: ChangeDetectorRef) {
	 this.getMyslug  = 'tch'
	  }

	ngOnInit() {
		
		this.reqData = {}
		this.reqData.gender = '';
		console.log(this.router.url)
		localStorage.setItem('getUrl', this.router.url)
	}

alidateEmail(sEmail) {
        var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

        if(!sEmail.match(reEmail)) {
          this.toastr.error('Invalid Email Address');
          return false;
        }

        return  this.emailcheak = true;

      }

	onSignup() {
		if(this.reqData.firstname == '' || this.reqData.firstname == undefined || this.reqData.firstname == null){
			this.toastr.error('Please enter first name', 'Error')
			return
		}else if(this.reqData.lastname == '' || this.reqData.lastname == undefined || this.reqData.lastname == null){
			this.toastr.error('Please enter last name', 'Error')
			return
		}
		else if(this.reqData.number == '' || this.reqData.number == undefined || this.reqData.number == null){
			this.toastr.error('Please enter number', 'Error')
			return
		}
		else if(this.reqData.dob == '' || this.reqData.dob == undefined || this.reqData.dob == null){
			this.toastr.error('Please enter Date of birth', 'Error')
			return
		}else if(this.reqData.gender == '' || this.reqData.gender == undefined || this.reqData.gender == null){
			this.toastr.error('Please select  gender', 'Error')
			return
		}
		
		else if(this.reqData.email == '' || this.reqData.email == undefined || this.reqData.email == null){
			this.toastr.error('Please enter email', 'Error')
			return
		}
		else if(this.reqData.password == '' || this.reqData.password == undefined || this.reqData.password == null){
			this.toastr.error('Please enter password', 'Error')
			return
		}
					var addUser = {
						UM_Username: this.reqData.firstname + this.reqData.lastname,
						UM_Password: this.reqData.password,
						UM_Email: this.reqData.email,
						UM_PhoneNo: this.reqData.number,
						// UM_Surgary_Physician_CenterID: phy_sur_id,
						// UM_Office_Type: ofcetype,
						// UM_Role_Type: this.form.value.Staff_Role_Name,
						// UM_Created_By: this.admin.UM_Username,
						// UM_Create_Date: new Date(),
						// UM_Modify_Date: new Date(),
						// UM_Is_Active: true,
						// UM_TimeZone:this.admin.UM_TimeZone,
						// UM_User_Name :this.admin.UM_Username,
						// Project_ID  : this.admin.Project_ID,
						// Slug: this.mySlug
					}
					this.UserService.addUser(addUser).subscribe((data)=>{
						console.log(data)
						this.toastr.success('Data added successfully', 'Success')

					},err=>{
						console.log(err)
					})
		//  var obj = {
		//  	UM_Email:this.reqData.email,
		//  	UM_Password:this.reqData.password,
		//  	Project_ID:""
		// }
		// console.log(obj)
		// this.showLoader = true
		// this.UserService.Login(obj).subscribe((data)=>{
			
		// 	this.showLoader = false
		// },err=>{
		// 	console.log(err)
		// })
		console.log(this.reqData);
		// localStorage.setItem('isLoggedin', 'true');
		this.router.navigate(['/patients'])
		

	}
}