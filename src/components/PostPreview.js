import React from 'react'
import { Text, Image } from 'react-native'

const PostPreview = ({ post }) => {
    return (
        <>
            <Image />
            <Text>{post.title}</Text>
            <Text>{post.price}</Text>
        </>
    )
}

export default PostPreview
