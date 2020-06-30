import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAttachmentsRoutingModule } from './add-attachments-routing.module';
import { AddAttachmentsComponent } from './add-attachments.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AddAttachmentsComponent],
  imports: [
    CommonModule,
    AddAttachmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
    DataTablesModule
  ]
})
export class AddAttachmentsModule { }
