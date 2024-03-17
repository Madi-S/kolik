import NavCircle from './NavCircle'
import { useSelector } from 'react-redux'

const Nav = ({ cardsLength = 0 }) => {
    const currIndex = useSelector(state => state.welcome.currIndex)

    return (
        <div className='welcome__nav'>
            {new Array(cardsLength).fill(0, 0, cardsLength).map((_, index) => (
                <NavCircle
                    index={index}
                    key={index}
                    isActive={index === currIndex}
                />
            ))}
        </div>
    )
}

export default Nav
