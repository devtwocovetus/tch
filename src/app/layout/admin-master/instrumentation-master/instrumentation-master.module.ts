import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentationMasterRoutingModule } from './instrumentation-master-routing.module';
import { InstrumentationMasterComponent } from './instrumentation-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [InstrumentationMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    InstrumentationMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule

  ]
})
export class InstrumentationMasterModule { }
