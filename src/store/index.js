import { createStore } from 'redux'

const initial = {
    token: null,
    search: 'satulagi',
    listChat: []
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'SET_TOKEN': {
            return { ...state, token: action.payload.token }
        }

        case 'SET_LISTCHAT': {
            return { ...state, listChat: [...action.payload.listChat] }
        }

        case 'SET_SEARCH': {
            return { ...state, search: action.payload.search }
        }

        default: {
            return state
        }
    }
}
const store = createStore(reducer)

export { store }
