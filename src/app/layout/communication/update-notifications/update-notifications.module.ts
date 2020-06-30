import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatenotificationsRoutingModule } from './update-notifications-routing.module';
import { UpdatenotificationsComponent } from './update-notifications.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
	declarations: [UpdatenotificationsComponent],
	imports: [
	CommonModule,
	TranslateModule,
	UpdatenotificationsRoutingModule,
	NgMultiSelectDropDownModule,
	FormsModule,
	ReactiveFormsModule,
	MatSlideToggleModule
	]
})
export class UpdatenotificationsModule { }
