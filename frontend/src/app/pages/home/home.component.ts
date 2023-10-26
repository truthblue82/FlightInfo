import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .all {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 20px 0;
        background-image: url(../../../assets/images/background_img1.jpg)
      }
      .top-left {
        position: absolute;
        top: 8px;
        left: 16px;
        margin-top: 60px;
        margin-left: 40px;
        color: white;
        text-shadow: 2px 2px 4px #000000;
        font-size: 60px;
        font-style: italic;
        font-weight: bold;
        font-family: 'Georgia', Times, serif;
      }

      .bottom-right {
        position: absolute;
        bottom: 8px;
        right: 16px;
        margin-bottom: 50px;
        margin-right: 40px;
        color: white;
        text-shadow: 2px 2px 4px #000000;
        font-size: 40px;
        font-style: italic;
        font-weight: bold;
        font-family: 'cursive';
      }
      .container {
        position: relative;
        margin-left: 40px;
        width: 80%;
      }
      .image1 {
        display: block;
        width: 80%;
      }
      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #2874a6;
        overflow: hidden;
        width: 80%;
        height: 0;
        transition: 0.5s ease;
      }
      .container:hover .overlay {
        height: 100%;
      }
      .text {
        white-space: nowrap;
        color: white;
        font-size: 20px;
        font-family: 'Georgia', Times, serif;
        position: absolute;
        overflow: hidden;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }
      .container2 {
        position: relative;
        width: 30%;
      }
      .image2 {
        display: block;
        width: 80%;
        height: auto;
      }
      .overlay2 {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #2874a6;
        overflow: hidden;
        width: 0;
        height: 100%;
        transition: 0.5s ease;
      }
      .container2:hover .overlay2 {
        width: 80%;
      }
      .carousel-item img {
        height: 80vh;
        object-fit: cover;
      }
    `]
})
export class HomeComponent implements OnInit {
  user?: User;
  code!: string;

  constructor(
    private appTitle: Title,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.appTitle.setTitle('Flight System - Home Page');
    this.route.queryParams.subscribe(params => {
      this.code = params['code'] || ''
    });
    console.log('code', this.code);
    this.user = this.userSvc.getCurrentUser();
  }

  ngOnInit(): void {
    if(this.code && this.user === undefined) {
      this.userSvc.authenWithCode(this.code)
      .subscribe((result: any) => {

        if(result.token) {
          sessionStorage.setItem('token', result.token);
          this.user = this.userSvc.getCurrentUser();
          location.assign('/');
        }
      });
    }
  }
}
