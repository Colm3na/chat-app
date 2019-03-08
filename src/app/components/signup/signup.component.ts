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
  errorMessage: String = '';

  constructor( private authService: AuthService ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('(?=.*[@$!%*#?&]).{1,}$')])      
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

  private signupUser(form:any) {
    console.log(form)
    let user = this.signupForm.value;
    this.authService.signUp(user)
    .subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    }, () => {
      console.log('HTTP request complete');
    })
  }
}
