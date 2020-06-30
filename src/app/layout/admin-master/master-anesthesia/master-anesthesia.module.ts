import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterAnesthesiaRoutingModule } from './master-anesthesia-routing.module';
import { MasterAnesthesiaComponent } from './master-anesthesia.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [MasterAnesthesiaComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterAnesthesiaRoutingModule,
    MatSlideToggleModule,
    FormsModule,
ReactiveFormsModule,
TranslateModule
  ]
})
export class MasterAnesthesiaModule { }
