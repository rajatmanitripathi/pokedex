import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoaderService {
isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor() { }
showLoader():void{
  this.isLoading.next(true);
}
hideLoader():void
{
  this.isLoading.next(false);
}

}
