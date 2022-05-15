import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import { BASE_URL } from '../../http'
import { FAButton } from '../core/button'
import { setCurrentPost } from '../../redux/actions/post'

const PostPreview = ({ post, navigation, previewButtonStyle }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        navigation.navigate('Detail')
    }

    return (
        <Card>
            <Card.Image
                source={{
                    uri: `${BASE_URL}/post/image/${parseInt(post.id)}`
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

const styles = StyleSheet.create({
    img: { marginBottom: 15 }
})

export default PostPreview
