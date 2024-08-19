import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ColourPalette, PokemonInfo } from '../models/pokemonAPIModels';
import VanillaTilt from 'vanilla-tilt';
import { typeIconMapping } from '../constants/typeConstant';
import { colorPalette } from '../constants/colorPaletteConstant';
import { statIconMapping } from '../constants/statIconConstant';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

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

  constructor(public dialog: MatDialog){

  }

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

  openPokedexDialog(): void { 
    let dialogRef = this.dialog.open(PokemonDetailsComponent, {
      panelClass: 'popupDialog',
      data: { data: this.pokemonData }

    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      console.log("closed");
    }); 
  } 

  ngOnDestroy(){
    if (this.tiltable) {
      this.tiltable.vanillaTilt.destroy();
    }
  }
}
