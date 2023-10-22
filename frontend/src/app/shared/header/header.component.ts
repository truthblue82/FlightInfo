import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any[];

  firstName:string;

  constructor() {
    this.firstName = "Admin";
    this.user = [];
  }

  ngOnInit(): void {
    //
  }

  handleSignUp(): void {}

  handleSignIn(): void {}

  handleSignOut(): void {}
}
