import { Component, OnInit, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamsComponent implements OnInit {
  socket: any;
  token: any;
  user: any;
  onlineUsers = [];
  unreadMsgs = [];
  timer = 0;

  constructor( private renderer: Renderer2,
    private tokenService: TokenService,
    public messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef ) {
      this.renderer.setStyle(document.body, 'background-image', 'url("./assets/telegram-background2.jpg")');

      // with this Angular will check for changes only once.
      // it will prevent the display_number_unread_messages function from being run continuously
      setTimeout(() => {
        this.timer = 5;
        this.cdr.detectChanges();
      }, 1000);
    }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.token = this.tokenService.getToken();
    console.log(this.token);

    // get number of unread messages of user
    this.messageService.getUnreadMessages(this.user._id)
    .subscribe( data => {
      let rawUnreadMsgs = data['messages'];
      // transform array to make more understandable
      rawUnreadMsgs = rawUnreadMsgs.map( msg => msg.sender );
      let unique = rawUnreadMsgs.filter((v, i, a) => a.indexOf(v) === i); 

      for ( let i = 0; i < unique.length; i++ ) {
        let occurence = this.get_occurence_in_array(rawUnreadMsgs, unique[i]);
        this.unreadMsgs.push({sender: unique[i], numberMsgs: occurence});
      }
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

  get_occurence_in_array(array, value) {
    var count = 0;
    array.forEach( sender => (sender === value && count++));
    return count;
  }

  display_number_unread_messages(user) {
    for ( let i = 0; i < this.unreadMsgs.length; i++ ) {
      if ( this.unreadMsgs[i].sender === user ) {
        console.log('display number unread activated');
        return this.unreadMsgs[i].numberMsgs;
      }
    }
    return;
  }

  logout() {
    this.tokenService.deleteToken();
    this.socket.emit('disconnect');
    // go to login page
    this.router.navigate(['/']);
    location.reload();
  }

}
