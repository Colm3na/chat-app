import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/api/chatapp/register';
  user = {
    username: 'Jaimito',
    email: 'delospalotudos@gmail.com',
    password: 'jauja'
  }

  constructor( private http: HttpClient ) { }

  getHeaders() {
    return this.http.post(this.authUrl, this.user);
  }
}
