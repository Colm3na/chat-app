import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner = false;
  errorMessage: String = '';

  constructor( private authService: AuthService, private router: Router,
    private tokenService: TokenService ) {
    this.loginForm = new FormGroup({
      usernameemail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  showPassword() {
    let inputPass = <HTMLInputElement>document.getElementById('password');
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
    } else {
      inputPass.type = 'password';
    }
  }

  private loginUser(form:any) {
    console.log(form)
    this.showSpinner = true;
    let user = this.loginForm.value;
    if (user.usernameemail.includes('@')) {
      user.email = user.usernameemail;
      delete user.usernameemail;
    } else {
      user.username = user.usernameemail;
      delete user.usernameemail;
    }
    console.log(user);
    this.authService.login(user)
      .subscribe( data => {
        console.log(data);
        this.tokenService.setToken(data['token']);
      }, err => {
        console.log(err);
        if (Array.isArray(err.error.message)) {
          this.errorMessage = err.error.message[0].message;
        } else {
          this.errorMessage = err.error.message;
        }
      }, () => {
        console.log('HTTP request completed');
        this.router.navigate(['/streams']);
      })
  }

}
