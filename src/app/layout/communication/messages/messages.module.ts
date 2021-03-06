import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
TranslateModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
