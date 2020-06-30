import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNotificationsRoutingModule } from './add-notifications-routing.module';
import { AddNotificationsComponent } from './add-notifications.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AddNotificationsComponent],
  imports: [
    CommonModule,
TranslateModule,
    AddNotificationsRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddNotificationsModule { }
