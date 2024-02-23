import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiKey:string = ' AIzaSyAOt3HXBDAY2BV0e6rMWAR35NQJ25mfdTE ';
    url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;

    constructor(
        private http:HttpClient,
    ) {}

    signup( email:string, password:string, ) {
        return this.http
            .post<AuthResponseData>(
                this.url,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(
                    errorResponse => {
                        let errorMessage = 'An unknown error occured!'

                        if (!errorResponse.error || !errorResponse.error.error)
                            return throwError(errorMessage)

                        if (errorResponse.error.error.message === 'EMAIL_EXISTS')
                            errorMessage = 'The email address is already in use by another account.';

                        return throwError(errorMessage)
                    }
                )
            )
    }

}

