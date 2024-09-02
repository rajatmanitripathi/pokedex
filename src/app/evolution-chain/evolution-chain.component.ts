import { Component, Input } from '@angular/core';
import { child, evolutionChain } from '../models/evoltionChain';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.scss'
})
export class EvolutionChainComponent {
  @Input() evoChain!:evolutionChain;
  @Input() childChain!:child;
arrowIcon:string[]=["/assets/svg/arrow-right-svgrepo-com (1).svg","/assets/svg/arrow-right-down-svgrepo-com.svg","/assets/svg/arrow-right-up-svgrepo-com.svg",]
  ngOnInit(){
    
    console.log(this.evoChain);
    console.log(this.childChain);
  }
}
