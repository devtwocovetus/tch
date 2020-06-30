import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbAttachmentRoutingModule } from './kb-attachment-routing.module';
import { KbAttachmentComponent } from './kb-attachment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [KbAttachmentComponent],
  imports: [
    CommonModule,
    KbAttachmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class KbAttachmentModule { }
