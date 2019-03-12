import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private cookieService: CookieService ) { }

  getToken() {
    return this.cookieService.get('chat-token');
  }

  setToken(token) {
    return this.cookieService.set('chat-token', token);
  }

  deleteToken() {
    return this.cookieService.delete('chat-token');
  }

  getPayload() {
    let token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    console.log(payload.data);

    return payload.data;
  }
}
