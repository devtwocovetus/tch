import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPasscodeRoutingModule } from './notification-passcode-routing.module';
import { NotificationPasscodeComponent } from './notification-passcode.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [NotificationPasscodeComponent],
  imports: [
    CommonModule,
   NotificationPasscodeRoutingModule,
FormsModule,
ReactiveFormsModule,

  ]
})
export class NotificationPasscodeModule { }
