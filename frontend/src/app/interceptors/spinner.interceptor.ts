import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerSvc: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerSvc.show();

    return next.handle(request)
    .pipe(tap((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse) {
        this.spinnerSvc.hide();
      }
    }, (event) => {
      this.spinnerSvc.hide();
    }))
  }
}
