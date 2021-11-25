import { Donos, sharer } from "data/services/utils";
import React from "react";
import { ScrollView, Text, View, Linking } from "react-native";
import { Avatar } from "react-native-paper";
import Button from "ui/components/inputs/Button/Button";
import { PageSubTitleStyled, PageTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";

const Contato: React.FC = () => {

    async function whatsApp(phone: string, texto: string) {
        try {
            Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}&text=${texto}`)
        } catch (error) {
            console.log(error);
        }
    }
    const horarioManha: string = `08:00 as 10:00`;
    const horarioTarde: string = `16:00 as 18:00`;
    let mensagem: string = `Mensagem encaminhada pelo aplicativo Rescue-Animal. Boa noite, estou encaminhando mensagem para solicitar o ${sharer.pokemon?.name} no periodo das `;

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10 }}>
                <View>
                    <Avatar.Image source={{ uri: Donos.dono1.imagem }} />
                </View>
                <View>
                    <Text>Nome do Dono: {Donos.dono1.nome}</Text>
                    <Text>Nome do Pokemon: {sharer.pokemon?.name}</Text>
                    <Text>Telefone: {Donos.dono1.telefone}</Text>
                    <Text>Email: {Donos.dono1.email}</Text>
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <View style={{ marginBottom: 30, alignItems: "center" }}>
                    <PageTitleStyled>Horarios Disponiveis</PageTitleStyled>
                </View>
                <View style={{ alignItems: "center", padding: 10 }}>
                    <Text style={{ fontSize: 25 }}>{horarioManha}</Text>
                    <Button style={{ marginBottom: 25 }} mode={'contained'} onPress={() => whatsApp(Donos.dono1.telefone, mensagem + horarioManha)}>Agendar</Button>

                    <Text style={{ fontSize: 25 }}>{horarioTarde}</Text>
                    <Button style={{ marginBottom: 25 }} mode={'contained'} onPress={() => whatsApp(Donos.dono2.telefone, mensagem + horarioTarde)}>Agendar</Button>
                </View>
            </View>
        </ScrollView>
    );
}

export default Contato;
