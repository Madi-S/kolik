import React from 'react'

import PostForm from '../components/PostForm'
import { createPostRequest, uploadPostImageRequest } from '../http'

const CreateScreen = ({ navigation }) => {
    const createPost = async (post, imageUri) => {
        const createdPost = await createPostRequest(post)
        const postId = parseInt(createdPost.id)
        await uploadPostImageRequest(postId, imageUri)

        navigation.navigate('Posts')
    }

    return <PostForm label='Create a new Post' onSubmit={createPost} />
}

export default CreateScreen
