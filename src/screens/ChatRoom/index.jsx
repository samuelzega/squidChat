import React, { useEffect, useState, useRef } from 'react'
import {
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    Text,
    View
} from 'react-native'
import { ChatInput, MessageCustomer, MessageSeller } from '../../components'
import { Container, Content, Footer, FooterTab } from 'native-base'
import { chatData, styles } from './constant'
import { GET_ROOM_CHAT } from '../../graphql/query'
import { useMutation } from '@apollo/react-hooks'
import LayoutSize from '../../constants/Layout'
import { useSelector } from 'react-redux'

export default function ChatRoom({ route: { params } }) {
    const { token } = useSelector(state => state)
    const [allChat, setAllChat] = useState([])
    const [getChat] = useMutation(GET_ROOM_CHAT)
    const io = require('socket.io-client')
    const socket = io('https://fe95c5e1.ngrok.io/', {
        transports: ['websocket']
    })
    const refContainer = useRef()
    console.log(params)

    useEffect(() => {
        async function sample() {
            const { data } = await getChat({
                variables: {
                    token,
                    link: params.link
                }
            })
            setAllChat(data.chatFindAll.payload.chats.chats)
        }
        sample()
    }, [params.link])

    if (!allChat) {
        return <Text>Lagi loading</Text>
    }
    useEffect(() => {
        socket.on(`reloadChat-${params.link}`, socketData => {
            // console.log(socketData.chats)
            setAllChat(allChat => {
                return allChat.concat(...socketData.chats)
            })
            // }
        })
    }, [])
    // setAllChat(data.chatFindAll.payload.chats.chats)
    // console.log(params.item)
    return (
        <Container>
            <Content>
                <ImageBackground
                    source={require('../../../assets/bg-chat.jpg')}
                    style={styles.imageBackground}
                >
                    <View
                        style={{
                            height: (LayoutSize.window.height * 81.5) / 100
                        }}
                    >
                        <ScrollView
                            style={{
                                // flex: 1,
                                // padding: 10,
                                marginTop: 10
                                // height: (LayoutSize.window.height * 81) / 100
                                // transform: [{ scaleY: -1 }]
                            }}
                            ref={refContainer}
                            onContentSizeChange={(width, height) => {
                                refContainer.current.scrollToEnd({
                                    animated: false
                                })
                            }}
                        >
                            {allChat.map((chat, index) => {
                                if (chat.role === 'customer') {
                                    return (
                                        <MessageCustomer
                                            text={chat.text}
                                            key={index}
                                        />
                                    )
                                } else {
                                    return (
                                        <MessageSeller
                                            text={chat.text}
                                            key={index}
                                        />
                                    )
                                }
                            })}
                        </ScrollView>
                    </View>
                </ImageBackground>
            </Content>
            <KeyboardAvoidingView
                behavior={'height'}
                style={{ flex: 0 }}
                keyboardVerticalOffset={-10}
                enabled
            >
                <Footer>
                    <FooterTab style={styles.footerTab}>
                        <ImageBackground
                            source={require('../../../assets/bg-chat.jpg')}
                            style={styles.imageBackground}
                        >
                            <ChatInput link={params.link} />
                        </ImageBackground>
                    </FooterTab>
                </Footer>
            </KeyboardAvoidingView>
        </Container>
    )
}
