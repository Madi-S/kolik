import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
    showAlert,
    phoneConfirmed,
    enableLoginButton,
    disableLoginButton,
    changeConfirmationCode
} from '../../redux/actions'

import Content from './content/Content'
import { setToken } from '../../core/security'
import { clearInputs, saveToken } from '../../core/utils'
import { API_URL, CODE_LENGTH } from '../../core/constants'

const LoginConfirm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const phone = useSelector(state => state.login.phone)
    const code = useSelector(state => state.login.confirmationCode)
    const buttonEnabled = useSelector(state => state.login.buttonEnabled)
    const phoneSubmitted = useSelector(state => state.login.phoneSubmitted)

    if (!phoneSubmitted) {
        history.push('/login')
    }

    const onSubmit = async () => {
        const config = {
            method: 'post',
            url: API_URL + 'validate-confirmation-code',
            data: { value: phone, code }
        }
        try {
            const { data } = await axios(config)
            console.log('Response', data)

            setToken(data.token)
            dispatch(phoneConfirmed())

            history.push('/name')
        } catch (err) {
            console.warn(err)
            dispatch(
                showAlert(
                    'warning',
                    'Provided code does not match, try again later'
                )
            )
        }
        clearInputs()
        dispatch(disableLoginButton())
    }

    const onInput = event => {
        if (event.target.value.length === CODE_LENGTH) {
            dispatch(enableLoginButton())
            dispatch(changeConfirmationCode({ code: event.target.value }))
        } else if (buttonEnabled) {
            dispatch(disableLoginButton())
        }
    }

    const onClick = () => {}

    return (
        <Content
            submitText='Confirm'
            inputText='Confirm your phone number'
            inputPlaceHolder='XXXX'
            onSubmit={onSubmit}
            inputHandlers={{
                onClick: onClick,
                onInput: onInput
            }}
        />
    )
}

export default LoginConfirm
