export default ({ label, options, id }) => {
    return (
        <>
            <label className='select' htmlFor={id}>
                <select id={id} defaultValue={label}>
                    {options.map(i => (
                        <option key={i.value} value={i.value}>
                            {i.text}
                        </option>
                    ))}
                </select>
                <svg
                    dangerouslySetInnerHTML={{
                        __html: `<use xlink:href='#select-arrow-down'></use>`
                    }}
                />
            </label>
            <svg className='sprites'>
                <symbol id='select-arrow-down' viewBox='0 0 10 6'>
                    <polyline points='1 1 5 5 9 1'></polyline>
                </symbol>
            </svg>
        </>
    )
}
