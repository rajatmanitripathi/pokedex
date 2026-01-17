import { Component, Inject, Input } from '@angular/core';


import { child, evolutionChain, TreeNode } from '../models/evoltionChain';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonInfo } from '../models/pokemonAPIModels';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  chain!: evolutionChain


  modifiedChain: TreeNode[] = []



  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: PokemonInfo }, private apiService: ApiServiceService) {
  }

  convertEvolutionChainToTreeNode(chain: evolutionChain): TreeNode[] {
    // Recursive function to process each evolution
    function processEvolution(evolution: child): TreeNode {
      const id = getIdFromUrl(evolution.species.url);
      const node: TreeNode = {
        label: capitalizeFirstLetter(evolution.species.name),
        data: evolution.species.name,
        expanded: true, // You can adjust this based on your needs
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
      };

      if (evolution.evolves_to && evolution.evolves_to.length > 0) {
        node.children = evolution.evolves_to.map((evol: child) => processEvolution(evol));
      }

      return node;
    }

    // Helper function to capitalize the first letter of a Pokémon's name
    function capitalizeFirstLetter(name: string): string {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    function getIdFromUrl(url: string): string {
      const parts = url.split('/');
      return parts[parts.length - 2]; // ID is the second-to-last part of the URL
    }

    // Start processing from the root of the chain
    this.modifiedChain.push(processEvolution(chain.chain))
    console.log(this.modifiedChain)
    return [processEvolution(chain.chain)];
  }


  ngOnInit() {
    if (this.data?.data?.pokemonData?.specieData?.evolution_chain.url) {
      this.apiService.getEvoChain(this.data?.data?.pokemonData?.specieData?.evolution_chain.url).subscribe((res) => {
        this.chain = res;

        this.convertEvolutionChainToTreeNode(this.chain);
      })

    }

  }


}
