import { StyleSheet } from 'react-native'
import LayoutSize from '../../constants/Layout'

export const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        minHeight: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageWindow: {
        width: LayoutSize.window.width,
        paddingBottom: (LayoutSize.window.width * 14) / 100,
        marginTop: 20
    },
    chatInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row'
    },
    footerTab: {
        flex: 1,
        alignSelf: 'center'
    }
})

export const chatData = {
    _id: '1',
    seller: {
        name: 'someone',
        imageUrl:
            'https://cf.shopee.co.id/file/d3de9c89817933c553d00ceff14a2627'
    },
    message: [
        {
            text: `Halo Apa kabar`,
            time: '10.00',
            role: 'seller'
        },
        {
            text: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.`,
            time: '10.00',
            role: 'seller'
        },
        {
            text: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.`,
            time: '10.00',
            role: 'seller'
        },
        {
            text: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.`,
            time: '10.00',
            role: 'customer'
        },
        {
            text: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.`,
            time: '10.00',
            role: 'seller'
        },
        {
            text: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.`,
            time: '10.00',
            role: 'customer'
        }
    ]
}
