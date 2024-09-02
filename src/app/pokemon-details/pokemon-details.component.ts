import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonInfo } from '../models/pokemonAPIModels';
import { child, evolutionChain } from '../models/evoltionChain';
declare var Treant: any;

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  @Input() chain: evolutionChain = {
    baby_trigger_item: null,
    chain: {
      evolution_details: [],
      evolves_to: [
        {
          evolution_details: [
            {
              gender: null,
              held_item: null,
              item: null,
              known_move: null,
              known_move_type: null,
              location: null,
              min_affection: null,
              min_beauty: null,
              min_happiness: null,
              min_level: 21,
              needs_overworld_rain: false,
              party_species: null,
              party_type: null,
              relative_physical_stats: null,
              time_of_day: '',
              trade_species: null,
              trigger: {
                name: 'level-up',
                url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
              },
              turn_upside_down: false,
            },
          ],
          evolves_to: [
            {
              evolution_details: [
                {
                  gender: null,
                  held_item: null,
                  item: {
                    name: 'leaf-stone',
                    url: 'https://pokeapi.co/api/v2/item/85/',
                  },
                  known_move: null,
                  known_move_type: null,
                  location: null,
                  min_affection: null,
                  min_beauty: null,
                  min_happiness: null,
                  min_level: 0,
                  needs_overworld_rain: false,
                  party_species: null,
                  party_type: null,
                  relative_physical_stats: null,
                  time_of_day: '',
                  trade_species: null,
                  trigger: {
                    name: 'use-item',
                    url: 'https://pokeapi.co/api/v2/evolution-trigger/3/',
                  },
                  turn_upside_down: false,
                },
              ],
              evolves_to: [],
              is_baby: false,
              species: {
                name: 'vileplume',
                url: 'https://pokeapi.co/api/v2/pokemon-species/45/',
              },
            },
            {
              evolution_details: [
                {
                  gender: null,
                  held_item: null,
                  item: {
                    name: 'sun-stone',
                    url: 'https://pokeapi.co/api/v2/item/80/',
                  },
                  known_move: null,
                  known_move_type: null,
                  location: null,
                  min_affection: null,
                  min_beauty: null,
                  min_happiness: null,
                  min_level: 0,
                  needs_overworld_rain: false,
                  party_species: null,
                  party_type: null,
                  relative_physical_stats: null,
                  time_of_day: '',
                  trade_species: null,
                  trigger: {
                    name: 'use-item',
                    url: 'https://pokeapi.co/api/v2/evolution-trigger/3/',
                  },
                  turn_upside_down: false,
                },
              ],
              evolves_to: [],
              is_baby: false,
              species: {
                name: 'bellossom',
                url: 'https://pokeapi.co/api/v2/pokemon-species/182/',
              },
            },
          ],
          is_baby: false,
          species: {
            name: 'gloom',
            url: 'https://pokeapi.co/api/v2/pokemon-species/44/',
          },
        },
      ],
      is_baby: false,
      species: {
        name: 'oddish',
        url: 'https://pokeapi.co/api/v2/pokemon-species/43/',
      },
    },
    id: 18,
  };
  private chart_config = {
    chart: {
      container: "#collapsable-example",

      animateOnInit: true,

      node: {
        collapsable: true
      },
      animation: {
        nodeAnimation: "easeOutBounce",
        nodeSpeed: 700,
        connectorsAnimation: "bounce",
        connectorsSpeed: 700
      }
    },
    nodeStructure: {
      image: "/assets/images/Bug.jpg",
      children: [
        {
          image: "/assets/images/Bug.jpg",
          collapsed: true,
          children: [
            {
              image: "/assets/images/Bug.jpg"
            }
          ]
        },
        {
          image: "/assets/images/Bug.jpg",
          childrenDropLevel: 1,
          children: [
            {
              image: "/assets/images/Bug.jpg"
            }
          ]
        },
        {
          pseudo: true,
          children: [
            {
              image: "/assets/images/Bug.jpg"
            },
            {
              image: "/assets/images/Bug.jpg"
            }
          ]
        }
      ]
    }
  };
  newEvolves_to: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: PokemonInfo) { }

  convertToCollapsibleChartFormat(evolutionChain: evolutionChain) {
    function createNode(pokemon: child) {
      type nodeType = {
        id: string | undefined;
        image: string;
        children: nodeType[];
      };
      // Extract the ID from the species URL
      const speciesUrl = pokemon.species.url;
      const speciesId = speciesUrl.split('/').filter(Boolean).pop();

      let node: nodeType = {
        id: speciesId,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.gif`, // Placeholder for Pokémon image
        children: [],
      };

      pokemon.evolves_to.forEach((child: child) => {
        node.children.push(createNode(child));
      });

      return node;
    }

    const chartFormat = {
      chart: {
        container: '#evoTree',
        animateOnInit: false,
        node: {
          collapsable: true,
        },
        animation: {
          nodeAnimation: 'easeOutBounce',
          nodeSpeed: 700,
          connectorsAnimation: 'bounce',
          connectorsSpeed: 700,
        },
      },
      nodeStructure: createNode(evolutionChain.chain),
    };
    console.log(chartFormat);
    return chartFormat;
  }

  ngOnInit() {
    console.log(this.data);
  }
  ngAfterViewInit() {
    this.checkLibraries()
    let chartData = this.convertToCollapsibleChartFormat(this.chain);

  }
  checkLibraries() {

    if (typeof Treant === 'undefined') console.log("Treant.js has not loaded.");
  }
  genrateTree() {
    new Treant(this.chart_config);
  }
}
