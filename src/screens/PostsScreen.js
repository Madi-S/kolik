import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native'

import DATA from '../data'
import * as CONSTANTS from '../constants'
import DetailScreen from './DetailScreen'
import PostPreview from '../components/PostPreview'

const posts = DATA

const PostsScreen = ({ navigation }) => {
    const toShowDetailPost = Boolean(useSelector(state => state.post.currentPost))

    if (toShowDetailPost) {
        return <DetailScreen navigation={navigation} />
    }
    return (
        <ScrollView
            style={{
                marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
            }}
        >
            {posts.map(post => (
                <PostPreview post={post} key={post.id.toString()} />
            ))}
        </ScrollView>
    )
}

export default PostsScreen
