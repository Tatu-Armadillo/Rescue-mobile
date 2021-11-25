import { StackNavigationProp } from "@react-navigation/stack";
import { UsePokemon } from "data/@types/PokemonInterface";
import { ApiPokemons } from "data/services/ApiPokemon";
import { sharer } from "data/services/utils";
import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { PageTitleStyled, PageSubTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import { RootStackParamList } from "ui/router/Router";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface IndexProps {
    navigation: NavigationProp;
};

const Lista: React.FC<IndexProps> = ({ navigation }) => {

    const [apresentarLista, setApresentarLista] = useState(false);
    const [pokedex, setPokedex] = useState([sharer.pokemon]);

    async function buscarPokemon() {
        try {
            let pokeData = [];
            for (let index = 1; index <= 9; index++) {
                const { data } = await ApiPokemons.get('pokemon/' + index);
                sharer.pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    base_experience: data.base_experience,
                    sprites:
                    {
                        back_default: data.sprites.back_default,
                        front_default: data.sprites.front_default
                    },
                    types: data.types
                }
                pokeData.push(sharer.pokemon)
                console.log();
            }
            setPokedex(pokeData)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <PageTitleStyled> Animais Registrados </PageTitleStyled>
            <Button style={{ margin: 20 }} mode="outlined"
                onPress={() => {
                    buscarPokemon()
                    setApresentarLista(true);
                }
                }>Listar Pokemons
            </Button>

            {apresentarLista && pokedex.length > 0 ?
                pokedex.map((pokemon, index) =>

                    <View key={index} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button style={{ flexDirection: "row" }}
                            onPress={() => {
                                navigation.navigate('Contratar');
                            }}>

                            <View style={{ flexDirection: "row" }}>
                                <Avatar.Image source={{ uri: pokemon?.sprites.front_default }} />
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ fontSize: 20, color: "#FFF" }}>{pokemon?.name}</Text>
                                    <Text style={{ fontSize: 20, color: "#FFF" }}>{pokemon?.id}</Text>
                                </View>
                                <Avatar.Image source={{ uri: pokemon?.sprites.back_default }} />
                            </View>
                        </Button>
                    </View>
                )
                :
                <View>
                    <PageSubTitleStyled>Pressione o botão para apresentar o catalogo de pokemons</PageSubTitleStyled>
                </View>
            }
        </ScrollView>
    );
}

export default Lista;