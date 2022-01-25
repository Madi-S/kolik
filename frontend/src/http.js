import { TOKEN } from './auth'

export const BASE_URL = 'https://kolik-backend.herokuapp.com'

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

export const createPostRequest = async post => {
    try {
        const res = await fetch('https://kolik-backend.herokuapp.com/post/', {
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
