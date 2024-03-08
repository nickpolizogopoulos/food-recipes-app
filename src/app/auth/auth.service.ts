import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";

import { User } from "./user.model";

export interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

interface UserData {
    email:string;
    id:string;
    _token:string;
    _tokenExpirationDate:string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject <User> (null);
    apiKey:string = environment.firebaseAPIKey;
    signUpUrl:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;
    signInUrl:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey;
    private tokenExpirationTimer!:any;

    constructor(
        private http:HttpClient,
        private router:Router
    ) {}

    signup( email:string, password:string ): Observable<AuthResponseData> {
        const payload = { email: email, password: password, returnSecureToken: true };
        return this.http
        .post <AuthResponseData>( this.signUpUrl, payload )
        .pipe(
            catchError( this.handleError),
            tap( responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            })
        )
    }

    login( email:string, password:string ): Observable<AuthResponseData> {
        const payload = { email: email, password: password, returnSecureToken: true };
        return this.http
        .post <AuthResponseData>( this.signInUrl, payload )
        .pipe(
            catchError( this.handleError),
            tap( responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            })    
        )
    }

    autoLogin():void {
        const userData:UserData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) return;
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout():void {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer)
        this.tokenExpirationTimer = null;
    }

    autoLogout( expirationDuration:number ):void {
        // const sessionTimeLeft = new Date(expirationDuration / 1000 / 60).getTime()
        // console.log(`Time left for this login session: ${sessionTimeLeft} minutes` )
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication( email:string, userId:string, token:string, expiresIn:number ) {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );        
        const user = new User( email, userId, token, expirationDate );
        this.user.next(user);
        this.autoLogout( expiresIn * 1000 )
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError( errorResponse:HttpErrorResponse ):Observable<never> {

        // console.log(errorResponse);
        let errorMessage = 'An unknown error occured!'

        if (!errorResponse.error || !errorResponse.error.error)
            return throwError(() => errorMessage)
    
        const message:string = errorResponse.error.error.message;
        const manyAttempts:string = 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
    
        //signup
        if (message === 'EMAIL_EXISTS')
            errorMessage = 'The email address is already in use by another account.';
        
        if (message === manyAttempts)
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    
        //login
        if (message === 'INVALID_LOGIN_CREDENTIALS')
            errorMessage = 'Incorrect credentials. Please try again.';
    
        if (message === 'USER_DISABLED')
            errorMessage = 'This user account has been disabled by an administrator.';
    
        return throwError(() => errorMessage)
      }
}
