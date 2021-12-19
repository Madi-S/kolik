import React from 'react'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-elements'

import { setCurrentPost } from '../../redux/actions/post'
import PreviewButton from './utils/PreviewButton'

const PostPreview = ({ post, onPreviewCliick, previewButtonStyle }) => {
    // If dispathcing will not be needed, don't forget to remove it
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        onPreviewCliick()
    }

    return (
        <Card>
            <Card.Image
                source={{ uri: post.img }}
                style={{ marginBottom: 15 }}
            />
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Price: {post.price} $</Card.Title>
            <PreviewButton
                title='VIEW NOW'
                onPress={showPostDetail}
                style={previewButtonStyle}
            />
            <Card.Divider />
        </Card>
    )
}

export default PostPreview
