import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterCptRoutingModule } from './master-cpt-routing.module';
import { MasterCptComponent } from './master-cpt.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterCptComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterCptRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class MasterCptModule { }
