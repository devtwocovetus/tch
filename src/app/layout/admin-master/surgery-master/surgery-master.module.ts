import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurgeryMasterRoutingModule } from './surgery-master-routing.module';
import { SurgeryMasterComponent } from './surgery-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [SurgeryMasterComponent],
	imports: [
	CommonModule,
DataTablesModule,
	SurgeryMasterRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	MatSlideToggleModule,
	GooglePlaceModule,
	TranslateModule,
	]
})
export class SurgeryMasterModule { }
