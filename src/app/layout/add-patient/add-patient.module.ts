import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPatientRoutingModule } from './add-patient-routing.module';
import { AddPatientComponent } from './add-patient.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [AddPatientComponent],
  imports: [
    CommonModule,
    AddPatientRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    TranslateModule
  ]
})
export class AddPatientModule { }
