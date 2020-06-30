import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{EditNotificationComponent} from './edit-notification.component'
import { EditNotificationRoutingModule } from './edit-notification-routing.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EditNotificationComponent],
  imports: [
    CommonModule,
TranslateModule,
    EditNotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AmazingTimePickerModule
  ]
})
export class EditNotificationModule { }
