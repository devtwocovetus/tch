import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignNotificationListRoutingModule } from './assign-notification-list-routing.module';
import { AssignNotificationListComponent } from './assign-notification-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AssignNotificationListComponent],
  imports: [
    CommonModule,
TranslateModule,
    AssignNotificationListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ]
})
export class AssignNotificationListModule { }
