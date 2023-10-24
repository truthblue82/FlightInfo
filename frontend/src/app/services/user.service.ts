import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    let curEmail = sessionStorage.getItem('email') || '';
    if(curEmail !== null && this.users.length > 0 ){
      this.curUser = this.users.filter(u => u.email === curEmail)[0];
      console.log('cur user', this.curUser);
    }
  }

  getCurrentUser() {
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
