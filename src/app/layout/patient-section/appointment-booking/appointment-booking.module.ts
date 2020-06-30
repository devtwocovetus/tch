import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule ,MatNativeDateModule} from '@angular/material';
import { AppointmentBookingRoutingModule } from './appointment-booking-routing.module';
import { AppointmentBookingComponent } from './appointment-booking.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [AppointmentBookingComponent],
  imports: [
    CommonModule,
    AppointmentBookingRoutingModule,
     NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    TranslateModule
  ]
})
export class AppointmentBookingModule { }
