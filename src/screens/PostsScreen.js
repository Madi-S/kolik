import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'

import DATA from '../data'
import THEME from '../theme'
import * as CONSTANTS from '../constants'
import DetailScreen from './DetailScreen'
import PostPreview from '../components/PostPreview'

const posts = DATA

const PostsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const toShowDetailPost = Boolean(
        useSelector(state => state.post.currentPost)
    )

    if (toShowDetailPost) {
        return <DetailScreen navigation={navigation} />
    }

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
                containerStyle={{ backgroundColor: THEME.PRIMARY_COLOR }}
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
                    <PostPreview post={post} key={post.id.toString()} />
                ))}
            </ScrollView>
        </View>
    )
}

export default PostsScreen
