import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DATA from '../../data'
import * as CONSTANTS from '../../constants'
import PostPreview from '../PostPreview'
import { setCurrentPost } from '../../redux/actions/post'

let posts = DATA

const loadPostsFromServer = params => {
    console.log('Loading posts from server with params:', params)
    return DATA
}

const Posts = ({ navigation }) => {
    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    useEffect(() => {
        posts = loadPostsFromServer(searchOptions)
    }, [searchOptions])

    const openPostDetail = post => {
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

export default Posts
