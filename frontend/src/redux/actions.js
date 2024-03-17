import * as types from './types'
import { sleep } from '../core/utils'

const ALERT_TIMEOUT_SEC = 7

export function enableLoginButton() {
    return {
        type: types.LOGIN_ENABLE_BUTTON
    }
}

export function disableLoginButton() {
    return {
        type: types.LOGIN_DISABLE_BUTTON
    }
}

export function changePhone({ phone }) {
    return {
        type: types.LOGIN_CHANGE_PHONE,
        payload: { phone }
    }
}

export function changeName({ name }) {
    return {
        type: types.LOGIN_CHANGE_NAME,
        payload: { name }
    }
}

export function phoneSubmitted() {
    return {
        type: types.LOGIN_PHONE_SUBMITTED
    }
}

export function phoneConfirmed() {
    return {
        type: types.LOGIN_PHONE_CONFIRMED
    }
}

export function changeConfirmationCode({ code }) {
    return {
        type: types.LOGIN_CHANGE_CODE,
        payload: { code }
    }
}


export function showAlert(category, message) {
    // return async dispatch => {
    //     dispatch({
    //         type: types.APP_SHOW_ALERT,
    //         payload: { message, category }
    //     })
    //     await sleep(ALERT_TIMEOUT_SEC)
    //     dispatch(hideAlert())
    // }
    return {
        type: types.APP_SHOW_ALERT,
        payload: { message, category }
    }
}

export function hideAlert() {
    return {
        type: types.APP_HIDE_ALERT
    }
}

export function userLogin() {
    return {
        type: types.APP_USER_LOGGED_IN
    }
}

export function userLogout() {
    return {
        type: types.APP_USER_LOGGED_OUT
    }
}

export function welcomeSetCurrentCard(card) {
    return {
        type: types.WLC_SET_CURRENT_CARD,
        card
    }
}

export function welcomeIncrementCurrentIndex(index = '') {
    const action = {
        type: types.WLC_INCR_CURRENT_INDEX
    }
    if (typeof index === 'number') {
        action.index = index
    }
    return action
}

export function welcomeDoNotShowOnStart() {
    return {
        type: types.WLC_DISABLE_SHOW_ON_START
    }
}

export function welcomeShowOnStart() {
    return {
        type: types.WLC_ENABLE_SHOW_ON_START
    }
}
