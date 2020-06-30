import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserVideoChatRoutingModule } from './user-video-chat-routing.module';
import { UserVideoChatComponent } from './user-video-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [UserVideoChatComponent],
  imports: [
    CommonModule,
    UserVideoChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class UserVideoChatModule { }
