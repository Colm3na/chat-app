import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageModule } from '../components/message/message.module';

@NgModule({
  declarations: [ ChatComponent, MessageComponent ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MessageModule
  ]
})
export class ChatModule { }
