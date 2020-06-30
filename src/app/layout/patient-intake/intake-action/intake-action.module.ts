import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { IntakeActionRoutingModule } from './intake-action-routing.module';
import { IntakeActionComponent } from './intake-action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [IntakeActionComponent],
  imports: [
    CommonModule,
    TranslateModule,
        IntakeActionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AmazingTimePickerModule,
  ]
})
export class IntakeActionModule { }
