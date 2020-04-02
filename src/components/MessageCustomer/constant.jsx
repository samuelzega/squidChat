import { StyleSheet } from 'react-native'
import LayoutSize from '../../constants/Layout'

export const styles = StyleSheet.create({
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row-reverse'
        // transform: [{ scaleY: -1 }]
    },
    textBox: {
        maxWidth: (LayoutSize.window.width * 70) / 100,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        padding: 15,
        marginBottom: LayoutSize.window.height * 0.015,
        marginRight: LayoutSize.window.width * 0.03
    }
})
