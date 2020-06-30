import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentCategoryRoutingModule } from './document-category-routing.module';
import { DocumentCategoryComponent } from './document-category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [DocumentCategoryComponent],
  imports: [
    CommonModule,
DataTablesModule,
    DocumentCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class DocumentCategoryModule { }
