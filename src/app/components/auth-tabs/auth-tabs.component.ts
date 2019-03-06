import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  userForm;
  user = {
    name: 'Matias',
    password: 'pass'
  };

  constructor() {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.name, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required])
    });
  }

  ngOnInit() {}

  showUser() {
    console.log(this.user);
  }
}
