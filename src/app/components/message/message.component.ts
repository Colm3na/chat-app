import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild('inputMsg') input: ElementRef;
  @ViewChild('chatBubble') chatBubble: ElementRef;
  socket: any;
  message: string;

  constructor( private renderer: Renderer2 ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  send() {
    this.message = this.input.nativeElement.value;
    this.socket.emit('new message', this.message);

    const ul = document.querySelector('ul');
    let newLi = document.createElement('li');
    let newMsg = document.createTextNode(this.message);
    newLi.appendChild(newMsg);
    ul.appendChild(newLi);

    // set back input value to empty string
    this.input.nativeElement.value = '';
  }

}