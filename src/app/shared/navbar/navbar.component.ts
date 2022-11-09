import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthenticationService} from "../../services/auth-service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserInfoService} from "../../services/user-info-service/user-info.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
    trigger("dropdownAnim", [
      transition(":enter", [
        style({opacity:0}),
        animate('0.6s',
          style({opacity:1})
        )
      ]),
      transition(":leave", [
        style({opacity:1}),
        animate('0.6s',
          style({opacity:0})
        )
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed: boolean;

  isUserAuthorized: boolean;

  login:string;

  navMenuClasses: Record<string, boolean> = {};

  constructor(public authService:AuthenticationService,
              private cookieService:CookieService,
              private router:Router,
              private userInfoService:UserInfoService) { }

  ngOnInit(): void {
    this.isMenuCollapsed = false;

    this.isUserAuthorized = this.authService.isUserAuthorized()

    if(this.isUserAuthorized)
    {
      this.login = this.userInfoService.getLogin();
    }

    this.setCurrentClasses()
  }

  logout() {
    this.authService.logout();

    setTimeout(()=>{
      this.router.navigate([''])
    }, 500)
  }

  setCurrentClasses() {
    this.navMenuClasses = {
        collapsed: !this.isMenuCollapsed
    }
  }

  showMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;

    this.setCurrentClasses();
  }
}
