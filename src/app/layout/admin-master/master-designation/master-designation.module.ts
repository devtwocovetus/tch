import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDesignationRoutingModule } from './master-designation-routing.module';
import { MasterDesignationComponent } from './master-designation.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterDesignationComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterDesignationRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class MasterDesignationModule { }
