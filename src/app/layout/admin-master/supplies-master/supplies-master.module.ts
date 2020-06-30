import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesMasterRoutingModule } from './supplies-master-routing.module';
import { SuppliesMasterComponent } from './supplies-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SuppliesMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    SuppliesMasterRoutingModule,
    FormsModule,
	ReactiveFormsModule,
	MatSlideToggleModule,
	TranslateModule,
  ]
})
export class SuppliesMasterModule { }
