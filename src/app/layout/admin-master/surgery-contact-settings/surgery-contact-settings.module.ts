import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurgeryContactSettingsRoutingModule } from './surgery-contact-settings-routing.module';
import { SurgeryContactSettingsComponent } from './surgery-contact-settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SurgeryContactSettingsComponent],
  imports: [
    CommonModule,
DataTablesModule,
    SurgeryContactSettingsRoutingModule,
    FormsModule,
ReactiveFormsModule,
MatSlideToggleModule,
TranslateModule,

  ]
})
export class SurgeryContactSettingsModule { }
