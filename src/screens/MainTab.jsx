import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from './Dashboard'
import ChatList from './Chat'
import Profile from './Profile'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'

export default () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{
                activeTintColor: '#3e2723',
                inactiveTintColor: '#bdbdbd'
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={{
                                    fontWeight: focused ? '700' : 'normal',
                                    fontSize: 12,
                                    color: focused ? '#3e2723' : '#bdbdbd'
                                }}
                            >
                                Dashboard
                            </Text>
                        )
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-apps" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="ChatList"
                component={ChatList}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={{
                                    fontWeight: focused ? '700' : 'normal',
                                    fontSize: 12,
                                    color: focused ? '#3e2723' : '#bdbdbd'
                                }}
                            >
                                Chat
                            </Text>
                        )
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="md-chatbubbles"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={{
                                    fontWeight: focused ? '700' : 'normal',
                                    fontSize: 12,
                                    color: focused ? '#3e2723' : '#bdbdbd'
                                }}
                            >
                                Profile
                            </Text>
                        )
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-person" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
