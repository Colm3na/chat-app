import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  signUp(body) {
    return this.http.post(`${BASEURL}/register`, body);
  }

  login(body) {
    return this.http.post(`${BASEURL}/login`, body);
  }
}
