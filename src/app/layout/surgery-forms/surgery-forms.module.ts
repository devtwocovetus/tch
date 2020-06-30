import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurgeryFormsRoutingModule } from './surgery-forms-routing.module';
import { SurgeryFormsComponent } from './surgery-forms.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [SurgeryFormsComponent],
  imports: [
    CommonModule,
    SurgeryFormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class SurgeryFormsModule { }
