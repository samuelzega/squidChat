import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from './AuthScreen'

export default () => {
    const Stack = createStackNavigator()
    return (
        <>
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{
                    headerShown: false
                }} />
        </>
    )
}