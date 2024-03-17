import { showAlert } from './actions'
import { LOGIN_PHONE_SUBMITTED } from './types'

const phonePattern = /(\+)[\d]{11}$/

export function validatePhoneInput({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === LOGIN_PHONE_SUBMITTED) {
                const phone = action.payload.phone
                if (phone.match(phonePattern)) {
                    return next(action)
                }
            }
            return dispatch(showAlert('Provided phone number is invalid'))
        }
    }
}
