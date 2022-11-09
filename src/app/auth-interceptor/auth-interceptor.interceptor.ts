import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    let req = request;

    if(this.cookieService.check('bonumDrive'))
    {
      const token = this.cookieService.get('bonumDrive');

      req = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' + token)
      });
    }

    return next.handle(req);
  }
}
