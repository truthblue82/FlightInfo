import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  isLogined: boolean = false;
  firstName:string;
  lastName:string;

  constructor(
    private userSvc: UserService
  ) {
    this.user = this.userSvc.getCurrentUser();
    this.firstName = this.user.firstName ?? '';
    this.lastName = this.user.lastName ?? '';
    this.isLogined = this.user ? true : false;
  }

  ngOnInit(): void {
    //
  }

  handleSignUp(): void {}

  handleSignIn(): void {}

  handleSignOut(): void {}
}
