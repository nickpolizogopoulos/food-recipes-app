import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

export interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiKey:string = ' AIzaSyAOt3HXBDAY2BV0e6rMWAR35NQJ25mfdTE ';
    signUpUrl:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;
    signInUrl:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey;

    constructor(
        private http:HttpClient,
    ) {}

    signup( email:string, password:string ): Observable<AuthResponseData> {
        const payload = { email: email, password: password, returnSecureToken: true };
        return this.http
        .post <AuthResponseData>( this.signUpUrl, payload )
        .pipe( catchError( this.handleError) )
    }

    login( email:string, password:string ): Observable<AuthResponseData> {
        const payload = { email: email, password: password, returnSecureToken: true };
        return this.http
        .post <AuthResponseData>( this.signInUrl, payload )
        .pipe( catchError( this.handleError) )
    }

    private handleError( errorResponse:HttpErrorResponse ) {

        let errorMessage = 'An unknown error occured!'
        if (!errorResponse.error || !errorResponse.error.error)
            return throwError(() => errorMessage)
    
        const message = errorResponse.error.error.message;
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
