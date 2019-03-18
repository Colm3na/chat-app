import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient ) { }

  saveMessage(body) {
    return this.http.post(`${BASEURL}/chat-messages`, body)
  }
}
