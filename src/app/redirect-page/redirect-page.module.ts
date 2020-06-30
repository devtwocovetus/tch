import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectPageRoutingModule } from './redirect-page-routing.module';
import { RedirectPageComponent } from './redirect-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [RedirectPageComponent],
  imports: [
    CommonModule,
    RedirectPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RedirectPageModule { }
