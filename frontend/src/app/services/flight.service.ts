import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlightInfoPayload } from '../models/FlightInfoPayload';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addFlight(data: FlightInfoPayload) {
    return this.http.post(
      `${environment.REST_API_SERVICE}/flights`,
      data,
      {observe: 'response'}
    );
  }
}
