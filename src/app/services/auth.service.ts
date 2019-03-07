import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/api/chatapp/register';

  constructor( private http: HttpClient ) { }

  getHeaders() {
    console.log(this.http.get(this.authUrl))
    return this.http.get(this.authUrl);
  }
}
