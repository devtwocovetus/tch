import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { AssignIntakeRoutingModule } from './assign-intake-routing.module';
import { AssignIntakeComponent } from './assign-intake.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [AssignIntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        AssignIntakeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ]
})
export class AssignIntakeModule { }
