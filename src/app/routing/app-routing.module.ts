import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../pages/login/login.component";
import {MainComponent} from "../pages/main/main.component";
import {UserDriveComponent} from "../pages/user-drive/user-drive.component";
import {UserDriveResolver} from "../resolvers/user-images-resolver/user-images.resolver";
import {LoginPageGuard} from "../guards/login-page-guard/login-page.guard";
import {MainPageGuard} from "../guards/main-page-guard/main-page.guard";
import {AuthGuard} from "../guards/auth-guard/auth.guard";
import {StatisticsResolver} from "../resolvers/statistics-resolver/statistics.resolver";
import {RegisterComponent} from "../pages/register/register.component";

const routes: Routes = [
  {
    path:'', component: MainComponent, data:{animation:'mainPage'}, canActivate:[MainPageGuard], resolve:{data:StatisticsResolver}
  },
  {
    path:'login', component:LoginComponent, data:{animation:'loginPage'}, canActivate:[LoginPageGuard]
  },
  {
    path:'register', component:RegisterComponent, data:{animation:'registerPage'}, canActivate:[LoginPageGuard]
  },
  {
    path:'drive', component:UserDriveComponent, data:{animation:'drivePage'}, canActivate:[AuthGuard], resolve:{data: UserDriveResolver}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
