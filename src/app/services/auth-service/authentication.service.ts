import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {catchError, Observable, retry, throwError} from "rxjs";
import {LoaderService} from "../loader-service/loader.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly apiUrl:string;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private loaderService:LoaderService)
  {
    this.apiUrl = environment.apiUrl;
  }

  private handleError(error:HttpErrorResponse) {
    setTimeout(()=> this.loaderService.setHttpProgressStatus(false), 500)

    return throwError(()=> new Error('Error! '+error.message));
  }

  login(login:string, password:string):Observable<string> {
    const url = this.apiUrl + 'api/Authentication/login'

    this.loaderService.setHttpProgressStatus(true);

    return this.http.post(url, {login:login, password:password}, {responseType:"text"}).pipe(retry(10));
  }

  logout() {
    this.cookieService.delete('bonumDrive');
  }

  register(login:string, password:string):Observable<string> {
    const url = this.apiUrl + 'api/Authentication/register'

    this.loaderService.setHttpProgressStatus(true);

    return this.http.post(url, {login:login, password:password}, {responseType:"text"})
      .pipe(
        retry(10),
        catchError(err => this.handleError(err)),
      );
  }

  isUserAuthorized():boolean {
    return this.cookieService.check('bonumDrive')
  }
}
