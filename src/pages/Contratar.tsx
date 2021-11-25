import React, { useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack";
import { sharer } from "data/services/utils";
import { ScrollView, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { PageTitleContainer, PageTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import { RootStackParamList } from "ui/router/Router";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;
interface IndexProps {
    navigation: NavigationProp;
};

const Contratar: React.FC<IndexProps> = ({ navigation }) => {

    return (
        <ScrollView>
            <PageTitleContainer>
                <PageTitleStyled>Informações Importantes</PageTitleStyled>
                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-evenly" }}>
                    <View>
                        <Text>id: {sharer.pokemon?.id}</Text>
                        <Text>Nome: {sharer.pokemon?.name}</Text>
                    </View>
                    <View>
                        <Text>Peso: {sharer.pokemon?.weight}</Text>
                        <Text>Altura: {sharer.pokemon?.height}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Avatar.Image source={{ uri: sharer.pokemon?.sprites.front_default }} />
                    <Avatar.Image source={{ uri: sharer.pokemon?.sprites.back_default }} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <Text>Contem {sharer.pokemon?.base_experience} inicialmente de experiencia</Text>
                    <Text>Localização: Rua das calapsitas, Varze Grande</Text>
                </View>
            </PageTitleContainer>
            <View style={{ padding: 5 }}>
                <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => navigation.navigate('Contato')} >Entrar em Contato</Button>
                <Button style={{ marginTop: 10 }} mode={'contained'} onPress={() => navigation.navigate('Index')} >Voltar</Button>
            </View>
        </ScrollView>
    );
}

export default Contratar;