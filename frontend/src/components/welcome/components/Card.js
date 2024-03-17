import { useSelector } from 'react-redux'

const Card = () => {
    const currCard = useSelector(state => state.welcome.currCard)
    const { text, imgSrc } = currCard

    return (
        <div className='welcome__card'>
            <div className='welcome__card-img'>
                <img src={imgSrc} />
            </div>
            <div className='welcome__card-info'>{text}</div>
        </div>
    )
}

export default Card
