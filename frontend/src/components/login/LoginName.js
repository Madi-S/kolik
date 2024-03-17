import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    userLogin,
    showAlert,
    changeName,
    enableLoginButton,
    disableLoginButton
} from '../../redux/actions'
import Content from './content/Content'
import { clearInputs, saveUser } from '../../core/utils'
import { getToken } from '../../core/security'
import { API_URL } from '../../core/constants'

const LoginName = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const name = useSelector(state => state.login.name)
    const phone = useSelector(state => state.login.phone)
    const buttonEnabled = useSelector(state => state.login.buttonEnabled)
    const phoneConfirmed = useSelector(state => state.login.phoneConfirmed)
    const phoneSubmitted = useSelector(state => state.login.phoneSubmitted)

    if (!phoneConfirmed || !phoneSubmitted) {
        history.push('/login')
    }

    const onInput = event => {
        if (event.target.value.length >= 3 && event.target.value.length <= 20) {
            dispatch(enableLoginButton())
            dispatch(changeName({ name: event.target.value }))
        } else if (buttonEnabled) {
            dispatch(disableLoginButton())
        }
    }

    const onSubmit = async () => {
        const config = {
            method: 'POST',
            url: API_URL + 'create-user',
            data: { token: getToken(), phone, name }
        }
        console.log('Config', config)
        try {
            const { data } = await axios(config)
            console.log('Response', data)

            saveUser(data)
            dispatch(userLogin())

            history.push('/welcome')
        } catch (err) {
            console.warn(err)
            dispatch(
                showAlert(
                    'warning',
                    'Server error, try again later ' + JSON.stringify(err)
                )
            )

            clearInputs()
            dispatch(disableLoginButton())
        }
    }

    const onClick = () => {}

    return (
        <Content
            submitText='Continue'
            inputText='How can others call you?'
            inputPlaceHolder='John Doe'
            onSubmit={onSubmit}
            inputHandlers={{
                onClick: onClick,
                onInput: onInput
            }}
        />
    )
}

export default LoginName
