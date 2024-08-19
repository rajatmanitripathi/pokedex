import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonInfo } from '../models/pokemonAPIModels';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PokemonInfo){
    
  }

  ngOnInit(){
    console.log(this.data)
  }

}
