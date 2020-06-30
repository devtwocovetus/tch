import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaceMasterRoutingModule } from './race-master-routing.module';
import { RaceMasterComponent } from './race-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [RaceMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    RaceMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class RaceMasterModule { }
