import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormEditiorRoutingModule } from './form-editior-routing.module';
import { FormEditiorComponent } from './form-editior.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [FormEditiorComponent],
  imports: [
    CommonModule,
    FormEditiorRoutingModule,
    TranslateModule
  ]
})
export class FormEditiorModule { }
