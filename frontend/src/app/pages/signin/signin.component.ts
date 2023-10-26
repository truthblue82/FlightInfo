import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputDialogComponent } from 'src/app/shared/input-dialog/input-dialog.component';


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
  encryptedLink: string = '';
  message: string = '';

  constructor(
    public dialog: MatDialog,
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
      if(result.status === 200) {
        this.toastr.success('User logged in Successfully', 'Inform');
        const data = result.body as any;
        sessionStorage.setItem('token', data?.token);
      } else {
        this.toastr.error('User logged in Unsuccessfully', 'Error');
      }
      this.displayModal = false;
      location.assign('/');
    },
    (error) => {
      this.toastr.error(error.error.error, 'Error');
      this.displayModal = false;
    })
  }
  validateEmail(): void {
    this.flagEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
  }
  showDialog(): void {
    let inputDialog = this.dialog.open(
      InputDialogComponent,
      {
        data: {
          title: "Get Encrypted Link",
          message: 'Please input your email!',
          input: '',
          okBtn: 'Submit'
        }
      });
    inputDialog.afterClosed().subscribe(result => {

      if(result) {
      //process here for calling api
      this.userSvc.getEcryptedLink(result)
        .subscribe(response => {
          if(response.status === 200 && response.ok === true) {
            const data = response.body;
            this.encryptedLink = data.loginUrl;
            this.message = data.message;
          } else {
            this.toastr.error('Something went wrong!', 'Error');
          }
        },
        (error) => {
          this.toastr.error(error.error.error, 'Error');
        });
      }
    })
  }
  enableSigninBtn(): void {
    this.signinBtn = this.email.length > 0
                    && this.flagEmail
                    && this.password.length > 0;
  }

  loginWithGoogle(): void {
  }
}
