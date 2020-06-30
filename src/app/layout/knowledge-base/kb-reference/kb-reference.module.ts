import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbReferenceRoutingModule } from './kb-reference-routing.module';
import { KbReferenceComponent } from './kb-reference.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [KbReferenceComponent],
  imports: [
    CommonModule,
    KbReferenceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class KbReferenceModule { }
