import React, { useState } from 'react'
import { ScrollView, Text, FlatList } from 'react-native'

import DATA from '../data'
import * as CONSTANTS from '../constants'
import DetailScreen from './DetailScreen'
import PostPreview from '../components/PostPreview'

const PostsScreen = ({ navigation }) => {
    const posts = DATA
    const [currentPostId, setCurrentPostId] = useState(null)

    if (currentPostId) {
        // return <Text>Hello</Text>
        return  <DetailScreen navigation={navigation} post={posts[currentPostId]} />
    }

    return (
        <ScrollView
            style={{
                marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM,
                fontfamily: 'm-bold'
            }}
        >
            {posts.map(post => (
                <PostPreview
                    post={post}
                    key={post.id.toString()}
                    setCurrentPostId={setCurrentPostId}
                />
            ))}
        </ScrollView>
    )
}

export default PostsScreen
