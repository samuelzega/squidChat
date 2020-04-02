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
        flexDirection: 'row'
        // transform: [{ scaleY: -1 }]
    },
    imageBox: {
        flex: 1,
        maxWidth: 40,
        justifyContent: 'flex-end',
        marginLeft: 3
    },
    messageBox: {
        maxWidth: (LayoutSize.window.width * 70) / 100,
        backgroundColor: '#7ECDC9',
        borderRadius: 30,
        justifyContent: 'center',
        padding: 20,
        marginBottom: LayoutSize.window.height * 0.015
    },
    message: {
        fontSize: 15,
        letterSpacing: 0.2
    }
})
