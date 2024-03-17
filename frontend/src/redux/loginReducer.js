import {
    LOGIN_CHANGE_CODE,
    LOGIN_CHANGE_NAME,
    LOGIN_CHANGE_PHONE,
    LOGIN_ENABLE_BUTTON,
    LOGIN_DISABLE_BUTTON,
    LOGIN_PHONE_SUBMITTED,
    LOGIN_PHONE_CONFIRMED,
} from './types'

const initialState = {
    data: {},
    name: '',
    phone: '',
    confirmationCode: '',
    buttonEnabled: false,
    phoneSubmitted: false,
    phoneConfirmed: false,
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ENABLE_BUTTON:
            return { ...state, buttonEnabled: true }

        case LOGIN_DISABLE_BUTTON:
            return { ...state, buttonEnabled: false }

        case LOGIN_PHONE_SUBMITTED:
            return { ...state, phoneSubmitted: true }

        case LOGIN_PHONE_CONFIRMED:
            return { ...state, phoneConfirmed: true }

        case LOGIN_CHANGE_PHONE:
            return { ...state, phone: action.payload.phone }

        case LOGIN_CHANGE_NAME:
            return { ...state, name: action.payload.name }

        case LOGIN_CHANGE_CODE:
            return { ...state, confirmationCode: action.payload.code }

        default:
            return state
    }
}
