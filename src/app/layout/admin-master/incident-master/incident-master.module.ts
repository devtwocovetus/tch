import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentMasterRoutingModule } from './incident-master-routing.module';
import { IncidentMasterComponent } from './incident-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [IncidentMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    IncidentMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class IncidentMasterModule { }
