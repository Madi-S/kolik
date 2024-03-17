import React from 'react'

import PostForm from '../components/PostForm'
import { createPostRequest, uploadPostImageRequest } from '../http'

const CreateScreen = ({ navigation }) => {
    const createPost = async (post, imageUri) => {
        navigation.navigate('Posts')

        const createdPost = await createPostRequest(post)
        const postId = parseInt(createdPost.id)
        await uploadPostImageRequest(postId, imageUri)
    }

    return <PostForm label='Create a new Post' onSubmit={createPost} />
}

export default CreateScreen
