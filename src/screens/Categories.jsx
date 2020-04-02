import React, { useEffect } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    Image
} from 'react-native'
import LayoutSize from '../constants/Layout'
import { StyleSheet } from 'react-native'
import { screenWidth, customMargin } from '../helper'
import { useQuery } from '@apollo/react-hooks'
import { GET_DASHBOARD } from '../graphql/query'
import { useSelector } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

const images = [
    {
        name: 'Penjualan',
        image: require('../../assets/penjualan.png')
    },
    {
        name: 'Kesehatan',
        image: require('../../assets/kesehatan.png')
    },
    {
        name: 'Finansial',
        image: require('../../assets/keuangan.png')
    },
    {
        name: 'Perkantoran',
        image: require('../../assets/perkantoran.png')
    },
    {
        name: 'Otomotif',
        image: require('../../assets/otomotif.png')
    },
    {
        name: 'Lainnya',
        image: require('../../assets/lain_lain.png')
    }
]

const imgSlider = [
    {
        uri:
            'https://modeling-languages.com/wp-content/uploads/2019/03/blog-banner-ai-powered-chatbot-1.png'
    },
    require('../../assets/slider1.png'),
    require('../../assets/slider2.png')
]

export default ({ navigation: { navigate } }) => {
    const { token } = useSelector(state => state)
    const { error, loading, data, refetch, networkStatus } = useQuery(
        GET_DASHBOARD,
        {
            variables: { token },
            notifyOnNetworkStatusChange: true
        }
    )

    if (networkStatus === 4)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size="small" />
                <Text>Loading</Text>
            </View>
        )

    if (error) {
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
                    {error.message}
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

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size="small" />
                <Text>Loading</Text>
            </View>
        )
    }

    if (data.customerDashboard) {
        const customer = data.customerDashboard.payload.customer
        const sellers = data.customerDashboard.payload.sellers
        return (
            <View style={styles.container}>
                <Carousel
                    data={imgSlider}
                    renderItem={({ item, index }) => (
                        <ImageBackground
                            style={{
                                marginTop: customMargin.m5,
                                borderRadius: 12,
                                overflow: 'hidden',
                                backgroundColor: '#000',
                                justifyContent: 'flex-end',
                                height: (LayoutSize.window.width * 60) / 100,
                                width: screenWidth * 0.9,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 4,
                                elevation: 12
                            }}
                            resizeMode="stretch"
                            source={item}
                        >
                            {/* <Text
                                style={{
                                    paddingVertical: customMargin.m4,
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    color: '#FFF',
                                    paddingHorizontal: customMargin.m2,
                                    backgroundColor: 'rgba(0,0,0, .4)'
                                }}
                            >
                                {item}
                            </Text> */}
                        </ImageBackground>
                    )}
                    autoplay
                    loop
                    slideStyle={{
                        alignItems: 'center'
                    }}
                    layout={'tinder'}
                    layoutCardOffset={9}
                    inactiveSlideScale={0.5}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                />
                <View style={{ marginTop: -100 }}>
                    <FlatList
                        onRefresh={() => refetch()}
                        refreshing={loading}
                        contentContainerStyle={{
                            backgroundColor: '#FFF',
                            flex: 1,
                            borderTopEndRadius: 24,
                            borderTopStartRadius: 24,
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        ListHeaderComponent={() => (
                            <Text
                                style={{
                                    fontSize: 20,
                                    padding: 8,
                                    fontWeight: 'bold'
                                }}
                            >
                                Categories
                            </Text>
                        )}
                        data={images}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.list}
                                onPress={() =>
                                    navigate('Products', {
                                        sellers: sellers.filter(
                                            el =>
                                                el.seller_category === item.name
                                        ),
                                        category: item.name,
                                        customerSlug: customer.slug
                                    })
                                }
                            >
                                <ImageBackground
                                    resizeMode="stretch"
                                    style={{
                                        flex: 1
                                    }}
                                    source={item.image}
                                >
                                    <Text
                                        style={{
                                            marginHorizontal: 6,
                                            marginTop: 4,
                                            textAlign: 'center',
                                            fontWeight: '700'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.name}
                    />
                </View>
            </View>
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
                    Failed get dashboard
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20776B'
    },
    list: {
        margin: customMargin.m2,
        borderRadius: 6,
        height: (LayoutSize.window.height * 13) / 100,
        width: screenWidth * 0.25,
        marginVertical: 15
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
    }
})
