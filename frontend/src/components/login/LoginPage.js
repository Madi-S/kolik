import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

import '../../styles/login.css'
import Header from './header/Header'
import Footer from './footer/Footer'

import LoginConfirm from './LoginConfirm'
import LoginPhone from './LoginPhone'
import LoginName from './LoginName'

const LoginPage = () => {
    const history = useHistory()

    const userLoggedIn = useSelector(state => state.app.userLoggedIn)
    const buttonEnabled = useSelector(state => state.login.buttonEnabled)

    if (userLoggedIn) {
        history.push('/welcome')
    }

    const handleKeyDown = event => {
        if (buttonEnabled && event.key === 'Enter') {
            document.getElementById('login-btn').click()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    return (
        <div className='login'>
            <Header />

            <Route exact path='/login'>
                <LoginPhone />
            </Route>

            <Route exact path='/confirm'>
                <LoginConfirm />
            </Route>

            <Route exact path='/name'>
                <LoginName />
            </Route>

            <Footer />
        </div>
    )
}

export default LoginPage
