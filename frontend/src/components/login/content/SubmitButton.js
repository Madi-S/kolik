import { useSelector } from 'react-redux'

const SubmitButton = ({ text, onClick }) => {
    const buttonEnabled = useSelector(state => state.login.buttonEnabled)

    return (
        <button
            onClick={() => onClick()}
            disabled={!buttonEnabled}
            className='login__content-btn'
            id='login-btn'
        >
            {text}
        </button>
    )
}

export default SubmitButton
