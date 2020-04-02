import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChatList, ChatRoom } from '../screens'

export default function Chat() {
    const Stack = createStackNavigator()
    function LogoTitle() {
        return (
            <Image
                resizeMode="contain"
                style={{ width: 140, height: 50 }}
                source={require('../../assets/icon.png')}
            />
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChatList"
                option={{
                    headerTintColor: '#ffffff',
                    headerStyle: {
                        backgroundColor: '#000000'
                    },
                    headerTitle: props => <LogoTitle {...props} />
                }}
                component={ChatList}
            />
            <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                tabBarVisible={false}
            />
        </Stack.Navigator>
    )
}
