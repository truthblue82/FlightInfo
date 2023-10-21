import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sigin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  displayModal: boolean = false;
  users: User[];
  email: string;
  password: string;
  flagEmail: boolean = true;
  signinBtn: boolean = false;

  constructor(
    private appTitle: Title,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.appTitle.setTitle('Flight Info - Sign In');
    this.users = [];
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
    //
  }

  handleLogin(form: NgForm): void {
    //
  }
  validateEmail(): void {
    this.flagEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
  }
  enableSigninBtn(): void {
    this.signinBtn = this.flagEmail;
  }
}
