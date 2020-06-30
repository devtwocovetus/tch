import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { ActionsIntakeRoutingModule } from './actions-intake-routing.module';
import { ActionsIntakeComponent } from './actions-intake.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ActionsIntakeComponent],
  imports: [
    CommonModule,
    TranslateModule,
        ActionsIntakeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ]
})
export class ActionsIntakeModule { }
