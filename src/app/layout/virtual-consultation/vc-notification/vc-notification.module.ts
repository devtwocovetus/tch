import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcNotificationRoutingModule } from './vc-notification-routing.module';
import { VcNotificationComponent } from './vc-notification.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [VcNotificationComponent],
  imports: [
    CommonModule,
    VcNotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class VcNotificationModule { }
