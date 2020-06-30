import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentHistoryRoutingModule } from './appointment-history-routing.module';
import { AppointmentHistoryComponent } from './appointment-history.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AppointmentHistoryComponent],
  imports: [
    CommonModule,
    AppointmentHistoryRoutingModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class AppointmentHistoryModule { }
