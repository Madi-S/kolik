import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import './../../../styles/index/feed.css'

import { FEED_LENGTH } from './../../../core/constants'
import { getUser } from './../../../core/utils'

import SearchInput from './SearchInput'
import ContentCard from './ContentCard'
import Params from './Params'

const FeedPage = () => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(FEED_LENGTH)
    const [posts, setPosts] = useState([])

    const onSubmit = async event => {
        event.preventDefault()
        const payload = {}

        const elements = event.target.elements
        const searchInput = document.getElementById('query')

        for (let element of elements) {
            if (element.value) {
                payload[element.id] = element.value
            }
        }

        const { id, phone } = getUser()

        const userId = id
        const token = phone.token
        payload.end = end
        payload.start = start
        payload[searchInput.id] = searchInput.innerHTML
        console.log('Payload', payload)

        const config = {
            method: 'POST',
            data: payload,
            headers: { token, userId },
            url: 'http://127.0.0.1:8000/query-carpost'
        }
        const { data } = await axios(config)

        if (!data.length) {
            alert('Could not fetch any car post for given criteria')
        }

        setPosts(data)
        setStart(prev => prev + FEED_LENGTH)
        setEnd(prev => prev + FEED_LENGTH)
    }

    useEffect(async () => {
        const { id, phone } = getUser()
        const userId = id
        const token = phone.token
        const config = {
            method: 'POST',
            data: {
                start,
                end,
                order: 'title-desc'
            },
            headers: { token, userId },
            url: 'http://127.0.0.1:8000/query-carpost'
        }
        const { data } = await axios(config)
        setPosts(data)

    }, [])

    return (
        <div className='feed'>
            <form
                onSubmit={onSubmit}
                action='http://127.0.0.1:8000/test-form'
                method='POST'
            >
                <div className='feed__search'>
                    <SearchInput id='query' />
                    <Params />
                    <button type='submit' className='feed__search-submit'>
                        Search
                    </button>
                </div>
            </form>

            <div className='feed__content'>
                {posts.map((data, pos) => (
                    <ContentCard key={data.slug + pos} data={data} />
                ))}
            </div>
        </div>
    )
}

export default FeedPage
