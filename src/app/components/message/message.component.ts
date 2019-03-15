import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
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
    console.log(this.input.nativeElement.value);
    this.message = this.input.nativeElement.value;
    this.socket.emit('new message', this.message);
    this.renderer.setProperty(this.chatBubble.nativeElement, 'innerHTML', this.message);
  }

}
