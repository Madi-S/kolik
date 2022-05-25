import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import THEME from '../theme'
import * as CONSTANTS from '../constants'
import { getMyPostsRequest } from '../http'
import PostLoader from '../components/PostLoader'
import MyPostPreview from '../components/MyPostPreview'

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

const styles = StyleSheet.create({
    container: {},
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default MyPostsScreen
