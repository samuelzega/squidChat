import React, { useRef, useState, useEffect } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ToastAndroid
} from 'react-native'
import { screenWidth, customMargin } from '../helper'
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_LINK, GET_CHAT_LIST } from '../graphql/query'
import { useSelector } from 'react-redux'

function Products({ route: { params }, navigation }) {
    const [search, setSearch] = useState('')
    const [seller, setSeller] = useState(null)
    const { token } = useSelector(state => state)
    const { customerSlug, sellers, category } = params

    const [createLink, { loading }] = useMutation(CREATE_LINK, {
        onCompleted({ customerCreateLink }) {
            // console.log(
            //     seller.links.filter(el => el.customer_slug === customerSlug)[0]
            //         .link,
            //     '==========================================================='
            // )
            // if (customerCreateLink) {
            navigation.navigate('ChatRoom', {
                seller_name: seller.name,
                image_url: seller.image_url,
                link: customerCreateLink
                    ? customerCreateLink.payload.link.link
                    : seller?.links.filter(
                          el => el.customer_slug === customerSlug
                      )[0].link
            })
            // } else {
            //     ToastAndroid.show('Chat already exist', 3000)
            // }
            setSeller(null)
        },
        onError(error) {
            console.log(error)
        },
        refetchQueries: [
            {
                query: GET_CHAT_LIST,
                variables: {
                    token
                }
            }
        ]
    })

    useEffect(() => {
        ;``
        if (seller) {
            console.log(seller)
            const variables = {
                token,
                sellerSlug: seller.slug
            }
            createLink({ variables })
        }
    }, [seller])

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholderTextColor="#bcaaa4"
                    style={styles.search}
                    placeholder={`Search in ${category}`}
                    value={search}
                    keyboardType="default"
                    onChangeText={text => setSearch(text)}
                />
            </View>
            <FlatList
                data={
                    search
                        ? sellers.filter(el =>
                              el.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                          )
                        : sellers
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 1,
                            marginHorizontal: customMargin.m3,
                            marginVertical: 4,
                            borderRadius: 8,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.imageThumbnail}
                            source={{ uri: item.image_url }}
                        />
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 8
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: '700',
                                    fontSize: 16
                                }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={3}
                                style={{
                                    flexShrink: 1,
                                    marginTop: 8
                                }}
                            >
                                {item.phone_number}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setSeller(item)}
                                // onPress={() => createChatLink(item)}
                                style={styles.btnChat}
                            >
                                <Ionicons
                                    name="md-chatbubbles"
                                    size={24}
                                    style={{
                                        marginRight: customMargin.m2
                                    }}
                                />
                                <Text style={styles.btnText}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1.5,
                            flex: 1,
                            marginHorizontal: 12,
                            marginVertical: 4,
                            backgroundColor: '#CED0CE'
                        }}
                    />
                )}
                keyExtractor={item => item.name}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            margin: 24
                        }}
                    >
                        <LottieView
                            source={require('../../assets/empty.json')}
                            autoPlay
                            loop
                            style={styles.empty}
                        />
                        <Text style={{ fontWeight: '700' }}>
                            No seller available yet
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: customMargin.m1,
        flex: 1
    },
    listHeader: {
        height: 56,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 8
    },
    headerText: {
        fontWeight: 'bold',
        color: '#3e2723',
        fontSize: 20
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height: screenWidth * 0.225,
        width: screenWidth * 0.225
    },
    search: {
        height: screenWidth * 0.12,
        backgroundColor: '#DDDDDD',
        marginHorizontal: customMargin.m3,
        marginVertical: customMargin.m1,
        paddingHorizontal: customMargin.m5,
        borderRadius: customMargin.m2
    },
    empty: {
        backgroundColor: '#f0f0f0',
        height: 160,
        width: 160
    },
    btnChat: {
        marginTop: customMargin.m5,
        borderRadius: 4,
        paddingHorizontal: customMargin.m5,
        paddingVertical: customMargin.m1,
        backgroundColor: '#DDDDDD',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    btnText: {
        textTransform: 'uppercase',
        fontWeight: '700',
        textAlignVertical: 'center'
    }
})

export default Products
