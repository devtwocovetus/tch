import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsnotificatinsRoutingModule } from './actions-notifications-routing.module';
import { ActionsnotificationsComponent } from './actions-notifications.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ActionsnotificationsComponent],
  imports: [
    CommonModule,
TranslateModule,
    ActionsnotificatinsRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class ActionsnotificationsModule { }
