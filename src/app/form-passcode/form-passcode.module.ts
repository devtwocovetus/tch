import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPasscodeRoutingModule } from './form-passcode-routing.module';
import { FormPasscodeComponent } from './form-passcode.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [FormPasscodeComponent],
  imports: [
    CommonModule,
    FormPasscodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormPasscodeModule { }
