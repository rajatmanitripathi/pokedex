import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PokeMonElasticDetail,
  PokemonHistoryDetails,
} from './models/pokemonAPIModels';
import { EECharacter } from './models/eeCharacterModel';

@Injectable({
  providedIn: 'root',
})
export class ElasticService {
  constructor(private http: HttpClient) {}
  private elasticUrl = 'http://localhost:9000/api';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa(`elastic:BUIzJTzr-mXRQC*VxBWB`),
  });

  findFamiliar(
    inputValue: string,
    docsPerPage: number,
    uuidForThisPort: string,
    exactMatch: boolean
  ): Observable<PokeMonElasticDetail | PokemonHistoryDetails[]> {
    let params = new HttpParams()
      .set('inputValue', inputValue)
      .set('docsPerPage', docsPerPage.toString())
      .set('uuidForThisPort', uuidForThisPort)
      .set('exactMatch', exactMatch);

    return this.http.get<PokeMonElasticDetail | PokemonHistoryDetails[]>(
      `${this.elasticUrl}/getMatchingDocs`,
      {
        headers: this.headers,
        params: params,
      }
    );
  }

  getEECharacter():Observable<EECharacter[]> {
    return this.http.get<EECharacter[]>(
      `${this.elasticUrl}/characters`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  getPaginatedPokeList(
    PageNo: number,
    DocsPerPage: number,
    selectionList: string[],
    filterValue: string,
    uuidForThisPort: string
  ): Observable<PokeMonElasticDetail> {
    return this.http.get<PokeMonElasticDetail>(
      `${this.elasticUrl}/getPaginatedDocs`,
      {
        params: {
          pageNo: PageNo.toString(),
          docsPerPage: DocsPerPage.toString(),
          selectionList: selectionList.toString(),
          inputValue: filterValue.toString(),
          uuidForThisPort: uuidForThisPort,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
