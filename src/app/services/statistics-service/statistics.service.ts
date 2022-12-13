import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, retry} from "rxjs";
import {Statistics} from "../../models/statistics";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly apiUrl:string;

  constructor(private http: HttpClient)
  {
    this.apiUrl = environment.apiUrl + 'api/Statistics';
  }

  getServiceStats() : Observable<Statistics>
  {
    return this.http.get<Statistics>(this.apiUrl).pipe(retry(5))
  }
}
