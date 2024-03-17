import PropTypes from 'prop-types'

const Button = ({ onClick, text, style }) => {
    return (
        <button onClick={onClick} className={`btn btn-${style}`} type='button'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    style: 'success'
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button
