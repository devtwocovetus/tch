import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicianMasterRoutingModule } from './physician-master-routing.module';
import { PhysicianMasterComponent } from './physician-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [PhysicianMasterComponent],
	imports: [
	CommonModule,
DataTablesModule,
	PhysicianMasterRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	MatSlideToggleModule,
	GooglePlaceModule,
	TranslateModule
	]
})
export class PhysicianMasterModule { }
