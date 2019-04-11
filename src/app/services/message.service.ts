import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient ) { }

  sendMessage( senderId, receiverId, message ) {
    return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, message);
  }

  getConversationMessages( senderId, receiverId ) {
    let response1 = this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
    let response2 = this.http.get(`${BASEURL}/chat-messages/${receiverId}/${senderId}`);

    return forkJoin([response1, response2]);
  }

  // saveMessage(body) {
  //   console.log('************ saveMessage service activated')
  //   return this.http.post(`${BASEURL}/chat-messages`, body);
  // }

  // get number of unread messages of user
  getUnreadMessages(senderId) {
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/unread`);
  }

  setMessageAsRead(messageId) {
    return this.http.get(`${BASEURL}/chat-messages/${messageId}/read`);
  }

  set_all_messages_as_read(receiverId, senderId) {
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}/read`);
  }
}
