import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  socket: any;
  message: String;
  chatBubble: any;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    // this.chatBubble = document.querySelector('li');
    // console.log(this.chatBubble)
    // this.socket.on('new message', (data) => {
    //   this.chatBubble.innerHTML = data.message;
    // })
  }

}
