import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentListRoutingModule } from './appointment-list-routing.module';
import { AppointmentListComponent } from './appointment-list.component';
import { TranslateModule } from '@ngx-translate/core';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AppointmentListComponent],
  imports: [
    CommonModule,
    AppointmentListRoutingModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class AppointmentListModule { }
