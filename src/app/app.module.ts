import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Forms
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { ChatRoutingModule } from './modules/chat-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { ChatModule } from './modules/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    FormsModule, 
    AuthModule, 
    AuthRoutingModule,
    StreamsModule,
    StreamsRoutingModule,
    ChatRoutingModule,
    ChatModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
