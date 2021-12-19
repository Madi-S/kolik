import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, StyleSheet } from 'react-native'

import DATA from '../data'
import * as CONSTANTS from '../constants'
import PostPreview from '../components/PostPreview'
import SearchBar from '../components/SearchBar'
import SearchBarModals from '../components/SearchBarModals'

const posts = DATA

const queryPosts = params => {
    console.log('Querying posts with params:', params)
    return posts
}

const PostsScreen = ({ navigation }) => {
    // Implement react-redux useSelector to get posts
    // Create seperate component for posts display like 'Posts.js'

    const openPostDetail = () => {
        navigation.navigate('Detail')
    }

    return (
        <View>
            <SearchBar />
            <ScrollView style={styles.postsWrapper}>
                <SearchBarModals />
                {posts.map(post => (
                    <PostPreview
                        post={post}
                        key={post.id.toString()}
                        onPreviewCliick={openPostDetail}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default PostsScreen
