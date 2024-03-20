import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [``]
})
export class AuthComponent implements OnDestroy {

  constructor(
    private authService:AuthService,
    private router:Router,
    private viewContainerRef:ViewContainerRef,
  ) { }

  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error: null | string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost:PlaceholderDirective;
  private closeAlertSub?:Subscription;

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
        console.log('This login session will expire in: ' + +responseData.expiresIn/60 + ' minutes');
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onHandleError():void {
    this.error = null;
  }

  private showErrorAlert( message:string ) {
    const component = this.viewContainerRef.createComponent(AlertComponent);
    component.instance.message = message;
    this.closeAlertSub = component.instance.close
      .subscribe(() => {
        this.closeAlertSub.unsubscribe();
        this.viewContainerRef.clear();
      }
    );
  }

  ngOnDestroy():void {
    if (this.closeAlertSub)
      this.closeAlertSub.unsubscribe();
  }
}
