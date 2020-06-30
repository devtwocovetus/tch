import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './providers/header/header.component'
import {FooterComponent } from './providers/footer/footer.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ColorSketchModule } from 'ngx-color/sketch';
import {HttpClient, HttpClientModule } from '@angular/common/http';
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module'

import { DataTablesModule } from 'angular-datatables';

// import {HttpClient, HttpClientModule} from '@angular/common/http';

// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};


@NgModule({
	declarations: [LayoutComponent, HeaderComponent, FooterComponent],
	imports: [
	CommonModule,
	LayoutRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	PerfectScrollbarModule,
	ColorSketchModule,
	HttpClientModule,
	LanguageTranslationModule,
	DataTablesModule
	// TranslateModule,

	],
	providers: [
	{
		provide: PERFECT_SCROLLBAR_CONFIG,
		useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
	}
	],
})
export class LayoutModule { }
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}