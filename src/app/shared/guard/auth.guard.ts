import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public router: Router,private route: ActivatedRoute) {}
    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        if(localStorage.getItem('patientLogin')){
            return true;
        }else{
            this.router.navigate(['/not-found']);
        }

        this.router.navigate(['/login']);
        return false;
    }
}
