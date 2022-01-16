import React from 'react'

import PostForm from '../components/PostForm'

const CreateScreen = ({ navigation }) => {
    const createPost = async (post, imageUri) => {
        const createdPost = await createPostRequest(post)
        console.log('Created post: ', createdPost)

        const res = await uploadPostImageRequest(
            parseInt(createdPost.id),
            imageUri
        )
        const text = await res.text()
        console.log('Upload post image response: ', text)

        navigation.navigate('Posts')
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
    const filename = imageUri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('image', { uri: imageUri, name: filename, type })

    const res = await fetch(`https://kolik-backend.herokuapp.com/post/image/${postId}`, {
        method: 'PUT',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return res
}

export default CreateScreen
