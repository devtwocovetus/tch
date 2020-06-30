import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientListRoutingModule } from './patient-list-routing.module';
import { PatientListComponent } from './patient-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [PatientListComponent],
  imports: [
    CommonModule,
    PatientListRoutingModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class PatientListModule { }
