import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./routing/routing.module";
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainComponent } from './pages/main/main.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserDriveComponent } from './pages/user-drive/user-drive.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginSpinnerComponent } from './shared/spinner/login-spinner.component';
import {AuthenticationService} from "./services/auth-service/authentication.service";
import {LoaderService} from "./services/loader-service/loader.service";
import {NotificationComponent } from './shared/notification/notification.component';
import {CookieService} from "ngx-cookie-service";
import {UserDriveService} from "./services/user-drive-service/user-drive.service";
import { DropFileComponent } from './shared/drop-file/drop-file.component';
import {AuthInterceptor} from "./auth-interceptor/auth-interceptor.interceptor";
import {StatisticsService} from "./services/statistics-service/statistics.service";
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UserDriveComponent,
    NavbarComponent,
    LoginSpinnerComponent,
    NotificationComponent,
    DropFileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    RouterOutlet,
    RouterLinkWithHref,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService, LoaderService, CookieService, UserDriveService, StatisticsService],
  bootstrap: [AppComponent ]
})
export class AppModule { }
