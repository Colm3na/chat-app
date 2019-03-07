import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/api/chatapp/register';

  constructor( private http: HttpClient ) { }

  signUp(user) {
    return this.http.post(this.authUrl, user);
  }
}
