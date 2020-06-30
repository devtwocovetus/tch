import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterBlockRoutingModule } from './master-block-routing.module';
import { MasterBlockComponent } from './master-block.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [MasterBlockComponent],
	imports: [
	CommonModule,
DataTablesModule,
	MasterBlockRoutingModule,
	MatSlideToggleModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule,
	]
})
export class MasterBlockModule { }
