import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatList from './ChatList'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import LayoutSize from '../constants/Layout'
import { TextInput } from 'react-native-gesture-handler'
import { customMargin, screenWidth } from '../helper'

export default function Chat() {
    const Stack = createStackNavigator()
    const navigation = useNavigation()
    function LogoTitle() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: (LayoutSize.window.width * 93) / 100,
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    resizeMode="contain"
                    style={{ width: 140, height: 50 }}
                    source={require('../../assets/text_logo.png')}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SearchChat')
                    }}
                >
                    <Icon
                        name="search"
                        style={{
                            color: 'white'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChatList"
                options={{
                    headerTintColor: '#20776B',
                    headerStyle: {
                        backgroundColor: '#20776B'
                    },
                    headerTitle: props => <LogoTitle {...props} />
                }}
                component={ChatList}
            />
        </Stack.Navigator>
    )
}
