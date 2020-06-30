import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EthinicityMasterRoutingModule } from './ethinicity-master-routing.module';
import { EthinicityMasterComponent } from './ethinicity-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [EthinicityMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    EthinicityMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class EthinicityMasterModule { }
