import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoChatRoutingModule } from './video-chat-routing.module';
import { VideoChatComponent } from './video-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [VideoChatComponent],
  imports: [
    CommonModule,
    VideoChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class VideoChatModule { }
