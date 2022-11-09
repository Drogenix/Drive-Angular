import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth-service/authentication.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader-service/loader.service";
import {CookieService} from "ngx-cookie-service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('loginAnims', [
      transition(':leave',[
        style({opacity:1}),
        animate('500ms', style({opacity:0}))
      ])
    ])
  ]
})
export class LoginComponent{

  isLoginFailed:boolean = false;

  loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    password:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              public loaderService:LoaderService,
              private authService:AuthenticationService,
              private router:Router,
              private cookieService:CookieService){}

  login() {
    this.isLoginFailed = false;

    const login = this.loginForm.get('login')?.value;

    const password = this.loginForm.get('password')?.value;

    if(login != null && password != null)
    {
      this.authService.login(login, password)
        .pipe(catchError(err => this.handleLoginError(err)))
        .subscribe(token => {
        this.loaderService.setHttpProgressStatus(false);

        this.cookieService.set('bonumDrive', token)

        setTimeout(()=> {this.router.navigate(['drive'])}, 800)
      });
    }
  }

  private handleLoginError(error:HttpErrorResponse)
  {
    setTimeout(()=> this.isLoginFailed = true, 500)

    return throwError(()=> new Error(error.message))
  }

}
