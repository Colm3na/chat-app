import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('input') input:ElementRef; 
  socket: any;

  constructor( private renderer: Renderer2 ) {
    this.socket = io('http://localhost:3000');
  }e

  ngOnInit() {
    this.socket.on('event', (data) => {
      console.log(this.input)
      this.renderer.setAttribute( this.input.nativeElement, 'value', data.message );
    });
  }

}
