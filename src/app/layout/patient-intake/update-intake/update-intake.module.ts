import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { UpdateIntakeRoutingModule } from './update-intake-routing.module';
import { UpdateIntakeComponent } from './update-intake.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [UpdateIntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        UpdateIntakeRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ]
})
export class UpdateIntakeModule { }
