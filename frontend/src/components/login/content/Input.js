const Input = ({ labelText, placeholder, handlers }) => {
    return (
        <>
            <label className='login__content-label' htmlFor='phone'>
                {labelText}
            </label>
            <input
                type='text'
                autoComplete='off'
                placeholder={placeholder}
                onClick={event => handlers.onClick(event)}
                onInput={event => handlers.onInput(event)}
                className='login__content-input'
            />
        </>
    )
}

export default Input
