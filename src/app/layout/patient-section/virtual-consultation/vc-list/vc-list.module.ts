import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcListRoutingModule } from './vc-list-routing.module';
import { VcListComponent } from './vc-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [VcListComponent],
  imports: [
    CommonModule,
    VcListRoutingModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class VcListModule { }
