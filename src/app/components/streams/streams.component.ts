import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  constructor( private tokenService: TokenService ) { }
  token: any;

  ngOnInit() {
    this.token = this.tokenService.getPayload();
  }

}
