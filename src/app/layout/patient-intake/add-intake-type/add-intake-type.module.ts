import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { AddIntakeTypeRoutingModule } from './add-intake-type-routing.module';
import { AddIntakeTypeComponent } from './add-intake-type.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddIntakeTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        AddIntakeTypeRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddIntakeTypeModule { }
