import {UsePokemon} from "data/@types/PokemonInterface";

export const sharer: Sharer = {
    pokemon: undefined
}

interface Sharer {
    pokemon: UsePokemon | undefined
}