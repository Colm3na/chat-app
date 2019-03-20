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
      this.onlineUsers = data;
      console.log(this.onlineUsers)
    });
  }

  logout() {
    const token = this.tokenService.getToken();
    this.tokenService.deleteToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
