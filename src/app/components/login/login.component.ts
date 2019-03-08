import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner = false;

  constructor( private authService: AuthService ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
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
    this.authService.login(user)
    .subscribe(data => {
      console.log(data);
    })
  }

}
