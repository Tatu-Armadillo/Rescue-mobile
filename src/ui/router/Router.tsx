import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationTheme } from 'ui/themes/app-theme'
import Index from "pages";
import { PageTitleStyled } from "ui/components/data-display/PageTitle/PageTitle.style";
import Contratar from "pages/Contratar"

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Index: undefined;
    Contratar: {id: number, name: string};
}

const Router: React.FC = () => {
    return (
        <NavigationContainer theme={NavigationTheme}>
            <Stack.Navigator>
                <Stack.Screen name={'Index'}
                    component={Index}
                    options={
                        {
                            headerTitleAlign: 'center',
                            headerTitle: () => (<PageTitleStyled>Rescue Pokemon</PageTitleStyled>)
                        }}
                />
                <Stack.Screen name={'Contratar'} component={Contratar} options={{ title: 'Contratar' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Router;
