import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { IntakeRoutingModule } from './intake-routing.module';
import { IntakeComponent } from './intake.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [IntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        IntakeRoutingModule,
     NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]

})
export class IntakeModule { }
