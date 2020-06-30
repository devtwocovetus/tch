import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationalityMasterRoutingModule } from './nationality-master-routing.module';
import { NationalityMasterComponent } from './nationality-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [NationalityMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    NationalityMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class NationalityMasterModule { }
