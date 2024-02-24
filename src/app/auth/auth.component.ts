import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [``]
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

  onCloseAlert():void {
    this.error = null;
  }

  onSubmit( form:NgForm ) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    let authObservable:Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode)
      authObservable = this.authService.login(email, password)
    else 
      authObservable = this.authService.signup(email, password)
    
    authObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
