import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { AddIntakeRoutingModule } from './add-intake-routing.module';
import { AddIntakeComponent } from './add-intake.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddIntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        AddIntakeRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddIntakeModule { }
