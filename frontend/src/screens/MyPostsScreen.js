import { useDispatch } from 'react-redux'
import { Card } from 'react-native-elements'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import THEME from '../theme'
import * as CONSTANTS from '../constants'
import PostLoader from '../components/PostLoader'
import { FAButton } from '../components/core/button'
import { setCurrentPost } from '../redux/actions/post'
import {
    getMyPostsRequest,
    getPostImageRequest,
    deleteMyPostRequest
} from '../http'

const MyPostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const asyncFetchPosts = async () => {
            const posts = await getMyPostsRequest()
            setPosts(posts)
        }

        asyncFetchPosts().catch(console.error)
    }, [])

    if (!posts) {
        return (
            <View style={styles.postsWrapper}>
                <PostLoader />
                <PostLoader />
                <PostLoader />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.postsWrapper}>
                {posts.map(post => (
                    <MyPostPreview
                        post={post}
                        key={post.id.toString()}
                        navigation={navigation}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

const MyPostPreview = ({ post, navigation }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        navigation.navigate('MyDetail', { name: post.title })
    }

    const deleteMyPost = () => {
        deleteMyPostRequest(post.id)
        navigation.navigate('Profile')
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
    container: {},
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default MyPostsScreen
