import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterProcedureRoutingModule } from './master-procedure-routing.module';
import { MasterProcedureComponent } from './master-procedure.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterProcedureComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterProcedureRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
TranslateModule,
  ]
})
export class MasterProcedureModule { }
