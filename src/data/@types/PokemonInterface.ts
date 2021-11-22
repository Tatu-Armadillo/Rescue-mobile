export interface UsePokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    base_experience: number,
    sprites: ImagePokemon,
    types: Tipo[]
}

interface ImagePokemon {
    back_default: string,
    front_default: string
}

interface Tipo {
    slot: number,
    type: {
        name: string,
        url: string
    }

}

