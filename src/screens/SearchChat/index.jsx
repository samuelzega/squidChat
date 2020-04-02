import React, { useState } from 'react'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { ChatCard } from '../../components'
import { dataChat } from './const'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_LIST } from '../../graphql/query'
import { useSelector } from 'react-redux'
export default function SearchChat({ navigation }) {
    const { token, search } = useSelector(state => state)
    const [listChat, setListChat] = useState([])

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
        const allLinks = data.customerDashboard.payload.customer.links
        var showAllLink = allLinks.filter(function(link) {
            return link.seller_name === search
        })
        return (
            <SafeAreaView>
                {/* <Text>{search}</Text> */}
                <FlatList
                    data={showAllLink}
                    ListEmptyComponent={() => (
                        <Text> Yang kamu cari tidak dapat ditemukan </Text>
                    )}
                    renderItem={({ item }) => (
                        <ChatCard chat={item} navigation={navigation} />
                    )}
                    keyExtractor={item => item._id}
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
    }
}
