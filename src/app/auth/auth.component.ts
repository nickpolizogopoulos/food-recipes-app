import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router:Router,
  ) { }

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
    
    authObservable.subscribe({
      next: responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }
}
