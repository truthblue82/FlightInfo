import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
//import { Database, get, child, set, ref, onValue, getDatabase } from '@angular/fire/database';

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
  phide:boolean = true;
  rphide:boolean = true;
  flags: any = {
    email: true, firstName: true, lastName: true,
    password: true, repeatPassword: true,
    signupBtn: false
  }

  constructor(
    private appTitle: Title,
    //public database: Database,
    //public encDecSvc: EncriptDecriptServiceService,
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
    //
  }

  SignUp(form: NgForm): void {

    const user: User = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      password: this.user.password
    };
    this.userSvc.signUp(user).subscribe((result) => {
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
    //This for create user in realtime database directly
    //const tmp = this.user.email.split('@');
    //const pwdEnc = this.encDecSvc.set(environment.PWS_ENCRIPT_KEY, this.user.password);
    //const dbRef = ref(getDatabase());
    // get(child(dbRef, `users/${tmp[0]}`)).then((snapshot) => {
    //   if(snapshot.exists()) {
    //     this.toastr.warning("User already exists!", "Warning");
    //   } else {
    //     set(ref(this.database, 'users/' + tmp[0]), {
    //       email: this.user.email,
    //       firstName: this.user.firstName,
    //       lastName: this.user.lastName,
    //       password: pwdEnc
    //     }).then(_ => {
    //       this.toastr.success("User is created successful!", "Inform");
    //       form.resetForm();
    //       this.flags.signupBtn = false;
    //       this.router.navigate(['/signin']);
    //     })
    //   }
    // })
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
