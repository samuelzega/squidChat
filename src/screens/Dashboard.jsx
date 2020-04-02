import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Categories from './Categories'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { customMargin } from '../helper'
import { AuthContext } from '../context'
import { Image, Alert } from 'react-native'

export default () => {
    const Stack = createStackNavigator()
    const { signOut } = React.useContext(AuthContext);
    function LogoTitle() {
        return (
            <Image
                resizeMode="contain"
                style={{ width: 140, height: 50 }}
                source={require('../../assets/text_logo.png')}
            />
        );
    }

    function handleLogout() {
        Alert
            .alert(
                'Confirmation',
                'Are you sure want to logout ?',
                [
                    { text: 'OK', onPress() { signOut() }, style: 'destructive' },
                    { text: 'Cancel', style: 'cancel' },
                ]
            )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginHorizontal: customMargin.m2 }}
                            onPress={() => handleLogout()}>
                            <Ionicons
                                name="md-exit"
                                size={24}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    ),

                    headerTintColor: "#ffffff",
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#20776B'
                    },
                    headerTitle: props => <LogoTitle {...props} />
                }}
                component={Categories} />
        </Stack.Navigator>
    )
}