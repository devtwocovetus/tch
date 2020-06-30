import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentMasterRoutingModule } from './equipment-master-routing.module';
import { EquipmentMasterComponent } from './equipment-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [EquipmentMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    EquipmentMasterRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
TranslateModule
  ]
})
export class EquipmentMasterModule { }
