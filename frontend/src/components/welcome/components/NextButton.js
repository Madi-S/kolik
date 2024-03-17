const NextButton = ({ onClick, text = 'Next' }) => {
    return (
        <div className='welcome__next-btn-container'>
            <button
                onClick={onClick}
                id='next-btn'
                className='welcome__next-btn'
            >
                {text}
            </button>
        </div>
    )
}

export default NextButton
