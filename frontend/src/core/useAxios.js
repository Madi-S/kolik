import axios from 'axios'
import { useEffect, useState } from 'react'

import { getToken } from './security'
import { API_URL } from './constants'

const useAxios = (endpoint, config, needsToken = true) => {
    config.url = API_URL + endpoint

    if (needsToken) {
        config.data.token = getToken()
    }

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        async function fetchAPI() {
            const abortCont = new AbortController()

            try {
                const { data } = await axios(config)
                setData(data)
                setError(null)
            } catch (e) {
                console.warn('Error:', e)
                setData(e)
                setError(true)
            }
            setIsPending(false)

            return () => abortCont.abort()
        }
        fetchAPI()
    }, [config])

    return { data, isPending, error }
}

export default useAxios

const usage = `
const {data, isPending, error} = useFetch(endpoint, config)

    const data = (
        <div className='home'>
            {error && <div className='content__error'>Error: {error}</div>}
            {isPending && <div className='content__loading'>Loading ...</div>}
            {blogs && <BlogList title='Top Blogs' blogs={blogs} />}
        </div>
    )
`
