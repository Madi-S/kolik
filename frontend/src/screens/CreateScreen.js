import React from 'react'

import PostForm from '../components/PostForm'
import { createPostRequest, uploadPostImageRequest } from '../http'

const CreateScreen = ({ navigation }) => {
    const createPost = async (post, imageUri) => {
        const createdPost = await createPostRequest(post)
        console.log('Created post:', createdPost)

        const res = await uploadPostImageRequest(
            parseInt(createdPost.id),
            imageUri
        )
        const text = await res.text()
        console.log('Upload post image response:', text)

        navigation.navigate('Posts')
    }

    return <PostForm label='Create a new Post' onSubmit={createPost} />
}

export default CreateScreen
