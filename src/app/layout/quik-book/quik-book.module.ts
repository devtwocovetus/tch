import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuikBookRoutingModule } from './quik-book-routing.module';
import { QuikBookComponent } from './quik-book.component';
import { MatDatepickerModule ,MatNativeDateModule} from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [QuikBookComponent],
  imports: [
    CommonModule,
    QuikBookRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    TranslateModule
  ]
})
export class QuikBookModule { }
