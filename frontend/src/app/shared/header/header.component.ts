import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare var googleSignout: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  isLogined: boolean = false;
  firstName:string = '';
  lastName:string = '';

  constructor(
    private userSvc: UserService,
    private router: Router
  ) {
    this.user = '';
  }

  ngOnInit(): void {
    this.user = this.userSvc.getCurrentUser();
    this.firstName = this.user?.firstName ?? '';
    this.lastName = this.user?.lastName ?? '';
    this.isLogined = this.user ? true : false;
  }

  handleSignOut(): void {
    this.userSvc.logout();
  }
}
