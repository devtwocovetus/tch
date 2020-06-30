import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterIcd10RoutingModule } from './master-icd10-routing.module';
import { MasterIcd10Component } from './master-icd10.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterIcd10Component],
  imports: [
    CommonModule,
DataTablesModule,
    MasterIcd10RoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class MasterIcd10Module { }
