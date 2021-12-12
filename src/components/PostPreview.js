import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-native'
import { Card } from 'react-native-elements'

import { setCurrentPost } from '../redux/actions/post'

const PostPreview = ({ post }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
    }

    return (
        <Card>
            <Card.Image
                source={{ uri: post.img }}
                style={{ marginBottom: 15 }}
            />
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Price: {post.price} $</Card.Title>
            <Button
                // icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                }}
                title='VIEW NOW'
                onPress={showPostDetail}
            />
            <Card.Divider />
        </Card>
    )
}

export default PostPreview
