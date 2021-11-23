import { sharer } from "data/services/utils";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import Button from "ui/components/inputs/Button/Button";
import { PageSubTitleStyled, PageTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import { ButtonStyled } from "ui/components/inputs/Button/Button.style";

const Contato: React.FC = () => {
    return (
        <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <View>
                    <Avatar.Image source={{ uri: "https://avatars.githubusercontent.com/u/69278300?v=4" }} />
                </View>
                <View>
                    <Text>Nome do Dono: José</Text>
                    <Text>Nome do Pokemon: {sharer.pokemon?.name}</Text>
                    <Text>Contato: (00) 4002 8922</Text>
                    <Text>Qualidade do animal</Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <View style={{ marginBottom: 30, alignItems: "center" }}>
                    <PageTitleStyled>Horarios Disponiveis</PageTitleStyled>
                </View>
                <View style={{ alignItems: "center", padding: 10 }}>
                    <Text style={{ fontSize: 25 }}>08:00 as 10:00</Text>
                    <Button style={{ marginBottom: 25 }} mode={'contained'} onPress={() => console.log('Botão Pressionado')} >Agendar</Button>
                    <Text style={{ fontSize: 25 }}>16:00 as 18:00</Text>
                    <Button style={{ marginBottom: 25 }} mode={'contained'} onPress={() => console.log('Botão Pressionado')} >Agendar</Button>
                </View>
            </View>
        </ScrollView>
    );
}

export default Contato;
