import React, { useEffect, useReducer, useMemo } from 'react'
import { AsyncStorage, ActivityIndicator, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UserStack from './src/screens/UserStack'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './graphql'
import AuthScreen from './src/screens/AuthScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import { Provider, useDispatch } from 'react-redux'
import { store } from './src/store/index'
import { AuthContext } from './src/context'

function SplashScreen() {
    const dispatch = useDispatch()
    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken
            try {
                userToken = await AsyncStorage.getItem('token')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'SET_TOKEN', payload: { token: userToken } })
        }
        bootstrapAsync()
    })
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ActivityIndicator size="large" />
            <Text>Loading</Text>
        </View>
    )
}

const Stack = createStackNavigator()

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false
                    }
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token
                    }
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null
                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null
        }
    )

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken
            try {
                userToken = await AsyncStorage.getItem('token')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken })
        }
        bootstrapAsync()
    }, [])

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                AsyncStorage.setItem('token', data)
                dispatch({ type: 'SIGN_IN', token: data })
            },
            signOut: () => {
                AsyncStorage.removeItem('token')
                dispatch({ type: 'SIGN_OUT' })
            }
        }),
        []
    )

    console.disableYellowBox = true
    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider value={authContext}>
                <Provider store={store}>
                    <NavigationContainer>
                        <Stack.Navigator
                        // headerMode="float" animation="fade"
                        >
                            {state.isLoading ? (
                                // We haven't finished checking for the token yet
                                <Stack.Screen
                                    name="Splash"
                                    component={SplashScreen}
                                    options={{
                                        headerShown: false
                                    }}
                                />
                            ) : state.userToken == null ? (
                                // No token found, user isn't signed in
                                <>
                                    <Stack.Screen
                                        name="SignIn"
                                        component={AuthScreen}
                                        options={{
                                            headerShown: false,
                                            title: 'Sign in',
                                            // When logging out, a pop animation feels intuitive
                                            animationTypeForReplace: state.isSignout
                                                ? 'pop'
                                                : 'push'
                                        }}
                                    />
                                    <Stack.Screen
                                        name="Register"
                                        component={RegisterScreen}
                                        options={{
                                            headerShown: false,
                                            title: 'Register',
                                            // When logging out, a pop animation feels intuitive
                                            animationTypeForReplace: state.isSignout
                                                ? 'pop'
                                                : 'push'
                                        }}
                                    />
                                </>
                            ) : (
                                UserStack(state.userToken)
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
            </AuthContext.Provider>
        </ApolloProvider>
    )
}
