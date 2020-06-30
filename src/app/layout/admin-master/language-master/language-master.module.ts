import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageMasterRoutingModule } from './language-master-routing.module';
import { LanguageMasterComponent } from './language-master.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [LanguageMasterComponent],
  imports: [
    CommonModule,
DataTablesModule,
    LanguageMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class LanguageMasterModule { }
