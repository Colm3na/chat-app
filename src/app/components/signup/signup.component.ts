import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor( private authService: AuthService ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),      
    })
  }

  ngOnInit() {
  }

  showPassword() {
    let inputPass = <HTMLInputElement>document.getElementById('signup-password');
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
    } else {
      inputPass.type = 'password';
    }
  }

  signupUser() {
    let user = this.signupForm.value;
    this.authService.signUp(user)
    .subscribe(data => {
      console.log(data);
    })
  }
}
