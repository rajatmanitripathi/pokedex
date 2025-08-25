import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ElasticService } from '../elastic.service';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { PokemonDetails, PokeMonElasticDetail, PokemonHistoryDetails } from '../models/pokemonAPIModels';
import { typeIconMapping } from '../constants/typeConstant';
import { v4 as uuidv4 } from 'uuid';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  viewPokeData!: PokemonDetails[] | undefined;
  totalPokeDocs!: number;
  filteredOptions: Observable<string[]> = of([]);
  searchControl = new FormControl();
  paginationCount: number = 0;
  pageSize: number = 12;
  currentPage: number = 0;
  searchDecouncer: Subject<string> = new Subject();
  selectionList: string[] = [];
  filterElement!: MatSelect;
  typeIconMapping: { [key: string]: string } = typeIconMapping;
  typeIconMappingList: string[] = Object.keys(typeIconMapping);
  flag:boolean=false;
  tiltable: any;
  @ViewChild('pokemonFilter') set content(content: MatSelect) {
    if (content) {
      this.filterElement = content;
    }
  }

  constructor(private elasticService: ElasticService) { }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.filterPokeByNameAndType(value || '', this.selectionList))
    );
    const uuidForThisPort=this.getOrCreateUserId();
    this.elasticService.getPaginatedPokeList(this.currentPage,this.pageSize,this.selectionList,(this.searchControl.value || '').toLowerCase(),uuidForThisPort)
      .subscribe((pokeData) => {
        this.viewPokeData = pokeData.pokemonData;
        this.totalPokeDocs = pokeData.totalDocs;
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
  private filterPokeByNameAndType(value: string, selectedFilterList: string[]): Observable<string[]> {
    const uuidForThisPort=this.getOrCreateUserId();
    const filterValue = value.toLowerCase();
    if (this.flag) {
      this.flag = false;
    }
    return this.elasticService.findFamiliar(filterValue, this.pageSize, uuidForThisPort,false).pipe(
      map((filteredRes: PokeMonElasticDetail | PokemonHistoryDetails[] | null) => {
        if (filteredRes === null) {
          // Handle null case
          return [];
        }
    
        if ('pokemonData' in filteredRes && filteredRes.pokemonData) {
          // Handle PokeMonElasticDetail type
          return filteredRes.pokemonData.map((doc) => doc.name);
        } 
        
        if (Array.isArray(filteredRes) && filteredRes.every(item => 'searchedField' in item && 'timestamp' in item)) {
          // Handle array of PokemonHistoryDetails
          return filteredRes.map((hist) => hist.searchedField);
        }
    
        // Default to an empty array if none of the conditions match
        return [];
      })
    );
    
  }


  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    const uuidForThisPort=this.getOrCreateUserId();
   
    this.elasticService.getPaginatedPokeList(this.currentPage,this.pageSize,this.selectionList, (this.searchControl.value || '').toLowerCase(),uuidForThisPort)
    .subscribe((pokeData) => {
      this.viewPokeData = pokeData.pokemonData;
      this.totalPokeDocs = pokeData.totalDocs;
    });
   
    
  }

  onFilterChange(event: MatSelectChange): void {
    this.selectionList = event.value;
    this.currentPage = 0; // Reset to the first page when the filter changes
    const uuidForThisPort=this.getOrCreateUserId();
    this.elasticService.getPaginatedPokeList(this.currentPage,this.pageSize,this.selectionList,(this.searchControl.value || '').toLowerCase(),uuidForThisPort)
      .subscribe((pokeData) => {
        this.viewPokeData = pokeData.pokemonData;
        this.totalPokeDocs = pokeData.totalDocs;
      });
  }

  toggleFilter() {
    this.filterElement.toggle();
  }

  onEnter(filterValue: string|null): void {
    this.flag=!this.flag;
    // if (!filterValue.trim()) {
    //   return;
    // }
    const uuidForThisPort=this.getOrCreateUserId();
    this.elasticService.getPaginatedPokeList(this.currentPage,this.pageSize,this.selectionList,(this.searchControl.value || '').toLowerCase(),uuidForThisPort).pipe(
      map((filteredRes) => filteredRes)
    ).subscribe((filteredRes) => {
      this.viewPokeData = filteredRes.pokemonData;
      this.totalPokeDocs = filteredRes.totalDocs;
      console.log(this.viewPokeData);
      console.log(this.totalPokeDocs);
    });
  }
}
