import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomProgressBarComponent } from '../custom-progress-bar/custom-progress-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PokeballSpinnerComponent } from '../pokeball-spinner/pokeball-spinner.component';
import { MatInputModule } from '@angular/material/input';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

const routes: Routes = [
  {"path":"",
   "component":HomeComponent,
   "pathMatch":'full'
  }
];

@NgModule({
  declarations: [HomeComponent, PokemonCardComponent, CustomProgressBarComponent,PokeballSpinnerComponent, PokemonDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule, MatSelectModule,MatTooltipModule,MatPaginatorModule,MatInputModule,MatAutocompleteModule,
    ReactiveFormsModule,MatIconModule
  ]
})
export class HomeModule { }
