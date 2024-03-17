export default ({ data }) => {
    return (
        <div className='feed__content-card'>
            <div className='feed__content-card-img'>
                <img
                    src='https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
                    alt={data.title}
                />
            </div>
            <div className='feed__content-card-info'>
                <div className='feed__content-card-info-title'>
                    <p>{data.title}</p>
                </div>
                <div className='feed__content-card-info-price'>
                    <p>{data.pricePerDay} KZT</p>
                </div>
            </div>
        </div>
    )
}
