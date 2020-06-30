import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickBookingListRoutingModule } from './quick-booking-list-routing.module';
import { QuickBookingListComponent } from './quick-booking-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [QuickBookingListComponent],
  imports: [
    CommonModule,
    QuickBookingListRoutingModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class QuickBookingListModule { }
