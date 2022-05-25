import React from 'react'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

import { FAButton } from '../core/button'
import { setCurrentPost } from '../../redux/actions/post'
import { getPostImageRequest, deleteMyPostRequest } from '../../http'

const MyPostPreview = ({ post, navigation }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        navigation.navigate('MyDetail', { name: post.title })
        dispatch(setCurrentPost(post))
    }

    const deleteMyPost = () => {
        navigation.navigate('Profile')
        deleteMyPostRequest(post.id)
    }

    return (
        <Card>
            <Card.Image
                source={{ uri: getPostImageRequest(post.id) }}
                style={styles.img}
            />
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Price: {post.price} $</Card.Title>
            <View>
                <FAButton title='Edit' onPress={showPostDetail} />
                <FAButton title='Delete' onPress={deleteMyPost} />
            </View>
            <Card.Divider />
        </Card>
    )
}

const styles = StyleSheet.create({
    img: {}
})

export default MyPostPreview
