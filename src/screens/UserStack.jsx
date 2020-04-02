import React, { useState } from 'react'
import { View, TextInput, Text, Image } from 'react-native'
import ChatRoom from './ChatRoom'
import { createStackNavigator } from '@react-navigation/stack'
import Products from './Products'
import MainTab from './MainTab'
import LayoutSize from '../constants/Layout'
import SearchChat from './SearchChat'
import { useDispatch } from 'react-redux'
export default () => {
    // const dispatch = useDispatch()
    const Stack = createStackNavigator()
    function LogoTitle() {
        const [search, setSearch] = useState('')
        const dispatch = useDispatch()
        const changeSearch = text => {
            setSearch(text)
            if (search.length > 1) {
                dispatch({ type: 'SET_SEARCH', payload: { search: search } })
            }
        }
        return (
            <View style={{}}>
                <TextInput
                    style={{
                        borderBottomColor: '#fff',
                        borderBottomWidth: 1,
                        width: (LayoutSize.window.width * 70) / 100,
                        color: '#fff',
                        fontSize: 15
                    }}
                    onChangeText={text => changeSearch(text)}
                    value={search}
                    placeholder="search here"
                    selectionColor="#fff"
                />
            </View>
        )
    }
    function LogoTitle2(props) {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    padding: 0
                }}
            >
                <Image
                    style={{
                        borderRadius: 40,
                        width: 40,
                        height: 40,
                        margin: 0,
                        padding: 0
                    }}
                    source={{
                        uri: props.params.image_url
                    }}
                />
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        marginLeft: 10
                    }}
                >
                    {props.params.seller_name}
                </Text>
            </View>
        )
    }
    return (
        <>
            <Stack.Screen
                name="Main"
                component={MainTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={({ route: { params } }) => ({
                    headerTintColor: '#ffffff',
                    headerStyle: {
                        backgroundColor: '#20776B'
                    },
                    headerTitle: props => (
                        <LogoTitle2 {...props} params={params} />
                    )
                })}
            />
            <Stack.Screen
                name="SearchChat"
                component={SearchChat}
                // screenOptions={{
                //     gestureDirection: 'horizontal',
                //     gestureEnabled: true
                // }}

                options={{
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#20776B'
                    },
                    headerTitle: props => <LogoTitle {...props} />,
                    headerTintColor: '#fff'
                }}
            />
            <Stack.Screen
                name="Products"
                component={Products}
                options={{
                    headerShown: true
                }}
                options={({ route: { params } }) => ({
                    headerTintColor: '#ffffff',
                    headerStyle: {
                        backgroundColor: '#20776B'
                    },
                    title: params.category
                })}
            />
        </>
    )
}
