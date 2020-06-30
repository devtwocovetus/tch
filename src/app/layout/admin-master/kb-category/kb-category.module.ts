import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbCategoryRoutingModule } from './kb-category-routing.module';
import { KbCategoryComponent } from './kb-category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [KbCategoryComponent],
  imports: [
    CommonModule,
DataTablesModule,
    KbCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class KbCategoryModule { }
