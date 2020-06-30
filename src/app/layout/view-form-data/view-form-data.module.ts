import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewFormDataRoutingModule } from './view-form-data-routing.module';
import { ViewFormDataComponent } from './view-form-data.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ViewFormDataComponent],
  imports: [
    CommonModule,
    ViewFormDataRoutingModule,
    TranslateModule,
  ]
})
export class ViewFormDataModule { }
