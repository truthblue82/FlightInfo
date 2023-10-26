import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayModal: boolean = false;
  user: User;


  constructor(
    private appTitle: Title,
    private userSvc: UserService
  ) {
    this.displayModal = true;
    this.appTitle.setTitle('Flight Info - Profile');
    this.user = {
      email: '', firstName: '', lastName: ''
    }

  }

  ngOnInit(): void {
    this.displayModal = false;
    this.user = this.userSvc.getCurrentUser() as User;
  }
}
