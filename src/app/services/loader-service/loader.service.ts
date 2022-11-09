import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  inProccess:BehaviorSubject<boolean>;

  constructor()
  {
    this.inProccess = new BehaviorSubject<boolean>(false );
  }

  setHttpProgressStatus(inProcess: boolean) {
    this.inProccess.next(inProcess);
  }
}
