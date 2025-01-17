import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ColourPalette, PokemonInfo } from '../models/pokemonAPIModels';
import VanillaTilt from 'vanilla-tilt';
import { typeIconMapping } from '../constants/typeConstant';
import { colorPalette } from '../constants/colorPaletteConstant';
import { statIconMapping } from '../constants/statIconConstant';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnInit, AfterViewInit {
  @Input() pokemonData!: PokemonInfo;
  statIconMapping: { [key: string]: string } = statIconMapping;
  typeIconMapping: { [key: string]: string } = typeIconMapping;
  colorPalette: ColourPalette = colorPalette;
  tiltable: any;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tiltable = document.querySelector('.pokeMon_'+this.pokemonData.pokemonData?.id);
    if (this.tiltable) {
      VanillaTilt.init(this.tiltable as HTMLElement, {
        max: 20,
        speed: 500,
        reverse: true,
        perspective: 1000,
        glare: true,
        gyroscope: true,
        "max-glare": 1
      });
    }
  }

  ngOnDestroy(){
    if (this.tiltable) {
      this.tiltable.vanillaTilt.destroy();
    }
  }
}
