import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagePhraseRoutingModule } from './language-phrase-routing.module';
import { LanguagePhraseComponent } from './language-phrase.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguagePhraseComponent],
  imports: [
    CommonModule,
    LanguagePhraseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class LanguagePhraseModule { }
