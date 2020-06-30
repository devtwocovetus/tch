import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { TranslateModule } from '@ngx-translate/core';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { DataTablesModule } from 'angular-datatables';

@NgModule({
	declarations: [
	AppComponent
	],
	imports: [
	BrowserModule.withServerTransition({ appId: 'serverApp' }),
	AppRoutingModule,
	BrowserAnimationsModule,
	ToastrModule.forRoot({
		preventDuplicates: true,
	}),
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	jqxCalendarModule,
	LanguageTranslationModule,
	TranslateModule,
	DataTablesModule
	// NgxMaterialTimepickerModule
	
	],
	providers: [  AuthGuard,BnNgIdleService
	
	],
	bootstrap: [AppComponent]

})
export class AppModule { }
//{provide: LocationStrategy, useClass: HashLocationStrategy},