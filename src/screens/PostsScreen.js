import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'

import DATA from '../data'
import THEME from '../theme'
import * as CONSTANTS from '../constants'
import PostPreview from '../components/PostPreview'

const posts = DATA

const queryPosts = params => {
    console.log('Querying posts with params:', params)
    return posts
}

const PostsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        console.log(
            'Making request to server to fetch posts for query',
            searchQuery
        )
    }, [searchQuery])

    return (
        <View>
            <SearchBar
                placeholder='Type Here...'
                onChangeText={setSearchQuery}
                value={searchQuery}
                containerStyle={{
                    backgroundColor: THEME.PRIMARY_COLOR
                }}
                inputContainerStyle={{
                    backgroundColor: THEME.DARKEN_PRIMARY_COLOR
                }}
            />
            <ScrollView
                style={{
                    marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
                }}
            >
                {posts.map(post => (
                    <PostPreview
                        post={post}
                        key={post.id.toString()}
                        onPreviewCliick={() => navigation.navigate('Detail')}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default PostsScreen
