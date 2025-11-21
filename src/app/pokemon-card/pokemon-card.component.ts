import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import {
  ColourPalette,
  PokemonDetails,
  PokeMonElasticDetail,
  PokemonHistoryDetails,
  PokemonInfo,
} from '../models/pokemonAPIModels';
import VanillaTilt from 'vanilla-tilt';
import { typeIconMapping } from '../constants/typeConstant';
import { colorPalette } from '../constants/colorPaletteConstant';
import { statIconMapping } from '../constants/statIconConstant';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { chain, evolutionChain } from '../models/evoltionChain';
import { isEmpty } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ElasticService } from '../elastic.service';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { CardOverviewComponent } from '../card-overview/card-overview.component';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements  AfterViewInit {
  @Input() pokemonData!: PokemonDetails | undefined;
  @Input() isDetailedCard: boolean = false;
  @Input() ListOfPokeData!: PokemonDetails[] | undefined;
  statIconMapping: { [key: string]: string } = statIconMapping;
  typeIconMapping: { [key: string]: string } = typeIconMapping;
  colorPalette: ColourPalette = colorPalette;
  tiltable: any;
  @Input() evoNextPrev: { next: PokemonDetails[]; prev: PokemonDetails | undefined } = {
    next: [],
    prev: undefined,
  };
  visited: boolean = false;
  isVisible: boolean = false;
  isFlipped = false;
  @Input() flipDirection!: 'flippedfrRight' | 'flippedfrLeft';
  selectedEvo!: PokemonDetails;
  @Input() isdialogueBoxOpen: boolean = false;
  // animationStates: boolean[] = Array(this.evoNextPrev.next.length).fill(false);
  // dialog = inject(MatDialog);
  constructor(
    public dialog: MatDialog,
    // private elasticService: ElasticService,
    // private service: ApiServiceService
  ) {}
  openDialog(): void {
    this.dialog.open(CardOverviewComponent, {
      data: { pokemonData: this.pokemonData, isdialogueBoxOpen: false },
      panelClass: 'no-container',
       maxWidth: '500vw',
      height: '100vh',
      width: '500vw',
    });
  }
  

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const lastPart = parts.pop();
      return lastPart?.split(';').shift() || null;
    }

    return null;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  getOrCreateUserId() {
    let userId = this.getCookie('userId');

    if (!userId) {
      userId = uuidv4();
      document.cookie = `userId=${userId}; path=/; Secure; SameSite=Strict;`;
      console.log('Generated and stored new userId:', userId);
    } else {
      console.log('Existing userId found:', userId);
    }

    return userId;
  }
  ngAfterViewInit() {
    this.tiltable = document.querySelector(
      `.pokeMon_${this.isDetailedCard ? 'detailed_' : ''}` +
        this.pokemonData?.id
    );
    if (this.tiltable) {
      VanillaTilt.init(this.tiltable as HTMLElement, {
        max: 20,
        speed: 500,
        reverse: true,
        perspective: 1000,
        glare: true,
        gyroscope: true,
        'max-glare': 1,
      });
    }
  }
 
  getObjectByName(
    list: PokemonDetails[] | undefined,
    searchText: string
  ): PokemonDetails | undefined {
    if (!list || !searchText) return undefined;

    return list.find((item) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  openPokedexDialog(): void {
    let dialogRef = this.dialog.open(PokemonDetailsComponent, {
      panelClass: 'popupDialog',
      data: { data: this.pokemonData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

  ngOnDestroy() {
    if (this.tiltable) {
      this.tiltable.vanillaTilt.destroy();
    }
  }
}
