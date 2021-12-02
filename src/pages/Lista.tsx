import { StackNavigationProp } from "@react-navigation/stack";
import { ApiPokemons } from "data/services/ApiPokemon";
import { sharer } from "data/services/utils";
import React, { useState } from "react"
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { PageTitleStyled, PageSubTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import { RootStackParamList } from "ui/router/Router";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface IndexProps {
    navigation: NavigationProp;
};

const Lista: React.FC<IndexProps> = ({ navigation }) => {

    const [apresentarLista, setApresentarLista] = useState(false);
    const [listPokemon, setListPokemon] = useState([sharer.pokemon]);

    async function buscarPokemon() {
        try {
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
                sharer.pokedex.push(sharer.pokemon)
            }
            setListPokemon(sharer.pokedex)
            console.log(sharer.pokedex);

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

            {apresentarLista && listPokemon.length > 0 ?
                listPokemon.map((pokemon, index) =>

                    <View key={index} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={{ flexDirection: "row" }}
                            onPress={() => {
                                navigation.navigate('Contratar');
                            }}>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                                <Avatar.Image source={{ uri: pokemon?.sprites.front_default }} />
                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, color: "#000" }}>{pokemon?.name}</Text>
                                    <Text style={{ fontSize: 20, color: "#000" }}>{pokemon?.id}</Text>
                                    <AirbnbRating defaultRating={5} isDisabled size={10} showRating={false} />
                                </View>
                                <Avatar.Image source={{ uri: pokemon?.sprites.front_default }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                :
                <View style={{ flex: 1, padding: 10 }}>
                    <PageSubTitleStyled>Pressione o botão para apresentar o catalogo de pokemons</PageSubTitleStyled>
                    <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => navigation.navigate('Index')}>Pesquisar por Nome</Button>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ marginTop: 10, width: 300, height: 300 }}
                            source={{ uri: `https://www.cocacolabrasil.com.br/content/dam/journey/br/pt/private/stories/2016/06/coca-cola-brasil-propaganda-antiga-natal-papai-noel-isto-faz-um-bem.rendition.445.560.jpg` }} />
                    </View>
                </View>


            }
        </ScrollView>
    );
}

export default Lista;
