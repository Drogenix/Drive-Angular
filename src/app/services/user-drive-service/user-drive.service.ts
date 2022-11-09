import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Image} from "../../models/image";
import {AuthenticationService} from "../auth-service/authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserDriveService {

  private readonly _apiUrl: string;

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthenticationService) {
    this._apiUrl = environment.apiUrl;
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 401)
    {
      this.authService.logout();

      this.router.parseUrl('');
    }

    return throwError(()=> new Error(error.message))
  }

  getImage(url:string) : Observable<Blob>
  {
    return this.httpClient.get(url, {responseType:'blob'}).pipe(retry(10));
  }

  getImages() : Observable<Image[]>
  {
    const url = this._apiUrl + 'api/Images'

    return this.httpClient.get<Image[]>(url).pipe(retry(10), catchError(err => this.handleError(err)));
  }

  uploadImage(file: File) : Observable<Image>
  {
    const url = this._apiUrl + 'api/Images/add'

    let formParams = new FormData();

    const fileName = file.name;

    formParams.append('file', file, fileName)

    return this.httpClient.post<Image>(url, formParams).pipe(retry(2))
  }

  deleteImage(id:number) : Observable<any>
  {
    const url = this._apiUrl + 'api/Images/delete/' + id

    return this.httpClient.delete(url).pipe(retry(10));
  }

}
