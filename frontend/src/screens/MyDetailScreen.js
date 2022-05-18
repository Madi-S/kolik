import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

import { FAButton } from '../components/core/button'
import PostForm from '../components/PostForm/PostForm'
import {
    BASE_URL,
    editPostRequest,
    getPostImageRequest,
    uploadPostImageRequest
} from '../http'

/*
    Functionality:
        - Receive post parameter or take it from redux-selector
            cuz it will be dispatched in MyPostsScree

    UI:
        - PostForm with changed buttonText -> 'Edit' 
            and changed onPressHandler
*/

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
        <PostForm
            label='Edit Your Post'
            buttonTitle='Save'
            onSubmit={editPost}
            postState={postState}
        >
            <TogglePostActivation />
        </PostForm>
    )
}

const TogglePostActivation = () => {
    return (
        <View>
            <Text>Activate/Deactivate Post</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default MyDetailScreen
