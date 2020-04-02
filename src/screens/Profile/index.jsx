import React from 'react'
import { Image, View } from 'react-native'
import {
    Container,
    Content,
    Button,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch
} from 'native-base'
import Layout from '../../constants/Layout'
import { GET_PROFILE } from '../../graphql/query'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
export default function Profile() {
    const { token } = useSelector(state => state)
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

    const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
        variables: {
            token
        }
    })

    if (loading) {
        return <EmptyList />
    } else if (error) {
        return <Text>{JSON.stringify(error)}</Text>
    }
    console.log(data)

    return (
        <Container
            style={{
                backgroundColor: '#f0f0f0'
            }}
        >
            <Content
                style={{
                    maxHeight: (Layout.window.height * 40) / 100
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: (Layout.window.height * 40) / 100,
                        backgroundColor: '#3CB371',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        style={{
                            borderRadius: 100,
                            width: 100,
                            height: 100,
                            marginHorizontal: 8
                        }}
                        source={{
                            uri:
                                data.customerDashboard.payload.customer
                                    .image_url
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#f0f0f0'
                        }}
                    >
                        {' '}
                        {data.customerDashboard.payload.customer.name}
                    </Text>
                </View>
            </Content>
            <Content
                style={{
                    maxHeight: (Layout.window.height * 20) / 100,
                    marginVertical: 20,
                    backgroundColor: 'white'
                }}
            >
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: '#007AFF' }}>
                            <Icon active name="person" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>
                            {data.customerDashboard.payload.customer.name}
                        </Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: '#007AFF' }}>
                            <Icon active name="chatboxes" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>
                            {data.customerDashboard.payload.customer.email}
                        </Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: '#007AFF' }}>
                            <Icon active name="cog" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>
                            {data.customerDashboard.payload.customer.slug}
                        </Text>
                    </Body>
                </ListItem>
            </Content>
        </Container>
    )
}
