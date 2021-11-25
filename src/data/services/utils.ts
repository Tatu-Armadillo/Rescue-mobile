import { UsePokemon } from "data/@types/PokemonInterface";

export const sharer: Sharer = {
    pokemon: undefined
}

interface Sharer {
    pokemon: UsePokemon | undefined
}

export const Donos = {
    dono1: {
        nome: "Felipe",
        sobrenome: "Alves de Olviera",
        telefone: "5565992989119",
        email: "felipe.oliveira@gmail.com",
        imagem: "https://avatars.githubusercontent.com/u/69278300?v=4"
    },
    dono2: {
        nome: "Kayan",
        sobrenome: "Rosa Brandão",
        telefone: "5565993561544",
        email: "Kayan.Rosa@gmail.com",
        imagem: ""
    },
    dono3: {
        nome: "Ana",
        sobrenome: "Carolina de Alencar",
        telefone: "(65) 8871-4240",
        email: "Ana.Carolina@gmail.com",
        imagem: "https://avatars.githubusercontent.com/u/82791430?v=4"
    }
}
