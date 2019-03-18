import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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
  receiver: string;
  receiverData: any;
  typing = false;

  constructor( private renderer: Renderer2, 
    private tokenService: TokenService, 
    private route: ActivatedRoute,
    private userService: UsersService ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    let username = this.user.username;
    this.userService.getUserByUsername(username).subscribe( data => {
      console.log(data);
      this.receiverData = data;
      this.receiver = data['user'][0].username;
    })
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  isTyping() {
    this.typing = true;
  }

  send() {
    this.message = this.input.nativeElement.value;
    this.messagesList.push(this.message);
    this.socket.emit('new message', this.message);

    // set back input value to empty string
    this.typing = false;
    this.input.nativeElement.value = '';
  }

}