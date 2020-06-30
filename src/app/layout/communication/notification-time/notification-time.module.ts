import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationTimeRoutingModule } from './notification-time-routing.module';
import { NotificationTimeComponent } from './notification-time.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [NotificationTimeComponent],
  imports: [
    CommonModule,
TranslateModule,
    NotificationTimeRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
AmazingTimePickerModule

  ]
})
export class NotificationTimeModule { }
