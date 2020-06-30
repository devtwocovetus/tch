import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppointmentRoutingModule } from './view-appointment-routing.module';
import { ViewAppointmentComponent } from './view-appointment.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ViewAppointmentComponent],
  imports: [
    CommonModule,
    ViewAppointmentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    TranslateModule,
  ]
})
export class ViewAppointmentModule { }
