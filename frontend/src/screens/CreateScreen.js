import React from 'react'

import PostForm from '../components/PostForm'

const CreateScreen = ({ navigation }) => {
    const createPost = async (post, imageUri) => {
        console.log('Post:', post)
        console.log('Image uri:', imageUri)

        const createdPost = await createPostRequest(post)
        console.log('Created post: ', createdPost)

        const res = await uploadPostImageRequest(
            parseInt(createdPost.id),
            imageUri
        )
        console.log('Upload post image response: ', res)

        // navigation.navigate('Posts')
    }

    return <PostForm label='Create a new Post' onSubmit={createPost} />
}

const createPostRequest = async post => {
    try {
        const res = await fetch('https://kolik-backend.herokuapp.com/post/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(post)
        })

        const createdPost = JSON.parse(await res.text())
        return createdPost
    } catch (err) {
        console.error(err)
    }
}

const uploadPostImageRequest = async (postId, imageUri) => {
    const localUri = imageUri
    const filename = localUri.split('/').pop()

    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('image', { uri: localUri, name: filename, type })

    const res = await fetch('https://kolik-backend.herokuapp.com/post/image', {
        method: 'PUT',
        body: formData,
        headers: {
            'post-id': postId,
            'content-type': 'multipart/form-data'
        }
    })
    return res
}

export default CreateScreen
