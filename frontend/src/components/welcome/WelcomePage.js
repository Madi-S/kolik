import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles/welcome.css'
import Nav from './components/Nav'
import Card from './components/Card'
import NextButton from './components/NextButton'
import {
    welcomeSetCurrentCard,
    welcomeDoNotShowOnStart,
    welcomeIncrementCurrentIndex
} from '../../redux/actions'

const WelcomePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const currIndex = useSelector(state => state.welcome.currIndex)
    const userLoggedIn = useSelector(state => state.app.userLoggedIn)
    const showOnStart = useSelector(state => state.welcome.showOnStart)

    if (!showOnStart) {
        history.push('/index/feed')
    }

    const cards = [
        {
            text: `1 Some text here...
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, at officiis fuga rerum labore architecto ducimus iure consequuntur fugiat mollitia, dolorem cum veniam eaque dolorum! Corrupti blanditiis a animi consequatur placeat aliquid optio fugiat perferendis. Recusandae doloremque minus nam reiciendis?`,
            imgSrc: 'img/welcome1.png'
        },
        {
            text: `2 Some text here...
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, at officiis fuga rerum labore architecto ducimus iure consequuntur fugiat mollitia, dolorem cum veniam eaque dolorum! Corrupti blanditiis a animi consequatur placeat aliquid optio fugiat perferendis. Recusandae doloremque minus nam reiciendis?`,
            imgSrc: 'img/welcome2.png'
        },
        {
            text: `3 Some text here...
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, at officiis fuga rerum labore architecto ducimus iure consequuntur fugiat mollitia, dolorem cum veniam eaque dolorum! Corrupti blanditiis a animi consequatur placeat aliquid optio fugiat perferendis. Recusandae doloremque minus nam reiciendis?`,
            imgSrc: 'img/welcome3.png'
        },
        {
            text: `4 Some text here...
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, at officiis fuga rerum labore architecto ducimus iure consequuntur fugiat mollitia, dolorem cum veniam eaque dolorum! Corrupti blanditiis a animi consequatur placeat aliquid optio fugiat perferendis. Recusandae doloremque minus nam reiciendis?`,
            imgSrc: 'img/welcome4.png'
        }
    ]

    const handleClick = event => {
        let index = event.target.dataset.index
        if (index) {
            index = Number.parseInt(index, 10)
            dispatch(welcomeIncrementCurrentIndex(index))
            dispatch(welcomeSetCurrentCard(cards[index]))
        }
    }

    useEffect(() => {
        dispatch(welcomeSetCurrentCard(cards[currIndex]))
        
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

    const onBtnClick = () => {
        if (currIndex == (cards.length - 1)) {
            dispatch(welcomeDoNotShowOnStart())
            history.push('/index')
        } else {
            dispatch(welcomeIncrementCurrentIndex())
            dispatch(welcomeSetCurrentCard(cards[currIndex + 1]))
        }
    }

    return (
        <>
            {(userLoggedIn && (
                <div className='welcome'>
                    <Card />
                    <Nav cardsLength={cards.length} />
                    <NextButton onClick={onBtnClick} />
                </div>
            )) ||
                history.push('/login')}
        </>
    )
}

export default WelcomePage
