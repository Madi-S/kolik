import React from 'react'
import { Button } from 'react-native'
import { Card } from 'react-native-elements'


const PostPreview = ({ post, setCurrentPostId }) => {
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
                onPress={() => {
                    console.log('!!!!! SET POST ID', post.id)
                    setCurrentPostId(post.id)
                }}
            />
            <Card.Divider />
        </Card>
    )
}

export default PostPreview
