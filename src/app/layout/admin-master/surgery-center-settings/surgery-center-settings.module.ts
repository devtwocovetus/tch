import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { SurgeryCenterSettingsRoutingModule } from './surgery-center-settings-routing.module';
import { SurgeryCenterSettingsComponent } from './surgery-center-settings.component';

import { ColorSketchModule } from 'ngx-color/sketch';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [SurgeryCenterSettingsComponent],
  imports: [
    CommonModule,
DataTablesModule,
    SurgeryCenterSettingsRoutingModule,
    ColorSketchModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    EditorModule,
    MatRadioModule,
    AmazingTimePickerModule,
    TranslateModule
  ]
})
export class SurgeryCenterSettingsModule { }
