import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { EditIntakeRoutingModule } from './edit-intake-routing.module';
import { EditIntakeComponent } from './edit-intake.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [EditIntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        EditIntakeRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AmazingTimePickerModule
  ]
})
export class EditIntakeModule { }
