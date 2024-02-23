import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(
    private authService:AuthService,
  ) {}

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error: null | string = null;

  onSwitchMode():void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit( form:NgForm ) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      // *code here to sign in
    }
    else 
      this.authService
        .signup(email, password)
        .subscribe(
          responseData => {
            console.log(responseData);
            this.isLoading = false;
          },
          errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          }
        )

    form.reset();
  }
}
