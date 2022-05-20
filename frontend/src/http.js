import { getToken, getUserId } from './auth'

const TOKEN = getToken()
const USER_ID = getUserId()

export const BASE_URL = 'https://kolik-native-backend.herokuapp.com'

let feedbackAlreadySent = false

export const getMyPostsRequest = async () => {
    try {
        const res = await fetch(`${BASE_URL}/post/by_user/${USER_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            }
        })

        const posts = JSON.parse(await res.text())
        return posts
    } catch (err) {
        console.error('Error when retrieving my posts:', err)
    }
}

export const deleteMyPostRequest = async postId => {
    const res = await fetch(`${BASE_URL}/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'auth-token': TOKEN
        }
    })

    const deleted_post = JSON.parse(await res.text())
    return deleted_post
}

export const activateMyPostRequest = async postId => {
    try {
        const res = await fetch(`${BASE_URL}/post/activate/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            }
        })

        const success = JSON.parse(await res.text())
        return success
    } catch (err) {
        console.error('Error when activating my post:', err)
    }
}

export const deactivateMyPostRequest = async postId => {
    try {
        const res = await fetch(`${BASE_URL}/post/deactivate/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            }
        })

        const success = JSON.parse(await res.text())
        return success
    } catch (err) {
        console.error('Error when deactivating my post:', err)
    }
}

export const editPostRequest = async (params, postId) => {
    const body = JSON.stringify({ ...params, userId: USER_ID })

    try {
        const res = await fetch(`${BASE_URL}/post/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            },
            body
        })

        const createdPost = JSON.parse(await res.text())
        return createdPost
    } catch (err) {
        console.error('Error when editing post:', err)
    }
}

export const createPostRequest = async params => {
    const body = JSON.stringify({ ...params, userId: USER_ID })

    try {
        const res = await fetch(`${BASE_URL}/post/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'auth-token': TOKEN
            },
            body
        })

        const createdPost = JSON.parse(await res.text())
        return createdPost
    } catch (err) {
        console.error('Error when creating post:', err)
    }
}

export const queryPostsRequest = async params => {
    const body = JSON.stringify(params)

    try {
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

        /* For some reasons in JavaScript an empty list is a truthy value */
        if (posts.length === 0) {
            return false
        }
        return posts
    } catch (err) {
        console.error('Error when querying posts:', err)
    }
}

export const getPostsQueryCountRequest = async params => {
    const body = JSON.stringify(params)

    try {
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
    } catch (err) {
        console.error('Error when retreiving posts query count:', err)
    }
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

        const uploadedImage = await res.text()
        return uploadedImage
    } catch (err) {
        console.error('Error when uploading post image:', err)
    }
}

export const sendFeedbackRequest = async feedbackBody => {
    if (feedbackAlreadySent) {
        console.warn('Feedback already sent')
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

        const createdFeedback = JSON.parse(await res.text())
        return createdFeedback
    } catch (err) {
        console.error('Error when sending feedback:', err)
    }
}

export const getPostImageRequest = postId => {
    return `${BASE_URL}/post/image/${postId}` + '?' + new Date()
}
