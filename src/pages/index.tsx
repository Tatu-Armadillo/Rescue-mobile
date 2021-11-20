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
    const [encaminharMensagem, setEncaminharMensagem] = useState(false);

    async function buscarPokemon(nome: string) {
        try {
            const { data } = await ApiPokemons.get('pokemon/' + nome);
            const pokemon: UsePokemon = data;
            setName(pokemon.name);
            setId(pokemon.id);
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
                onChangeText={(pesquisa) => buscarPokemon(pesquisa)}    
            />

            {id > 0 ?
                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                        {imageFront ? <Image style={{ width: 400, height: 400 }} source={{ uri: `${imageFront}` }} /> : null}
                    <View style={{ flex: 1, flexDirection: "row", }}>
                        <View style={{ marginTop: 5 }}>
                            <PageTitleStyled>{name}</PageTitleStyled>
                            <PageSubTitleStyled>{tipo}</PageSubTitleStyled>
                        </View>
                        {/* {imageBack ? <Image style={{ width: 100, height: 100 }} source={{ uri: `${imageBack}` }} /> : null} */}
                    </View>
                    <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => setEncaminharMensagem(true)}>Encaminhar Mensagem</Button>
                </View>
                :
                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                    <PageSubTitleStyled>Favor inserir valores corretos para a busca</PageSubTitleStyled>
                </View>
            }
            {encaminharMensagem ?
                <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
                    <PageSubTitleStyled>Vai abri o Whatsapp da pessoa pra fazer solicitação</PageSubTitleStyled>
                </View>
                :
                <View />
            }
        </ScrollView>
    )
};

export default Index;