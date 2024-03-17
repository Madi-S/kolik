import PropTypes from 'prop-types'

const Input = ({ value, onInput, label, placeholder, type, isRequired }) => {
    return (
        <input
            type={type}
            value={value}
            onInput={onInput}
            required={isRequired}
            placeholder={placeholder}
            className='form-control'
        />
    )
}

Input.defaultProps = {
    type: 'text',
    isRequired: true,
    placeholder: '...'
}

Input.propTypes = {
    label: PropTypes.object,
    type: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onInput: PropTypes.function.isRequired,
    placeholder: PropTypes.string.isRequired,
    isRequired: PropTypes.boolean.isRequired
}

export default Input
