import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTempleteRoutingModule } from './email-templete-routing.module';
import { EmailTempleteComponent } from './email-templete.component';


@NgModule({
  declarations: [EmailTempleteComponent],
  imports: [
    CommonModule,
    EmailTempleteRoutingModule
  ]
})
export class EmailTempleteModule { }
