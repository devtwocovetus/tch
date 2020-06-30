import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcViewRoutingModule } from './vc-view-routing.module';
import { VcViewComponent } from './vc-view.component';
import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [VcViewComponent],
  imports: [
    CommonModule,
    VcViewRoutingModule,
    jqxCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class VcViewModule { }
