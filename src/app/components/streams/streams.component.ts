import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

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

  constructor( private tokenService: TokenService, 
    private router: Router) {
      this.socket = io('http://localhost:3000');
    }

  ngOnInit() {
    this.token = this.tokenService.getPayload();
    this.user = this.tokenService.getPayload();
    
    this.socket.emit('online', { room: 'global', user: this.user.username, userId: this.user._id });
    this.socket.on('usersOnline', data => {
      // avoid user to see themselves on the list of online users
      data.forEach( (arr, index) => {
        console.log(arr[0])
        if ( arr[0] === this.user.username ) {
          data.splice(index, 1);
        }
      });
      this.onlineUsers = data;
      console.log(this.onlineUsers)
    });
  }

  logout() {
    this.tokenService.deleteToken();
    // go to login page
    this.router.navigate(['/']);
  }

}
