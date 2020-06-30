import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPatientsRoutingModule } from './edit-patients-routing.module';
import { EditPatientsComponent } from './edit-patients.component';
import { MatDatepickerModule } from '@angular/material';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EditPatientsComponent],
  imports: [
    CommonModule,
    EditPatientsRoutingModule,
     MatDatepickerModule,
	MatNativeDateModule,
	FormsModule,
	ReactiveFormsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    TranslateModule,
  ]
})
export class EditPatientsModule { }
