import { StackNavigationProp } from "@react-navigation/stack";
import { UsePokemon } from "data/@types/PokemonInterface";
import { ApiPokemons } from "data/services/ApiPokemon";
import { sharer } from "data/services/utils";
import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { PageTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import { RootStackParamList } from "ui/router/Router";
import Button from 'ui/components/inputs/Button/Button';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface IndexProps {
    navigation: NavigationProp;
};

const Lista: React.FC = ({ }) => {

    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const [imageFront, setImageFront] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [tipo, setTipo] = useState('');

    const [pokedex, setPokedex] = useState(['']);

    async function buscarPokemon() {
        try {
            let pokeData = [];
            for (let index = 1; index <= 100; index++) {
                const { data } = await ApiPokemons.get('pokemon/' + index);
                const pokemon: UsePokemon = data;
                setName(pokemon.name);
                setId(pokemon.id);
                setHeight(pokemon.height)
                setWeight(pokemon.weight)
                setImageFront(pokemon.sprites.front_default)
                let tipos = '';
                pokemon.types.map((tipo, index) => {
                    if (index != 0) {
                        tipos += ' | ';
                    }
                    tipos += tipo.type.name;
                });
                pokeData.push(pokemon.name);
                setTipo(tipos)
            }
            setPokedex(pokeData)


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <PageTitleStyled> Animais Registrados </PageTitleStyled>
            <Button onPress={() => buscarPokemon()}>Listar Pokemons </Button>
            <View style={{padding: 20, flexDirection: "row"}} >
                <Avatar.Image source={{ uri: imageFront }} />
                <Text>{pokedex[1]}</Text>
            </View>
        </ScrollView>
    );
}


export default Lista;
