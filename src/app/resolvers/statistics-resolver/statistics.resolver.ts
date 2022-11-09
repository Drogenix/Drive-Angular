import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Statistics} from "../../models/statistics";
import {StatisticsService} from "../../services/statistics-service/statistics.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsResolver implements Resolve<Statistics> {
  constructor(private statsService: StatisticsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Statistics> {
    return this.statsService.getServiceStats();
  }
}
