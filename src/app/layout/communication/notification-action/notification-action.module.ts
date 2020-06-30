import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationActionRoutingModule } from './notification-action-routing.module';
import { NotificationActionComponent } from './notification-action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [NotificationActionComponent],
  imports: [
    CommonModule,
TranslateModule,
    NotificationActionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AmazingTimePickerModule
  ]
})
export class NotificationActionModule { }
