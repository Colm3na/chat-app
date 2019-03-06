import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  userForm: FormGroup;
  showSpinner = false;

  constructor() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  loginUser() {
    this.showSpinner = true;

    console.log(this.userForm.value);
  }

  showPassword() {
    let inputPass = <HTMLInputElement>document.getElementById('password');
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
    } else {
      inputPass.type = 'password';
    }
  }
}
