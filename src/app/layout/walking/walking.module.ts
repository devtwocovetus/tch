import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalkingRoutingModule } from './walking-routing.module';
import { WalkingComponent } from './walking.component';
import { MatDatepickerModule ,MatNativeDateModule} from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [WalkingComponent],
  imports: [
    CommonModule,
    WalkingRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    TranslateModule,
  ]
})
export class WalkingModule { }
