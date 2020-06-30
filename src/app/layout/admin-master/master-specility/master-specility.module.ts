import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterSpecilityRoutingModule } from './master-specility-routing.module';
import { MasterSpecilityComponent } from './master-specility.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterSpecilityComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterSpecilityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class MasterSpecilityModule { }
