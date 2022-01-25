import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import { FAButton } from '../core/button'
import { setCurrentPost } from '../../redux/actions/post'

const PostPreview = ({ post, onPreviewCliick, previewButtonStyle }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        onPreviewCliick()
    }

    return (
        <Card>
            <Card.Image
                source={{
                    uri: `https://kolik-backend.herokuapp.com/post/image/${parseInt(
                        post.id
                    )}`
                }}
                style={styles.img}
            />
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Price: {post.price} $</Card.Title>
            <FAButton
                title='VIEW NOW'
                onPress={showPostDetail}
                style={previewButtonStyle}
            />
            <Card.Divider />
        </Card>
    )
}

const getPostImage = async postId => {
    const res = await fetch(
        `https://kolik-backend.herokuapp.com/post/image/${parseInt(postId)}`,
        {
            headers: {
                accept: 'application/json',
                'auth-token': '2222'
            }
        }
    )
    return await res.text()
}

const styles = StyleSheet.create({
    img: { marginBottom: 15 }
})

export default PostPreview
