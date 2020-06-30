import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesComponent } from './languages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguagesComponent],
  imports: [
    CommonModule,
    LanguagesRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
TranslateModule,
  ]
})
export class LanguagesModule { }
