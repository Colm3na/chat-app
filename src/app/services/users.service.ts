import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  getAllUsers() {
    this.http.get(`${BASEURL}/users`);
  }

  getUser(id) {
    this.http.get(`${BASEURL}/user/${id}`);
  }

  getUserByUsername(username) {
    this.http.get(`${BASEURL}/username/${username}`);
  }
}
