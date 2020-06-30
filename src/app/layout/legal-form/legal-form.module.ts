import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalFormRoutingModule } from './legal-form-routing.module';
import { LegalFormComponent } from './legal-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [LegalFormComponent],
  imports: [
    CommonModule,
    LegalFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
    DataTablesModule,
  ]
})
export class LegalFormModule { }
