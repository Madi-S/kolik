import { TOKEN, USER_ID } from './auth'

export const BASE_URL = 'https://kolik-native-backend.herokuapp.com'

export const createPostRequest = async params => {
    try {
        const res = await fetch(`${BASE_URL}/post/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            },
            body: JSON.stringify(post)
        })

        const createdPost = JSON.parse(await res.text())
        return createdPost
    } catch (err) {
        console.error('Error when creating post:', err)
    }
}

export const queryPostsRequest = async params => {
    const body = JSON.stringify(params)
    const res = await fetch(`${BASE_URL}/post/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'auth-token': TOKEN
        },
        body
    })
    const posts = JSON.parse(await res.text())

    /* For some reason in JavaScript an empty list is a truthy value */
    if (posts.length === 0) {
        return false
    }
    return posts
}

export const getPostsQueryCountRequest = async params => {
    const body = JSON.stringify(params)
    const res = await fetch(`${BASE_URL}/post/query/count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'auth-token': TOKEN
        },
        body
    })
    const postsCount = JSON.parse(await res.text())
    return postsCount
}

export const uploadPostImageRequest = async (postId, imageUri) => {
    const filename = imageUri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('image', { uri: imageUri, name: filename, type })

    try {
        const res = await fetch(`${BASE_URL}/post/image/${postId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': TOKEN
            }
        })

        return res
    } catch (err) {
        console.log('Error when uploading post image:', err)
    }
}

export let feedbackAlreadySent = false

export const sendFeedbackRequest = async feedbackBody => {
    if (feedbackAlreadySent) {
        console.log('Feedback already sent')
        return
    }

    const body = JSON.stringify({ body: feedbackBody, userId: USER_ID })

    try {
        const res = await fetch(`${BASE_URL}/misc/feedback`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body
        })
        feedbackAlreadySent = true

        return res
    } catch (err) {
        console.log('Error when sending feedback:', err)
    }
}
