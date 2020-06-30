import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
DataTablesModule,
    ArticlesRoutingModule,
    TranslateModule
  ]
})
export class ArticlesModule { }
