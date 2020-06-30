import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbArticleFeedbackRoutingModule } from './kb-article-feedback-routing.module';
import { KbArticleFeedbackComponent } from './kb-article-feedback.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxStarsModule } from 'ngx-stars';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [KbArticleFeedbackComponent],
	imports: [
	CommonModule,
DataTablesModule,
	KbArticleFeedbackRoutingModule,
	NgxStarsModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule
	]
})
export class KbArticleFeedbackModule { }
