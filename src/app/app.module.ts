import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Forms
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    FormsModule, 
    AuthModule, 
    AuthRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
