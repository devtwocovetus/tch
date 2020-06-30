import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { CommunicationComponent } from './communication.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CommunicationComponent],
  imports: [
    CommonModule,
TranslateModule,
    CommunicationRoutingModule
  ]
})
export class CommunicationModule { }
