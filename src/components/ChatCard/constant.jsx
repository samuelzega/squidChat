import { StyleSheet } from 'react-native'
import LayoutSize from '../../constants/Layout'
import Layout from '../../constants/Layout'
// warnanya d row ya
export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#F2F2F2'
    },
    avatar: {
        borderRadius: 60,
        width: 60,
        height: 60,
        marginHorizontal: 8
    },
    rowText: {
        flex: 1,
        marginStart: 8
    },
    message: {
        fontSize: 14,
        color: 'grey',
        maxWidth: (Layout.window.width * 50) / 100
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 15,
        fontSize: 20,
        color: '#424242',
        maxWidth: (Layout.window.width * 50) / 100
    },
    keterangan: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    newMessage: {
        backgroundColor: '#3CB371',
        width: 20,
        height: 20,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 4
    }
})
