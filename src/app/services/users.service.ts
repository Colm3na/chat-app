import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  getAllUsers() {
    return this.http.get(`${BASEURL}/users`);
  }

  getUser(id) {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  getUserByUsername(username) {
    return this.http.get(`${BASEURL}/username/${username}`);
  }
}
