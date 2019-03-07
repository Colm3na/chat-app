import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'api/chatapp/register';

  constructor( private http: HttpClient ) { }

  getHeader() {
    return this.http.get(this.authUrl);
  }
}
