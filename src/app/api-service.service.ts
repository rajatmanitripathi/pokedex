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
import { evolutionChain } from './models/evoltionChain';
import moment from 'moment';
import pako from 'pako';

@Injectable()
export class ApiServiceService {
  expiryDuration:number = 432000; //5 days
  pokemon: BehaviorSubject<Pokemon | null> = new BehaviorSubject<Pokemon | null>(null);
  constructor(private httpClient: HttpClient, private loaderService: SpinnerLoaderService) {

  }

  getPokemonDataList(): BehaviorSubject<Pokemon | null> {
    this.loaderService.showLoader();
    this.getPokemonDataFromLocalDB().then(res => {
      let pokemonDataFromLocalDB: Pokemon | null = res;
      if (pokemonDataFromLocalDB) {
        this.pokemon.next(pokemonDataFromLocalDB);
        this.loaderService.hideLoader();
      }
      else {
        this.updatePokemonDataListFromApi();
      }
    },
      rej => {
        this.updatePokemonDataListFromApi();
      }).catch(err => {
        this.updatePokemonDataListFromApi();
      });

    return this.pokemon;
  }

  updatePokemonDataListFromApi() {
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
        this.setPokemonDataInLocalDB(res, 432000);
        this.loaderService.hideLoader();
      }
    });
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open("pokemonDatabase", 1);

      request.onupgradeneeded = function (event) {
        let db = request.result;
        if (!db.objectStoreNames.contains("pokemonDataStore")) {
          db.createObjectStore("pokemonDataStore", { keyPath: "id" });
        }
      };

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function (event) {
        reject(event);
      };
    });
  }


  async setItemInLocalDB(key: string, value: any, createdAt: Date, expireAt: Date | null = null): Promise<void> {
    let db = await this.openDatabase();
    let dataToStore: { createdAt: Date, expireAt: Date | null, data: Pokemon } = { createdAt: createdAt, expireAt: expireAt, data: value };

    return new Promise((resolve, reject) => {
      let transaction = db.transaction("pokemonDataStore", "readwrite");
      let objectStore = transaction.objectStore("pokemonDataStore");
      let request = objectStore.put({ id: key, data: dataToStore }); // Using 'key' as the ID

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }

  async getItemFromLocalDB(key: string): Promise<Pokemon> {
    let db = await this.openDatabase();

    return new Promise((resolve, reject) => {
      let transaction = db.transaction("pokemonDataStore", "readonly");
      let objectStore = transaction.objectStore("pokemonDataStore");
      let request = objectStore.get(key);

      request.onsuccess = () => {
        if (request?.result?.data && request.result.data.expireAt && moment().diff(request.result.data.expireAt, "seconds") > 0) {
          reject("Data expired!");
        }
        else {
          resolve(request.result?.data?.data ?? null);
        }
      }
      request.onerror = (event) => reject(event);
    });
  }

  async setPokemonDataInLocalDB(pokemonData: Pokemon, expiryDurationInSecs?: number): Promise<void> {
    let createdAt: Date = moment().toDate();
    let expireAt: Date | null = expiryDurationInSecs ? moment(createdAt).add(expiryDurationInSecs, "seconds").toDate() : null;
    return this.setItemInLocalDB("pokemonData", pokemonData, createdAt, expireAt);
  }

  async getPokemonDataFromLocalDB(): Promise<Pokemon> {
    return this.getItemFromLocalDB("pokemonData");
  }

  compressData(data: any): Uint8Array {
    const jsonString = JSON.stringify(data);
    const compressedData = pako.deflate(jsonString);
    return compressedData;
  }

  decompressData(compressedData: Uint8Array): any {
    const decompressedJsonString = pako.inflate(compressedData, { to: 'string' });
    const originalData = JSON.parse(decompressedJsonString);
    return originalData;
  }


  shuffle(array: any[]) {
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
      apiConstant.pokeApiBaseUrl + apiConstant.pokemonList + "?limit=100000&offset=0"
    );
  }
  getPokemonData(url: string): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(url);
  }
  getSpeciesData(specieUrl: string): Observable<specieDetails> {
    return this.httpClient.get<specieDetails>(specieUrl);
  }
  getEvoChain(evoUrl: string): Observable<evolutionChain> {
    return this.httpClient.get<evolutionChain>(evoUrl);
  }
}
