import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPatientFormsRoutingModule } from './view-patient-forms-routing.module';
import { ViewPatientFormsComponent } from './view-patient-forms.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [ViewPatientFormsComponent],
  imports: [
    CommonModule,
    ViewPatientFormsRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ]
})
export class ViewPatientFormsModule { }
