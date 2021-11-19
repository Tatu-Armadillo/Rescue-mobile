import axios from "axios";

const url = 'https://pokeapi.co/api/v2/';

export const ApiPokemons = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});
