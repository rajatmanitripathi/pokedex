import { Component, Inject, Input } from '@angular/core';


import { child, evolutionChain, TreeNode } from '../models/evoltionChain';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  @Input() chain: evolutionChain = {
    "baby_trigger_item": null,
    "chain": {
      "evolution_details": [],
      "evolves_to": [
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": {
                "name": "water-stone",
                "url": "https://pokeapi.co/api/v2/item/84/"
              },
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "use-item",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/3/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "vaporeon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/134/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": {
                "name": "thunder-stone",
                "url": "https://pokeapi.co/api/v2/item/83/"
              },
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "use-item",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/3/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "jolteon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/135/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": {
                "name": "fire-stone",
                "url": "https://pokeapi.co/api/v2/item/82/"
              },
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "use-item",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/3/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "flareon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/136/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": 160,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "day",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "espeon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/196/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": 160,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "night",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "umbreon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/197/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "eterna-forest",
                "url": "https://pokeapi.co/api/v2/location/8/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "pinwheel-forest",
                "url": "https://pokeapi.co/api/v2/location/375/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "kalos-route-20",
                "url": "https://pokeapi.co/api/v2/location/650/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": {
                "name": "leaf-stone",
                "url": "https://pokeapi.co/api/v2/item/85/"
              },
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "use-item",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/3/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "leafeon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/470/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "sinnoh-route-217",
                "url": "https://pokeapi.co/api/v2/location/48/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "twist-mountain",
                "url": "https://pokeapi.co/api/v2/location/380/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": null,
              "location": {
                "name": "frost-cavern",
                "url": "https://pokeapi.co/api/v2/location/640/"
              },
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": {
                "name": "ice-stone",
                "url": "https://pokeapi.co/api/v2/item/885/"
              },
              "known_move": null,
              "known_move_type": null,
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "use-item",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/3/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "glaceon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/471/"
          }
        },
        {
          "evolution_details": [
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
              },
              "location": null,
              "min_affection": 2,
              "min_beauty": null,
              "min_happiness": null,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            },
            {
              "gender": null,
              "held_item": null,
              "item": null,
              "known_move": null,
              "known_move_type": {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
              },
              "location": null,
              "min_affection": null,
              "min_beauty": null,
              "min_happiness": 160,
              "min_level": null,
              "needs_overworld_rain": false,
              "party_species": null,
              "party_type": null,
              "relative_physical_stats": null,
              "time_of_day": "",
              "trade_species": null,
              "trigger": {
                "name": "level-up",
                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
              },
              "turn_upside_down": false
            }
          ],
          "evolves_to": [],
          "is_baby": false,
          "species": {
            "name": "sylveon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/700/"
          }
        }
      ],
      "is_baby": false,
      "species": {
        "name": "eevee",
        "url": "https://pokeapi.co/api/v2/pokemon-species/133/"
      }
    },
    "id": 67
  }
  

 modifiedChain:TreeNode[]=[]
 

  rootNode = {
    text: {
      name: 'ROOT'
    },
    HTMLclass: 'angular',
    HTMLid: 'tree-root',
    id: 0,
    image: '/assets/images/Bug.jpg',
  };
  newEvolves_to: any[] = [];
  constructor() { }
   convertEvolutionChainToTreeNode(chain: evolutionChain): TreeNode[] {
    // Recursive function to process each evolution
    function processEvolution(evolution: child): TreeNode {
      const id = getIdFromUrl(evolution.species.url);
      const node: TreeNode = {
        label: capitalizeFirstLetter(evolution.species.name),
        data: evolution.species.name,
        expanded: true, // You can adjust this based on your needs
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
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
   this.convertEvolutionChainToTreeNode(this.chain);
  }
  
  
}
