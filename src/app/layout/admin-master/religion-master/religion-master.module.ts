import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReligionMasterRoutingModule } from './religion-master-routing.module';
import { ReligionMasterComponent } from './religion-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [ReligionMasterComponent],
	imports: [
	CommonModule,
DataTablesModule,
	ReligionMasterRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	MatSlideToggleModule,
	TranslateModule
	]
})
export class ReligionMasterModule { }
