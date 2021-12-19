import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, View, StyleSheet } from 'react-native'

import DATA from '../data'
import * as CONSTANTS from '../constants'
import PostPreview from '../components/PostPreview'
import SearchBar from '../components/SearchBar'
import SearchBarModals from '../components/SearchBarModals'
import { setCurrentPost } from '../redux/actions/post'

const PostsScreen = ({ navigation }) => {
    /*  
        Implement react-redux useSelector to get posts
        Create seperate component for posts display like 'Posts.js'
    */

    return (
        <View>
            <SearchBar />
            <ScrollView>
                <SearchBarModals />
                <Posts navigation={navigation} />
            </ScrollView>
        </View>
    )
}

const Posts = ({ navigation }) => {
    const posts = DATA
    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    console.log('!!! Search options:', searchOptions)

    const openPostDetail = (post) => {
        return () => {
            dispatch(setCurrentPost(post))
            navigation.navigate('Detail')
        }
    }

    return (
        <View style={styles.postsWrapper}>
            {posts.map(post => (
                <PostPreview
                    post={post}
                    key={post.id.toString()}
                    onPreviewCliick={openPostDetail(post)}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default PostsScreen
