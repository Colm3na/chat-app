import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {

  constructor( private authService: AuthService ) {}

  ngOnInit() {
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {}); // initialize materialize tabs. options parameter empty
  }

  showHeaders() {
    this.authService.getHeaders()
      .subscribe(data => {
        console.log(data);
      })
  }

}
