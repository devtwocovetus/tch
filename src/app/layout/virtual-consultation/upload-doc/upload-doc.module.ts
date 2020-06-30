import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDocRoutingModule } from './upload-doc-routing.module';
import { UploadDocComponent } from './upload-doc.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UploadDocComponent],
  imports: [
    CommonModule,
    UploadDocRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class UploadDocModule { }
