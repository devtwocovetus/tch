import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcEditRoutingModule } from './vc-edit-routing.module';
import { VcEditComponent } from './vc-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
	declarations: [VcEditComponent],
	imports: [
	CommonModule,
	VcEditRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	MatDatepickerModule,
	MatNativeDateModule,
	GooglePlaceModule,
	MatAutocompleteModule,
	AmazingTimePickerModule,
	jqxCalendarModule,
	NgbModule,
	TranslateModule,
	]
})
export class VcEditModule { }
