import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [PatientDashboardComponent],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class PatientDashboardModule { }
