import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'

import PostForm from '../components/PostForm/PostForm'
import TogglePostActivation from '../components/TogglePostActivation/TogglePostActivation'
import {
    BASE_URL,
    editPostRequest,
    getPostImageRequest,
    uploadPostImageRequest
} from '../http'

const MyDetailScreen = ({ navigation }) => {
    const post = useSelector(state => state.post.currentPost)
    const postId = post.id
    const imageUri = getPostImageRequest(postId)
    const postState = { ...post, imageUri }

    const editPost = async (editedPostState, imageUri) => {
        navigation.navigate('Profile')

        await editPostRequest(editedPostState, parseInt(postId))
        if (!imageUri.includes(BASE_URL)) {
            await uploadPostImageRequest(parseInt(postId), imageUri)
        }
    }

    return (
        <ScrollView>
            <PostForm
                label='Edit Your Post'
                buttonTitle='Save'
                onSubmit={editPost}
                postState={postState}
            >
                <TogglePostActivation
                    postId={postId}
                    isActivated={post.activated}
                />
            </PostForm>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default MyDetailScreen
