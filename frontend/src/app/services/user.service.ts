import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  curUser!: User;

  constructor() {
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
    //
  }

  signIn(user: User) {
    //
  }

  storeSession(user: User): void {
    sessionStorage.setItem('email', user.email);
  }

  clearSession(): void {
    sessionStorage.clear();
  }

  logout(): void {
    sessionStorage.clear();
    this.curUser = "";
  }
}
