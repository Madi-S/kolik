import { useDispatch, useSelector } from 'react-redux'

import './../../styles/alert.scss'
import { sleep } from './../../core/utils'
import { hideAlert } from './../../redux/actions'

const Alert = () => {
    const alertData = useSelector(state => state.app.alert) || {}
    const dispatch = useDispatch()

    const fadeout = async event => {
        event.preventDefault()
        const parent = event.target.closest('.alert')
        parent.style.opacity = '0'
        await sleep(0.5)
        dispatch(hideAlert())
    }

    const remove = event => event.target.remove()

    return (
        <div
            onTransitionEnd={remove}
            className={`alert ${alertData.category}-alert`}
        >
            <h3>{alertData.message}</h3>
            <a href='/' onClick={fadeout} className='close'>
                &times;
            </a>
        </div>
    )
}
// Alert types: simple, success, danger, warning

export default Alert
