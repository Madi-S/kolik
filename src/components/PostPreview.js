import React from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

import { setCurrentPost } from '../redux/actions/post'
import THEME from '../theme'

const PostPreview = ({ post, onPreviewCliick }) => {
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
            <FontAwesome.Button
                style={{
                    height: 38
                }}
                name='mail-forward'
                backgroundColor={THEME.DANGER_COLOR}
                onPress={showPostDetail}
            >
                VIEW NOW
            </FontAwesome.Button>

            <Card.Divider />
        </Card>
    )
}

export default PostPreview
