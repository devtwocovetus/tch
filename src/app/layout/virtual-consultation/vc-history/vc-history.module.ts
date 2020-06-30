import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcHistoryRoutingModule } from './vc-history-routing.module';
import { VcHistoryComponent } from './vc-history.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [VcHistoryComponent],
  imports: [
    CommonModule,
    VcHistoryRoutingModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class VcHistoryModule { }
