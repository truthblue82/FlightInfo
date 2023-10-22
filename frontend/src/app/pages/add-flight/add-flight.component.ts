import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {
  displayModal: boolean = false;
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments: string;

  constructor(
    private appTitle: Title,
    private toastr: ToastrService
  ) {
    this.appTitle.setTitle('Flight Info - Add Flight Details')
    this.airline = '';
    this.arrivalDate = '';
    this.arrivalTime = '';
    this.flightNumber = '';
    this.numOfGuests = 0;
    this.comments = '';
  }

  ngOnInit(): void {
    //
  }

  handleFormSubmit(): void {
    //
  }
}
