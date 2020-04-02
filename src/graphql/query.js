import gql from 'graphql-tag'

const GET_DASHBOARD = gql`
    query Dashboard($token: String!) {
        customerDashboard(token: $token) {
            message
            status
            payload {
                customer {
                    name
                    email
                    password
                    image_url
                    slug
                    links {
                        id
                        link
                        seller_name
                        customer_name
                        seller_slug
                        customer_slug
                        last_chat
                        read
                        created_at
                    }
                }
                sellers {
                    name
                    email
                    image_url
                    phone_number
                    slug
                    seller_category
                    links {
                        id
                        link
                        seller_name
                        customer_name
                        seller_slug
                        customer_slug
                        last_chat
                        read
                        created_at
                    }
                }
            }
        }
    }
`

const GET_CHAT_LIST = gql`
    query Dashboard($token: String!) {
        customerDashboard(token: $token) {
            message
            status
            payload {
                customer {
                    links {
                        id
                        link
                        seller_name
                        customer_name
                        seller_image_url
                        seller_slug
                        customer_slug
                        last_chat
                        read
                        created_at
                    }
                }
            }
        }
    }
`
const GET_PROFILE = gql`
    query Dashboard($token: String!) {
        customerDashboard(token: $token) {
            message
            status
            payload {
                customer {
                    name
                    email
                    password
                    image_url
                    slug
                }
            }
        }
    }
`

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        loginCustomer(email: $email, password: $password) {
            message
            status
            payload {
                token
            }
        }
    }
`

const REGISTER = gql`
    mutation register(
        $name: String!
        $email: String!
        $password: String!
        $image_url: String
    ) {
        registerCustomer(
            name: $name
            email: $email
            password: $password
            image_url: $image_url
        ) {
            message
            status
            payload {
                customer {
                    name
                    email
                    image_url
                    slug
                    links {
                        id
                        customer_name
                        seller_name
                        customer_slug
                        seller_slug
                        last_chat
                        read
                        created_at
                    }
                }
            }
        }
    }
`

const GET_ROOM_CHAT = gql`
    mutation getRoomChat($token: String, $link: String) {
        chatFindAll(token: $token, link: $link) {
            message
            status
            payload {
                chats {
                    id
                    link
                    seller_slug
                    customer_slug
                    chats {
                        text
                        role
                        created_at
                    }
                    created_at
                }
            }
        }
    }
`

const SEND_CHAT = gql`
    mutation sendChatCustomer($token: String!, $link: String!, $text: String) {
        sendChat(token: $token, link: $link, text: $text) {
            message
            status
            payload {
                chat {
                    id
                    link
                    seller_slug
                    customer_slug
                    chats {
                        text
                        role
                        created_at
                    }
                    created_at
                }
            }
        }
    }
`

const CREATE_LINK = gql`
    mutation($token: String!, $sellerSlug: String!) {
        customerCreateLink(token: $token, sellerSlug: $sellerSlug) {
            message
            status
            payload {
                link {
                    link
                }
            }
        }
    }
`

const DELETE_LINK = gql`
    mutation($token: String, $link_id: String) {
        deleteLinkCustomer(token: $token, link_id: $link_id) {
            message
            status
        }
    }
`

const UPDATE_READ_STATUS_SELLER = gql`
    mutation UpdateReadStatusSeller($token: String, $link: String) {
        updateReadStatusSeller(token: $token, link: $link) {
            message
            status
        }
    }
`

export {
    GET_CHAT_LIST,
    REGISTER,
    LOGIN,
    GET_DASHBOARD,
    GET_ROOM_CHAT,
    SEND_CHAT,
    CREATE_LINK,
    DELETE_LINK,
    GET_PROFILE
}
