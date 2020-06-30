import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPhysicianOfficeRoutingModule } from './edit-physician-office-routing.module';
import { EditPhysicianOfficeComponent } from './edit-physician-office.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [EditPhysicianOfficeComponent],
  imports: [
    CommonModule,
DataTablesModule,
    EditPhysicianOfficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    GooglePlaceModule,
    TranslateModule
  ]
})
export class EditPhysicianOfficeModule { }
