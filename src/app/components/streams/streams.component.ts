import { Component, OnInit, Renderer2 } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  socket: any;
  token: any;
  user: any;
  onlineUsers = [];
  unreadMsgs = [];

  constructor( private renderer: Renderer2,
    private tokenService: TokenService,
    public messageService: MessageService,
    private router: Router) {
      this.renderer.setStyle(document.body, 'background-image', 'url("./assets/telegram-background2.jpg")');
    }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.token = this.tokenService.getToken();
    console.log(this.token);

    // get number of unread messages of user
    this.messageService.getUnreadMessages(this.user._id)
    .subscribe( data => {
      this.unreadMsgs = data['messages'];
      console.log('unread messages', this.unreadMsgs);
    });
    
    this.socket = io('http://localhost:3000', {
      query: {
        token: this.token
      }
    });

    this.socket.emit('online', { user: this.user.username, userId: this.user._id });
    this.socket.on('usersOnline', data => {
      console.log('all online users', data);
      // avoid user to see themselves on the list of online users
      const dataFiltered = data.filter( data => data.name !== this.user.username );

      console.log('after filter', dataFiltered);
      this.onlineUsers = dataFiltered;
    });
  }

  get_number_unread_messages_per_sender(array, value) {
    var count = 0;
    array.forEach( msg => (msg.sender === value && count++));
    return count;
  }

  logout() {
    this.tokenService.deleteToken();
    this.socket.emit('disconnect');
    // go to login page
    this.router.navigate(['/']);
    location.reload();
  }

}
