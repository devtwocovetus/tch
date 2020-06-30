import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterFormsRoutingModule } from './master-forms-routing.module';
import { MasterFormsComponent } from './master-forms.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterFormsComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterFormsRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class MasterFormsModule { }
