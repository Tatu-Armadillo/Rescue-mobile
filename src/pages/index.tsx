import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Image } from "react-native";
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


type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;
interface IndexProps {
    navigation: NavigationProp;
};

const Index: React.FC<IndexProps> = () => {

    const [erro, setErro] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState(0);
    const [imageFront, setImageFront] = useState('');
    const [imageBack, setImageBack] = useState('');
    const [tipo, setTipo] = useState('');
    const [pokemonPesquisado, setPokemonPesquisado] = useState('');
    const [contratar, setContratar] = useState(false);

    async function buscarPokemon(nome: string) {
        try {
            const { data } = await ApiPokemons.get('pokemon/' + nome);
            const pokemon: UsePokemon = data;
            setName(pokemon.name);
            setId(pokemon.id);
            setImageFront(pokemon.sprites.front_default)
            setImageBack(pokemon.sprites.back_default)
            let tipos = '';
            pokemon.types.map((a, i) => {
                if (i != 0) {
                    tipos += ' | ';
                }
                tipos += a.type.name;
            });
            setTipo(tipos)
        } catch (error) {
            console.log(error);
            setErro("Item não listado")
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <PageTitleContainer>
                <PageTitleStyled>Digite o nome do pokemon</PageTitleStyled>
                <PageSubTitleStyled>Ou o seu definitivo numero</PageSubTitleStyled>
            </PageTitleContainer>
            <TextInput
                style={{ borderWidth: 1, padding: 10, height: 40, margin: 12 }}
                onChangeText={setPokemonPesquisado}
            />
            <Button mode={'contained'} onPress={() => buscarPokemon(pokemonPesquisado)}>Verificar Pokemon</Button>
            {id > 0 &&
                <View style={{ flex: 1, direction: 'row', alignItems: "center", padding: 10 }}>
                    {imageFront && <Image style={{ width: 100, height: 100 }} source={{ uri: `${imageFront}` }} />}
                    <PageTitleContainer>
                        <PageTitleStyled>{name}</PageTitleStyled>
                        <PageSubTitleStyled>{name}</PageSubTitleStyled>
                    </PageTitleContainer>
                    {imageBack && <Image style={{ width: 100, height: 100 }} source={{ uri: `${imageBack}` }} />}
                    <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => setContratar(true)}> Agendar encontro</Button>
                    {contratar && <Text> Pontos de Encontro: Ainda vai ser implementado </Text>}
                </View>
            }
        </ScrollView>
    )
};

export default Index;