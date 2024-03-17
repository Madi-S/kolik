import './../../styles/index/index.css'
import {
    historySrc,
    addSrc,
    feedSrc,
    promotionSrc,
    profileSrc
} from './iconSrcs'
import { useHistory } from 'react-router-dom'

const IndexNavbar = () => {
    const history = useHistory()

    return (
        <div className='index__navbar'>
            <img
                src={profileSrc}
                onClick={() => history.push('/index/profile')}
                className='index__navbar-icon'
            />
            <img
                src={historySrc}
                onClick={() => history.push('/index/history')}
                className='index__navbar-icon'
            />
            <img
                src={addSrc}
                onClick={() => history.push('/index/add')}
                className='index__navbar-icon icon-center'
            />
            <img src={promotionSrc} onClick={() => history.push('/index/promotion')}className='index__navbar-icon' />
            <img
                src={feedSrc}
                onClick={() => history.push('/index/feed')}
                className='index__navbar-icon'
            />
        </div>
    )
}

export default IndexNavbar
