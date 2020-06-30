import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNotificationTypeRoutingModule } from './add-notification-type-routing.module';
import { AddNotificationTypeComponent } from './add-notification-type.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AddNotificationTypeComponent],
  imports: [
    CommonModule,
TranslateModule,
    AddNotificationTypeRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddNotificationTypeModule { }
