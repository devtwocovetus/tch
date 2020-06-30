import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcCancelListRoutingModule } from './vc-cancel-list-routing.module';
import { VcCancelListComponent } from './vc-cancel-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [VcCancelListComponent],
  imports: [
    CommonModule,
    VcCancelListRoutingModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class VcCancelListModule { }
