import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/models/User';
import { EncriptDecriptServiceService } from 'src/app/services/encript-decript-service.service';
import { environment } from 'src/environments/environment.prod';
import { SpinnerService } from 'src/app/services/spinner.service';
import { userGuard } from '../../guards/user.guard';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  users: User[];
  user: User;
  repeatPassword: string;
  displayModal: boolean = false;
  flags: any = {
    email: true, firstName: true, lastName: true,
    password: true, repeatPassword: true,
    signupBtn: false
  }

  constructor(
    private appTitle: Title,
    private router: Router,
    private userSvc: UserService,
    private toastr: ToastrService
  ) {
    this.appTitle.setTitle('Flight Info - Sign up');
    this.users = [];
    this.user = {
      email: '', firstName: '', lastName: '',
      password: ''
    };
    this.repeatPassword = '';
  }

  ngOnInit(): void {
  }

  SignUp(): void {
    const user: User = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      password: this.user.password
    };
    this.displayModal = true;
    this.userSvc.signUp(user)
    .subscribe((result) => {
      if(result.status === 200) {
        this.toastr.success('User Created Successfully', 'Please Login');
      } else {
        this.toastr.error('User registered unsuccessfully!', 'Error');
      }
      this.displayModal = false;
      this.router.navigate(['/']);
    },
    (error) => {
      this.toastr.error('Something went wrong!', 'Error');
      this.displayModal = false;
    });
  }

  validateString(el: HTMLInputElement, name: string): void {
    let flag = /^[a-zA-Z ]+$/.test(el.value);
    this.flags[name] = flag;
  }

  validateEmail(el: HTMLInputElement): void {
    this.flags.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.value);
  }
  comparePassword():void {
    if(this.user.password !== this.repeatPassword) {
      this.flags.repeatPassword = false;
    } else {
      this.flags.repeatPassword = true;
    }
  }

  enableSignupBtn(): void {
    this.flags.signupBtn = this.flags.email
                        && this.flags.firstName
                        && this.flags.lastName
                        && this.flags.password
                        && this.flags.repeatPassword;
  }
}
