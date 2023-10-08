import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    private tokenExpirationTime: any;

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    signup(email: string, password: string) {
        return this.httpClient
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.httpClient
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId,
                resData.idToken, +resData.expiresIn)));
    }

    logout() {
        localStorage.removeItem('userData');

        this.user.next(null);
        this.router.navigate(['/auth']);

        if (this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
        }

        this.tokenExpirationTime = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) return;

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
            this.user.next(loadedUser);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string,
        token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);

        this.user?.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknow error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;

            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Provided email or password is incorrect.';
                break;
        }

        return throwError(() => errorMessage);
    }
}