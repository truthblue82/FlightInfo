import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

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
    private userSvc: UserService,
    private toastr: ToastrService
  ) {
    this.appTitle.setTitle('Flight Info - Sign In');
    this.users = [];
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.displayModal = true;
    this.userSvc.signIn(this.email, this.password)
    .subscribe((result) => {
      console.log('result', result);
      if(result.status === 200) {
        this.toastr.success('User logged in Successfully', 'Inform');
        const data = result.body as any;
        sessionStorage.setItem('token', data?.token);
      } else {
        this.toastr.error('User logged in Unsuccessfully', 'Error');
      }
      this.displayModal = false;
      this.router.navigate(['/']);
    },
    (error) => {
      this.toastr.error(error.error.error, 'Error');
      this.displayModal = false;
    })
  }
  validateEmail(): void {
    this.flagEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
  }
  enableSigninBtn(): void {
    this.signinBtn = this.email.length > 0
                    && this.flagEmail
                    && this.password.length > 0;
  }
}
