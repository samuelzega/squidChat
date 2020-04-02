import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from './constant'

export default function MessageSeller({ text }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri:
                            'https://i2.wp.com/d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2020/01/16161919/hacktiv8.png?fit=300%2C300&ssl=1'
                    }}
                />
            </View>
            <View style={styles.messageBox}>
                <Text style={styles.message}>{text}</Text>
            </View>
        </View>
    )
}
