import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


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
    if(token) {
      let decoded:User = jwt_decode(token);

      this.curUser = {email: '', firstName: '', lastName: '', password: ''};

      //check expire date of token
      if(decoded) {
        let expDate = decoded.exp as string;
        let curTime = Math.floor(new Date().getTime()/1000);
        if(expDate > curTime.toString()) {
          //still unexpire token
          this.curUser = {
            email: decoded.email,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            password: '',
            exp: decoded.exp
          }
          if(!this.users.findIndex(u => u.email === this.curUser?.email)) {
            this.users.push(this.curUser);
          }
        } else {
          //token expired
          this.clearSession()
          this.router.navigate(['/']);
        }
      }
    }
    if(sessionStorage.getItem('email')) {
      this.curUser = {
        email: sessionStorage.getItem('email') as string,
        firstName: sessionStorage.getItem('firstName') as string,
        lastName: sessionStorage.getItem('lastName') as string,
        exp: sessionStorage.getItem('exp') as string
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
    location.assign('/');
  }

  getEcryptedLink(email: string): Observable<any> {
    return this.http.post(
      `${environment.REST_API_SERVICE}/users/link`,
      {email},
      {observe: 'response'}
    );
  }

  authenWithCode(code: string): Observable<{token: string}> {
    let headers = new HttpHeaders()
                  .set('Authorization', `Bearer ${code}`);
    let options = { headers: headers};
    return this.http.post<{token: string}>(
      `${environment.REST_API_SERVICE}/users/verify`,
      {},
      options
    );
  }

  loginWithGoogle(credentials: string): Observable<any> {
    let headers = new HttpHeaders()
                  .set('Authorization', `Bearer ${credentials}`);
    let options = { headers: headers};
    return this.http.post(
      `${environment.REST_API_SERVICE}/users/googlelogin`,
      {},
      options
    );
  }
}
