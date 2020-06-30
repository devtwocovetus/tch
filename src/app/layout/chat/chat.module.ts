import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent, SafePipe  } from './chat.component';


@NgModule({
  declarations: [ChatComponent,SafePipe],
  imports: [
    CommonModule,
    ChatRoutingModule,

  ]
})
export class ChatModule { }
