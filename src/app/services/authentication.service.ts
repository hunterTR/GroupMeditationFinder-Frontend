﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    public currentUser:any;
    login(email: string, password: string) {
        return this.http.post<any>(AppConfig.apiUrl + '/users/auth', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.currentUser = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    getCurrentUser(){
        return this.currentUser;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}