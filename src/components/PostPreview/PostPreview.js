import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import { FAButton } from '../core/buttons'
import { setCurrentPost } from '../../redux/actions/post'

const PostPreview = ({ post, onPreviewCliick, previewButtonStyle }) => {
    // If dispathcing will not be needed, don't forget to remove it
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        onPreviewCliick()
    }

    return (
        <Card>
            <Card.Image source={{ uri: post.img }} style={styles.img} />
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

const styles = StyleSheet.create({
    img: { marginBottom: 15 }
})

export default PostPreview
