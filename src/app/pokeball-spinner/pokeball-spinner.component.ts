import { Component } from '@angular/core';
import { SpinnerLoaderService } from '../spinner-loader.service';

@Component({
  selector: 'app-pokeball-spinner',
  templateUrl: './pokeball-spinner.component.html',
  styleUrl: './pokeball-spinner.component.scss'
})
export class PokeballSpinnerComponent {
isLoading:boolean=false;
  constructor(private loaderService:SpinnerLoaderService){}
  ngOnInit(){
    this.loaderService.isLoading.subscribe((res)=>{
      this.isLoading=res;
    })
  }

}
