import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private cookieService:CookieService) { }

  getLogin():string {
    const token = this.cookieService.get('bonumDrive')

    const tokenBody: any = jwtDecode(token);

    if(tokenBody != null)
    {
      return tokenBody.login;
    }

    return '';
  }
}
