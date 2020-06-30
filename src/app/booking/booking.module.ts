import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};


@NgModule({
	declarations: [BookingComponent],
	imports: [
	CommonModule,
	BookingRoutingModule,
	MatDatepickerModule,
	MatNativeDateModule,
	FormsModule,
	ReactiveFormsModule,
	GooglePlaceModule,
	MatAutocompleteModule,
	AmazingTimePickerModule,
	TranslateModule,
	DataTablesModule
	],
	providers: [
	{
		provide: PERFECT_SCROLLBAR_CONFIG,
		useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
	},
	],
})
export class BookingModule { }
