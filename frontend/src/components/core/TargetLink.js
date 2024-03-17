import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TargetLink = ({ text, url }) => {
    return (
        <Link className='link' to={url}>
            {text}
        </Link>
    )
}

TargetLink.defaultProps = {
    color: 'steelblue'
}

TargetLink.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default TargetLink
