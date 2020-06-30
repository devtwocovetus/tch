import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalkinListRoutingModule } from './walkin-list-routing.module';
import { WalkinListComponent } from './walkin-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [WalkinListComponent],
  imports: [
    CommonModule,
    WalkinListRoutingModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class WalkinListModule { }
