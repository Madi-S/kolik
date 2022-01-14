export const BASE_URL = 'https://kolik-backend.herokuapp.com'

export const makeRestfulRequest = async ({
    body = null,
    route = '/',
    method = 'GET',
    headers = { 'content-type': 'application/json' },
    onError = err => console.warn(err),
    beforeRequest = () => {}
}) => {
    const url = BASE_URL + route
    const requestInit = { method, headers }
    if (body) {
        requestInit.body = body
    }
    try {
        beforeRequest()
        const res = await fetch(url, requestInit)
        return res
    } catch (err) {
        onError(err)
    }
}

export const makeGraphQLReqeust = () => {}
