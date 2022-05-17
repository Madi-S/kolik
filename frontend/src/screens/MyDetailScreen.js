import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

import { FAButton } from '../components/core/button'
import PostForm from '../components/PostForm/PostForm'
import { BASE_URL, editPostRequest, uploadPostImageRequest } from '../http'

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
    const postState = {
        ...post,
        imageUri: `${BASE_URL}/post/image/${postId}`
    }

    console.log('POST IDDD', postId)

    const editPost = async (editedPostState, imageUri) => {
        await editPostRequest(editedPostState, postId)
        await uploadPostImageRequest(postId, imageUri)
        navigation.navigate('Profile')
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

const styles = StyleSheet.create({
    togglePhoneNumberButton: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    }
})

export default MyDetailScreen
