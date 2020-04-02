import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './constant'

export default function MessageSeller({ text }) {
    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <Text
                    style={{
                        fontSize: 15
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    )
}
