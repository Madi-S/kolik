import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useInfiniteQuery, useQueryClient } from 'react-query'

import DATA from '../../data'
import PostLoader from '../PostLoader'
import PostPreview from '../PostPreview'
import * as CONSTANTS from '../../constants'
import { setCurrentPost } from '../../redux/actions/post'

const Posts = ({ navigation }) => {
    const [posts, setPosts] = useState(DATA)
    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    if (true) {
        // TODO:  implement post loader
        return (
            <View style={styles.postsWrapper}>
                <PostLoader />
                <PostLoader />
                <PostLoader />
            </View>
        )
    }

    useEffect(() => {
        console.log('Fetching posts with params:', searchOptions)
        const fetchPosts = async () => {
            const _posts = await loadPostsFromServer(searchOptions)
            setPosts(_posts)
        }

        fetchPosts().catch(console.error)
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

const loadPostsFromServer = async params => {
    const body = JSON.stringify(params)
    const res = await fetch('https://kolik-backend.herokuapp.com/post/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'auth-token': '2222'
        },
        body
    })
    const posts = JSON.parse(await res.text())
    if (posts.length === 0) {
        return false
    }
    return posts
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default Posts
