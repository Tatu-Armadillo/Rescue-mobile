import React, { useState } from "react";
import { View, ScrollView, TextInput, Image } from "react-native";
import Button from "ui/components/inputs/Button/Button";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'ui/router/Router'
import { ApiPokemons } from "data/services/ApiPokemon";
import { UsePokemon } from "data/@types/PokemonInterface";
import {
    PageTitleContainer,
    PageSubTitleStyled,
    PageTitleStyled
} from '../ui/components/data-display/PageTitle/PageTitle.style'
import { sharer } from "data/services/utils";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;
interface IndexProps {
    navigation: NavigationProp;
};

const Index: React.FC<IndexProps> = ({ navigation }) => {

    const [erro, setErro] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const [imageFront, setImageFront] = useState('');
    const [imageBack, setImageBack] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [tipo, setTipo] = useState('');

    async function buscarPokemon(nome: string) {
        try {
            const { data } = await ApiPokemons.get('pokemon/' + nome);
            const pokemon: UsePokemon = data;
            setName(pokemon.name);
            setId(pokemon.id);
            setHeight(pokemon.height)
            setWeight(pokemon.weight)
            setImageFront(pokemon.sprites.front_default)
            setImageBack(pokemon.sprites.back_default)
            let tipos = '';
            pokemon.types.map((tipo, index) => {
                if (index != 0) {
                    tipos += ' | ';
                }
                tipos += tipo.type.name;
            });
            setTipo(tipos)

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

        } catch (error) {
            console.log(error);
            setErro("Item não listado")
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <PageTitleContainer>
                <PageTitleStyled>Digite o numero do pokemon</PageTitleStyled>
            </PageTitleContainer>

            <TextInput
                style={{ borderWidth: 1, padding: 10, height: 40, margin: 12 }}
                onChangeText={(pesquisa) => buscarPokemon(pesquisa)} />

            {id > 0 ?
                <View style={{ alignItems: "center", padding: 10 }}>
                    {imageFront ? <Image style={{ width: 400, height: 400 }} source={{ uri: `${imageFront}` }} /> : null}
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <View style={{ marginTop: 5 }}>
                            <PageTitleStyled>{name}</PageTitleStyled>
                            <PageSubTitleStyled>{tipo}</PageSubTitleStyled>
                        </View>
                        {/* {imageBack ? <Image style={{ width: 100, height: 100 }} source={{ uri: `${imageBack}` }} /> : null} */}
                    </View>
                    <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly" }}>
                        <View style={{ margin: 5 }}>
                            <PageSubTitleStyled>Nome: {name}</PageSubTitleStyled>
                            <PageSubTitleStyled>Peso: {weight}kg</PageSubTitleStyled>
                        </View>
                        <View style={{ margin: 5 }}>
                            <PageSubTitleStyled>Altura: {height}cm</PageSubTitleStyled>
                            <PageSubTitleStyled>Largura: 15cm</PageSubTitleStyled>
                        </View>
                    </View>
                    <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => navigation.navigate('Contratar')} >Contratar</Button>
                </View>
                :
                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                    <PageSubTitleStyled>Favor inserir valores corretos para a busca</PageSubTitleStyled>
                </View>
            }
        </ScrollView>
    )
};

export default Index;
