export type evolutionChain={
    baby_trigger_item: any
    chain: {
      evolution_details: Array<any>
      evolves_to: Array<{
        evolution_details: Array<{
          gender: any
          held_item: any
          item: any
          known_move: any
          known_move_type: any
          location: any
          min_affection: any
          min_beauty: any
          min_happiness: any
          min_level: number
          needs_overworld_rain: boolean
          party_species: any
          party_type: any
          relative_physical_stats: any
          time_of_day: string
          trade_species: any
          trigger: {
            name: string
            url: string
          }
          turn_upside_down: boolean
        }>
        evolves_to: child[]
        is_baby: boolean
        species: {
          name: string
          url: string
        }
      }>
      is_baby: boolean
      species: {
        name: string
        url: string
      }
    }
    id: number
  }

  export type child ={
    evolution_details: Array<{
      gender: any
      held_item: any
      item: any
      known_move: any
      known_move_type: any
      location: any
      min_affection: any
      min_beauty: any
      min_happiness: any
      min_level: number
      needs_overworld_rain: boolean
      party_species: any
      party_type: any
      relative_physical_stats: any
      time_of_day: string
      trade_species: any
      trigger: {
        name: string
        url: string
      }
      turn_upside_down: boolean
    }>
    evolves_to: Array<any>
    is_baby: boolean
    species: {
      name: string
      url: string
    }
  }

  