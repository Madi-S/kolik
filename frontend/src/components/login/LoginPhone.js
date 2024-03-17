import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    changePhone,
    phoneSubmitted,
    enableLoginButton,
    disableLoginButton,
    showAlert
} from '../../redux/actions'

import Content from './content/Content'
import { clearInputs } from '../../core/utils'
import { API_URL, PHONE_LENGTH } from '../../core/constants'

const LoginPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const phone = useSelector(state => state.login.phone)
    const buttonEnabled = useSelector(state => state.login.buttonEnabled)

    const onSubmit = async () => {
        const config = {
            url: API_URL + 'send-confirmation-code',
            method: 'get',
            params: { phone }
        }
        try {
            const { data } = await axios(config)
            console.log('Response', data)

            if (data.ok) {
                dispatch(phoneSubmitted())
                console.log('Redirecting to confirm')
                history.push('/confirm')
            } else {
                throw new Error('Falsy response status')
            }
        } catch (err) {
            dispatch(
                showAlert(
                    'warning',
                    `Bad response from the server, probably given phone is invalid or phone confirmation limit has been exceeded. ${JSON.stringify(
                        err,
                        null,
                        2
                    )}`
                )
            )
        }
        clearInputs()
        dispatch(disableLoginButton())
    }

    const onInput = event => {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+']

        const input = Array.from(event.target.value)
        event.target.value = input
            .filter(char => digits.includes(char))
            .join('')

        if (event.target.value.length === PHONE_LENGTH) {
            dispatch(enableLoginButton())
            dispatch(changePhone({ phone: event.target.value }))
        } else if (buttonEnabled) {
            dispatch(disableLoginButton())
        }
    }

    const onClick = event => {
        if (event.target.value.length < 3) {
            event.target.value = '+7'
        }
    }

    return (
        <Content
            submitText='Continue'
            inputText='Phone number'
            inputPlaceHolder='+7'
            onSubmit={onSubmit}
            inputHandlers={{
                onClick: onClick,
                onInput: onInput
            }}
        />
    )
}

export default LoginPage
