import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterAlertsRoutingModule } from './master-alerts-routing.module';
import { MasterAlertsComponent } from './master-alerts.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterAlertsComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterAlertsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class MasterAlertsModule { }
