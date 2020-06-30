import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemEmailRoutingModule } from './system-email-routing.module';
import { SystemEmailComponent } from './system-email.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SystemEmailComponent],
  imports: [
    CommonModule,
    SystemEmailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CKEditorModule,
    TagInputModule,
    TranslateModule,
    DataTablesModule
    // BrowserAnimationsModule
  ]
})
export class SystemEmailModule { }
