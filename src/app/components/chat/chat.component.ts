import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private renderer: Renderer2 ) {
    this.renderer.setStyle(document.body, 'background-image', 'url("../../../assets/telegram-background.jpg")');
  }

  ngOnInit() { }

}
