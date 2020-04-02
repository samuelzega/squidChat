import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from './src/store/index'
import UserStack from './src/screens/UserStack'
import AuthStack from './src/screens/AuthStack'
import { createStackNavigator } from '@react-navigation/stack'

export default () => {
    const Stack = createStackNavigator()
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Auth">
                    {UserStack()}
                    {AuthStack()}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}