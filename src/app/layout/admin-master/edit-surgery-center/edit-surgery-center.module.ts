import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSurgeryCenterRoutingModule } from './edit-surgery-center-routing.module';
import { EditSurgeryCenterComponent } from './edit-surgery-center.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [EditSurgeryCenterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    EditSurgeryCenterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    GooglePlaceModule,
    TranslateModule
  ]
})
export class EditSurgeryCenterModule { }
