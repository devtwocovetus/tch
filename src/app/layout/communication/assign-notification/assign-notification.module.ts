import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignNotificationRoutingModule } from './assign-notification-routing.module';
import { AssignNotificationComponent } from './assign-notification.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AssignNotificationComponent],
  imports: [
    CommonModule,
TranslateModule,
    AssignNotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,    
  ]
})
export class AssignNotificationModule { }
