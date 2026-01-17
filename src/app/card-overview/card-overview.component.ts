import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  PokemonDetails,
  PokeMonElasticDetail,
  PokemonHistoryDetails,
} from '../models/pokemonAPIModels';
import { ElasticService } from '../elastic.service';
import { chain } from '../models/evoltionChain';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrl: './card-overview.component.scss',
})
export class CardOverviewComponent {
  tiltable: any;
  angle: number = 0;
  isDetailedCard: boolean = true;
  selectedEvo!: PokemonDetails | undefined;
  flipDirection!: 'flippedfrRight' | 'flippedfrLeft';
  isFlipped: boolean=false;
  behindPokeData: PokemonDetails | undefined = undefined;
  visited: boolean = false;
  frontFlipped: boolean = false;
  evoNextPrev: { next: PokemonDetails[]; prev: PokemonDetails | undefined } = {
    next: [],
    prev: undefined,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      pokemonData: PokemonDetails | undefined;
    },
    private elasticService: ElasticService
  ) { }
  ngOnInit(): void {
    if (this.data.pokemonData?.evolutionChain?.chain) {
      this.updateNextPrevPokemonFromEvoChain(
        this.data.pokemonData.name,
        this.data.pokemonData.evolutionChain.chain
      );
    }
    console.log(this.evoNextPrev.prev);
    console.log('debugging pokemon data');
  }
  flipRight() {
    setTimeout(()=>{
      this.isFlipped=!this.isFlipped;
    },200)
    
    this.angle += 180;
  }

  flipLeft() {
   setTimeout(()=>{
      this.isFlipped=!this.isFlipped;
    },200)
    this.angle -= 180;
  }
  showMore(selectedEvo: PokemonDetails) {
    setTimeout(() => {
      this.behindPokeData = { ...selectedEvo };
      this.data.pokemonData = { ...selectedEvo };
    }, 200);
    if (selectedEvo.evolutionChain?.chain) {
      this.evoNextPrev.next = [];
      this.evoNextPrev.prev = undefined;
      this.updateNextPrevPokemonFromEvoChain(
        selectedEvo.name,
        selectedEvo.evolutionChain.chain
      );
    }
  }
  updateNextPrevPokemonFromEvoChain(
    pokeName: string,
    evoChain: chain,
    parent: chain | null = null
  ): void {
    if (pokeName === evoChain.species.name) {
      this.checkInChain(evoChain, parent);
      return;
    }
    if (evoChain.evolves_to.length == 0) {
      return;
    }

    for (let next of evoChain.evolves_to) {
      this.updateNextPrevPokemonFromEvoChain(pokeName, next, evoChain);
      if (evoChain.evolves_to.length==0) return;

    }
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
  checkInChain(chain: chain, parent: chain | null): void {
      for (let nextChain of chain.evolves_to) {
        const uuidForThisPort = this.getOrCreateUserId();
        const filterValue = nextChain.species.name.toLowerCase();
        if (!this.evoNextPrev.next) {
          this.evoNextPrev.next = [];
        }
        this.elasticService
          .findFamiliar(filterValue, 1, uuidForThisPort, true)
          .subscribe(
            (
              nextObj: PokeMonElasticDetail | PokemonHistoryDetails[] | null
            ) => {
              if (nextObj && !Array.isArray(nextObj)) {
                console.log('nextobj next');
                console.log(nextObj);
                const pokemon = nextObj.pokemonData?.[0];
                if (pokemon) {
                  this.evoNextPrev.next.push(pokemon);
                }
              }
            }
          );
      }
    

    if (parent != null) {
      const uuidForThisPort = this.getOrCreateUserId();
      const filterValue = parent.species.name.toLowerCase();
      this.elasticService
        .findFamiliar(filterValue, 1, uuidForThisPort, true)
        .subscribe(
          (nextObj: PokeMonElasticDetail | PokemonHistoryDetails[] | null) => {
            if (nextObj && !Array.isArray(nextObj)) {
              const pokemon = nextObj.pokemonData?.[0];
              if (pokemon) {
                this.evoNextPrev.prev = pokemon;
              }
            }
          }
        );
    }
  }
}
