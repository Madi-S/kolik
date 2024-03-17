const INPUT_LENGTH = 15

export default ({ id }) => {
    return (
        <div className='feed__search-input'>
            <div
                id={id}
                contentEditable={true}
                placeholder='Search ...'
                className='feed__search-value'
                onKeyDown={e => {
                    if (
                        e.target.textContent.length >= INPUT_LENGTH &&
                        e.keyCode != 8
                    ) {
                        e.preventDefault()
                    }
                }}
            ></div>
        </div>
    )
}
