import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAppointmentRoutingModule } from './edit-appointment-routing.module';
import { EditAppointmentComponent } from './edit-appointment.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EditAppointmentComponent],
  imports: [
    CommonModule,
    EditAppointmentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AmazingTimePickerModule,
    MatAutocompleteModule,
    TranslateModule
  ]
})
export class EditAppointmentModule { }
