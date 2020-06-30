import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcBookRoutingModule } from './vc-book-routing.module';
import { VcBookComponent } from './vc-book.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};


@NgModule({
  declarations: [VcBookComponent],
  imports: [
    CommonModule,
    VcBookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
	MatNativeDateModule,
	GooglePlaceModule,
	MatAutocompleteModule,
	AmazingTimePickerModule,
	jqxCalendarModule,
	TranslateModule,
	NgbModule  ],
  providers: [
	],
})
export class VcBookModule { }
