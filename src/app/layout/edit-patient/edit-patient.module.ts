import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPatientRoutingModule } from './edit-patient-routing.module';
import { EditPatientComponent } from './edit-patient.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EditPatientComponent],
  imports: [
    CommonModule,
    EditPatientRoutingModule,
    MatDatepickerModule,
	MatNativeDateModule,
	FormsModule,
	ReactiveFormsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    TranslateModule
  ]
})
export class EditPatientModule { }
