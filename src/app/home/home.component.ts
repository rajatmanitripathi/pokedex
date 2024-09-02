import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import {
  ColourPalette,
  Pokemon,
  PokemonInfo,
} from '../models/pokemonAPIModels';
import { PageEvent } from '@angular/material/paginator';
import { typeIconMapping } from '../constants/typeConstant';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { colorPalette } from '../constants/colorPaletteConstant';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
 
  searchControl = new FormControl();
  recommondations: string[] = [];
  filteredOptions: Observable<string[]> = of([]);
  typeIconMapping: { [key: string]: string } = typeIconMapping;
  typeIconMappingList: string[] = Object.keys(typeIconMapping);
  colorPalette: ColourPalette = colorPalette;
  pokemonList: PokemonInfo[] = [];
  originalList: PokemonInfo[] = [];
  pokemon: Pokemon | null = null;
  offset: number = 0;
  paginatedList: PokemonInfo[] = [];
  paginationCount: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;
  selectionList: string[] = [];
  filterElement!: MatSelect;
  people: Subject<any> = new Subject();
  searchDecouncer: Subject<string> = new Subject();

  @ViewChild('pokemonFilter') set content(content: MatSelect) {
    if (content) {
      this.filterElement = content;
    }
  }

  constructor(private apiService: ApiServiceService) {}

  ngOnInit() {
    this.apiService.getPokemonDataList().subscribe((res) => {
      this.pokemon = res;
      if (this.pokemon?.results) {
        this.paginationCount = this.pokemon.count;
        this.pokemonList = this.pokemon?.results;
        this.originalList = this.pokemon?.results;
        this.paginatedList = this.pokemonList.slice(
          this.pageIndex * this.pageSize,
          (this.pageIndex + 1) * this.pageSize
        );

        this.recommondations = this.originalList.map((pokemon) => pokemon.name);
      }
    });
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.setupSearchDebouncer();
  }

  filterPokemonList(
    ogList: PokemonInfo[],
    selectionList: string[]
  ): PokemonInfo[] {
    return ogList.filter((pokemon) => {
      let match = true;

      selectionList.forEach((pokeType) => {
        if(pokeType=="legendary" && !pokemon.pokemonData?.specieData?.is_legendary){
          match=false;
        }
        if(pokeType=="mythical" && !pokemon.pokemonData?.specieData?.is_mythical){
          match=false;
        }
        if (pokeType != 'legendary' && pokeType != 'mythical') {
          if (
            !pokemon.pokemonData?.types
              .map((obj) => obj.type.name)
              .includes(pokeType)
          ) {
            match = false;
          }
        }
      });
      return match;
    });
  }

  filterSearched(ogList: PokemonInfo[], searchedKeyWord: string) {
    if (!searchedKeyWord) {
      return ogList;
    }
    return ogList.filter((pokemon) => {
      return pokemon.name.includes(searchedKeyWord);
    });
  }

  onFilterChange(event: MatSelectChange): void {
    this.selectionList = event.value;
    this.pokemonList = this.filterSearched(
      this.originalList,
      this.searchControl.value
    );
    this.pokemonList = this.filterPokemonList(
      this.pokemonList,
      this.selectionList
    );
    this.paginatedList = this.pokemonList.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
    this.paginationCount = this.pokemonList.length;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const start = event.pageSize * event.pageIndex;
    const end = start + event.pageSize;
    this.paginatedList = this.pokemonList.slice(start, end);
  }

  private setupSearchDebouncer(): void {
    this.searchDecouncer
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term: string) => {
        if ((term && term.length > 2) || term == '') {
          this.pokemonList = this.filterSearched(this.originalList, term);
          this.pokemonList = this.filterPokemonList(
            this.pokemonList,
            this.selectionList
          );
          this.paginatedList = this.pokemonList.slice(
            this.pageIndex * this.pageSize,
            (this.pageIndex + 1) * this.pageSize
          );
          this.paginationCount = this.pokemonList.length;
          console.log(this.paginatedList)
        }
      });
  }

  onSearchInputChange(value: string): void {
    this.searchDecouncer.next(value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.recommondations.filter((recommended) =>
      recommended.toLowerCase().includes(filterValue)
    );
  }

  toggleFilter() {
    this.filterElement.toggle();
  }
}
