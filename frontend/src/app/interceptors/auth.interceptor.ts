import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userSvc: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('token');

    if(token) {
      request = request.clone({
        setHeaders: {
          'Content-Type' : 'application/json',
          'Cross-Origin-Opener-Policy':'same-origin, same-origin-allow-popups, unsafe-none',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': environment.APP_BASE_URL,
          'Content-Security-Policy-Report-Only': 'script-src'
        }
      });

      return next.handle(request).pipe(
        tap({
          next: (event) => {
            if(event instanceof HttpResponse) {
              if(event.status === 401) {
                this.toastr.error('Unauthorized access!', 'Error');
                this.router.navigate(['/'], {queryParams: null});
              }
            }
            return event;
          },
          error: (error) => {
            if(error.status === 401) {
              this.toastr.error('Unauthorized access!');
            } else if(error.status === 404){
              this.toastr.error('Page not found!', 'Error');
            }
            this.router.navigate(['/'], {queryParams: null});
          }
        }));
    } else
      return next.handle(request);
  }
}
