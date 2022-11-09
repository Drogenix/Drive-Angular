import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Image} from "../../models/image";
import {UserDriveService} from "../../services/user-drive-service/user-drive.service";

@Injectable({
  providedIn: 'root'
})
export class UserImagesResolver implements Resolve<Image[]> {

  constructor(private userDriveService: UserDriveService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image[]> {
    return this.userDriveService.getImages();
  }
}
