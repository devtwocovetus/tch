import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeBaseRoutingModule } from './knowledge-base-routing.module';
import { KnowledgeBaseComponent } from './knowledge-base.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [KnowledgeBaseComponent],
  imports: [
    CommonModule,
    KnowledgeBaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class KnowledgeBaseModule { }
