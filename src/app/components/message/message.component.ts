import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'src/app/services/message.service';
import { EmojiEvent, CaretEvent } from 'ng2-emoji-picker';

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
  messagesList: any = [];
  user: any;
  sender: string;
  senderData: any;
  typing = false;
  messageDB: any;
  timer = 0;

  eventMock;
  eventPosMock;
  direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  toggled = false;
  content = ' ';

  private _lastCaretEvent: CaretEvent;

  constructor( private renderer: Renderer2, 
    private tokenService: TokenService, 
    private route: ActivatedRoute,
    private userService: UsersService,
    private messageService: MessageService ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    let username = this.user.username;
    this.userService.getUserByUsername(username).subscribe( data => {
      console.log(data);
      this.senderData = data;
      this.sender = data['user'][0].username;
    })
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  handleSelection(event: EmojiEvent) {
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);

    this.toggled = !this.toggled;
  }

  handleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }

  Toggled() {
    this.toggled = !this.toggled;
  }

  isTyping(val) {
    if ( val === true ) {
      this.typing = true;
    } else {
      if ( this.timer <= 0 ) {
        this.typing = false;
      } else {
        setTimeout(() => {this.timer = 0; this.isTyping(false)}, 1500);
      }
    }
  }

  send() {
    this.message = this.input.nativeElement.value;
    this.messagesList.push(this.message);
    this.socket.emit('new message', this.message);
    // set back input value to empty string
    this.typing = false;
    this.input.nativeElement.value = '';
    // save chat message in DB
    console.log(this.senderData)
    this.messageDB = {
      body: this.message,
      sender: this.sender,
      senderId: this.senderData['user'][0]._id
    }
    this.messageService.saveMessage(this.messageDB).subscribe( data => {
      console.log(data);
    });
  }

}