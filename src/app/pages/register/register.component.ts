import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth-service/authentication.service";
import {LoaderService} from "../../services/loader-service/loader.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegistered:boolean;

  isRegisterFailed:boolean;

  signUpForm = this.formBuilder.group({
    login: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(22)]],
    password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(22)]]
  })

  constructor(private formBuilder: FormBuilder, public loaderService:LoaderService,
              private authService:AuthenticationService,
              private router:Router,
              private cookieService:CookieService) { }

  ngOnInit(): void {
    this.isRegistered = false;
  }

  private handleError(error:HttpErrorResponse)
  {
    this.loaderService.setHttpProgressStatus(false);

    this.isRegisterFailed = true;

    return throwError(()=> new Error('Error! '+error.message));
  }

  signUp()
  {
    this.isRegisterFailed = false;

    const login = this.signUpForm.get('login')?.value;

    const password = this.signUpForm.get('password')?.value;

    if(login != null && password != null)
    {
      this.authService.register(login, password)
        .pipe(catchError(err => this.handleError(err)))
        .subscribe(token => {
        this.loaderService.setHttpProgressStatus(false);

        this.cookieService.set('bonumDrive', token)

        this.isRegistered = true;

        setTimeout(()=> {this.router.navigate(['drive'])}, 1200)
      })
    }

  }


}
