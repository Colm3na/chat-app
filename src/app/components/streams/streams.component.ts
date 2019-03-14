import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  constructor( private tokenService: TokenService, private router: Router ) { }
  token: any;

  ngOnInit() {
    this.token = this.tokenService.getPayload();
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
