import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  curUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.users = [];
    let token = sessionStorage.getItem('token');
    if(token !== null && this.curUser !== undefined ) {
      let decoded:User = jwt_decode(token);
      console.log(decoded);
      this.curUser = {email: '', firstName: '', lastName: '', password: ''};
      if(decoded) {
        this.curUser = {
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          password: ''
        }
        if(!this.users.findIndex(u => u.email === this.curUser?.email)) {
          this.users.push(this.curUser);
        }
      }
    }
  }

  getCurrentUser() {
    const token = sessionStorage.getItem('token') as string;
    let decoded:User = jwt_decode(token);

    this.curUser = {email: '', firstName: '', lastName: '', password: ''};
    if(decoded) {
      this.curUser = {
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        password: ''
      }
      if(!this.users.findIndex(u => u.email === this.curUser?.email)) {
        this.users.push(this.curUser);
      }
    }
    return this.curUser;
  }

  signUp(user: User) {
    return this.http.post(
      `${environment.REST_API_SERVICE}/users/signup`,
      user,
      {observe: 'response'}
      );
  }

  signIn(email: string, password:string) {
    return this.http.post(
      `${environment.REST_API_SERVICE}/users/login`,
      {email, password},
      {observe: 'response'}
    );
  }

  storeSession(user: User): void {
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('firstName', user.firstName);
    sessionStorage.setItem('lastName',user.lastName)
  }

  clearSession(): void {
    sessionStorage.clear();
  }

  logout(): void {
    sessionStorage.clear();
    this.curUser = undefined;
  }
}
