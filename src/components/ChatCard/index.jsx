import React from 'react'
import { Text, View, TouchableOpacity, Image, Button } from 'react-native'
import { styles } from './constant'
import { DELETE_LINK, GET_CHAT_LIST } from '../../graphql/query'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'

export default function(props) {
    let { chat, navigation, refetch, refresh } = props
    const { token } = useSelector(state => state)
    const [deleteLinkChat] = useMutation(DELETE_LINK, {
        refetchQueries: [{ query: GET_CHAT_LIST }],
        onCompleted: () => refetch()
    })

    const waktu = moment(chat.created_at).format('HH:mm')
    const renderLeftActions = () => {
        return (
            <Button
                title="DELETE"
                onPress={async () => {
                    // console.log('ini apa sih', token, 'pisah', chat.id)
                    // console.log('kesini masuk sih')
                    deleteLinkChat({
                        variables: {
                            token: token,
                            link_id: chat.id
                        }
                    })
                    refresh()
                    refetch()
                    alert('yey kedelete ya')
                }}
            ></Button>
        )
    }

    return (
        <Swipeable renderLeftActions={renderLeftActions}>
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    navigation.navigate('ChatRoom', {
                        seller_name: chat.seller_name,
                        image_url: chat.seller_image_url,
                        link: chat.link
                    })
                }}
            >
                <Image
                    style={styles.avatar}
                    source={{
                        uri: chat.seller_image_url
                    }}
                />
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{chat.seller_name}</Text>
                    {chat.last_chat ? (
                        <Text
                            ellipsizeMode="tail"
                            style={styles.message}
                            numberOfLines={2}
                        >
                            {chat.last_chat}
                        </Text>
                    ) : (
                        <Text ellipsizeMode="tail" style={styles.message}>
                            {' '}
                            No Message yet
                        </Text>
                    )}
                </View>
                <View style={styles.keterangan}>
                    <View style={styles.newMessage}>
                        <Text>N</Text>
                    </View>
                    <Text>{waktu}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}
