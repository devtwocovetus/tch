import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { UserMasterComponent } from './user-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [UserMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    UserMasterRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
MatDatepickerModule,
MatNativeDateModule,
GooglePlaceModule,
TranslateModule,

  ]
})
export class UserMasterModule { }
