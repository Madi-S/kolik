import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='login__footer'>
            <Link to='#' className='login__footer-link'>
                Policy
            </Link>
            <Link to='#' className='login__footer-link'>
                GitHub
            </Link>
            <Link to='#' className='login__footer-link'>
                About us
            </Link>
        </div>
    )
}

export default Footer
