import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicianContactSettingsRoutingModule } from './physician-contact-settings-routing.module';
import { PhysicianContactSettingsComponent } from './physician-contact-settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [PhysicianContactSettingsComponent],
  imports: [
    CommonModule,
DataTablesModule,
    PhysicianContactSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ]
})
export class PhysicianContactSettingsModule { }
