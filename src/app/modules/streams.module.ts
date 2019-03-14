import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../components/chat/chat.component';

@NgModule({
  declarations: [
    StreamsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [StreamsComponent],
  providers: [TokenService]
})
export class StreamsModule { }
