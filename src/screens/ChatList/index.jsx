import React, { useEffect, useState, useCallback } from 'react'
import {
    SafeAreaView,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    RefreshControl
} from 'react-native'
import { dataChat } from './dummyData'
import { ChatCard } from '../../components'
import LottieView from 'lottie-react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_LIST } from '../../graphql/query'
import { customMargin } from '../../helper'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

export default ({ navigation }) => {
    const { token } = useSelector(state => state)
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false))
    }, [refreshing])

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout)
        })
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('this is a console log')
        })
    }, [])
    const EmptyList = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    margin: 24
                }}
            >
                <LottieView
                    source={require('../../../assets/empty.json')}
                    autoPlay
                    loop
                    style={{
                        backgroundColor: '#f0f0f0',
                        height: 160,
                        width: 160
                    }}
                />
                <Text style={{ fontWeight: '700' }}>No chat available yet</Text>
            </View>
        )
    }

    const { loading, error, data, refetch } = useQuery(GET_CHAT_LIST, {
        variables: {
            token
        }
    })

    if (loading) {
        return <EmptyList />
    } else if (error) {
        return <Text>{JSON.stringify(error)}</Text>
    }

    if (data.customerDashboard) {
        return (
            <SafeAreaView>
                <FlatList
                    ListEmptyComponent={() => <EmptyList />}
                    data={data.customerDashboard.payload.customer.links}
                    renderItem={({ item }) => (
                        <ChatCard
                            chat={item}
                            navigation={navigation}
                            refetch={refetch}
                            refresh={onRefresh}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: '#DDDDDD'
                            }}
                        />
                    )}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: customMargin.m5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        marginBottom: customMargin.m5
                    }}
                >
                    Failed get chatlist
                </Text>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: customMargin.m4,
                        paddingVertical: customMargin.m1,
                        borderRadius: 4,
                        backgroundColor: '#20776B'
                    }}
                    onPress={() => refetch()}
                >
                    <Text
                        style={{
                            color: '#FFF',
                            fontWeight: '700'
                        }}
                    >
                        Retry
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
