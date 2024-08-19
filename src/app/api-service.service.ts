import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiConstant } from './constants/apiConstants';
import {
  Pokemon,
  PokemonDetails,
  PokemonInfo,
  specieDetails,
} from './models/pokemonAPIModels';
import { SpinnerLoaderService } from './spinner-loader.service';

@Injectable()
export class ApiServiceService {
  pokemon: BehaviorSubject<Pokemon | null> = new BehaviorSubject<Pokemon | null>(null);
  constructor(private httpClient: HttpClient, private loaderService:SpinnerLoaderService) {

  }
 
  getPokemonDataList(): BehaviorSubject<Pokemon | null> {
    this.loaderService.showLoader();
    this.getAllPokemonList().subscribe(async (res) => {

      if (res?.results) {
        // Map through all the Pokémon and get their data
        const pokemonPromises = res.results.map(async (pokemon: PokemonInfo) => {
          const pokemonDataUrl = pokemon?.url;
  
          const pokemonData = await this.getPokemonData(pokemonDataUrl).toPromise();
          if (pokemonData?.species?.url) {
            pokemon.pokemonData = pokemonData;
  
            const speciesUrl = pokemonData?.species?.url;
            const speciesData = await this.getSpeciesData(speciesUrl).toPromise();
  
            pokemon.pokemonData.specieData = speciesData;
          }
        });
  
        // Wait for all promises to complete
        await Promise.all(pokemonPromises);
  
        // Once all data is loaded, update the BehaviorSubject
        this.shuffle(res.results);
        this.pokemon.next(res);
        this.loaderService.hideLoader()
      }
    });
    
    return this.pokemon;
  }

  shuffle(array:any[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  getAllPokemonPaginatedList(offset: number, limit: number = 12): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
       `${apiConstant.pokeApiBaseUrl}pokemon?limit=${limit}&offset=${offset}`
    );
  }
  getAllPokemonList(): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
       apiConstant.pokeApiBaseUrl+apiConstant.pokemonList+"?limit=100000&offset=0"
    );
  }
  getPokemonData(url: string): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(url);
  }
  getSpeciesData(specieUrl: string): Observable<specieDetails> {
    return this.httpClient.get<specieDetails>(specieUrl);
  }
}
