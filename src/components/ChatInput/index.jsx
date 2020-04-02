import React, { useState } from 'react'
import { Item, Input } from 'native-base'
import { View, TouchableOpacity } from 'react-native'
import LayoutSize from '../../constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './constant'
import { SEND_CHAT, GET_CHAT_LIST } from '../../graphql/query'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
export default function ChatInput({ link }) {
    console.log(link)
    const { token } = useSelector(state => state)
    const [newMsg, setNewMsg] = useState('')
    const [sendMessage] = useMutation(SEND_CHAT, {
        refetchQueries: [
            {
                query: GET_CHAT_LIST,
                variables: {
                    token
                }
            }
        ]
    })

    const sendNewMessage = () => {
        console.log({
            token,
            link,
            text: newMsg
        })
        sendMessage({
            variables: {
                token: token,
                link: link,
                text: newMsg
            }
        })
        setNewMsg('')
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 5
            }}
        >
            <Item
                rounded
                style={{
                    backgroundColor: 'white',
                    width: (LayoutSize.window.width * 86) / 100,
                    height: (LayoutSize.window.height * 5.5) / 100,
                    marginHorizontal: 5,
                    marginBottom: LayoutSize.window.height * 0.005
                }}
            >
                <Input
                    value={newMsg}
                    onChangeText={text => setNewMsg(text)}
                    placeholder="Input your chat"
                    numberOfLines={4}
                />
            </Item>
            <TouchableOpacity onPress={sendNewMessage}>
                <Ionicons
                    name="ios-send"
                    size={(LayoutSize.window.height * 5.5) / 100}
                    color="#708090"
                />
            </TouchableOpacity>
        </View>
    )
}
