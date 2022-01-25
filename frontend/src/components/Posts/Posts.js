import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DATA from '../../data'
import PostLoader from '../PostLoader'
import PostPreview from '../PostPreview'
import * as CONSTANTS from '../../constants'
import { setCurrentPost } from '../../redux/actions/post'

const Posts = ({ navigation }) => {
    let lastMaxOffsetY = 0

    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    const [posts, setPosts] = useState(DATA)
    const [postsToIndex, setPostsToIndex] = useState(3)

    if (!posts) {
        return (
            <View style={styles.postsWrapper}>
                <PostLoader />
                <PostLoader />
                <PostLoader />
            </View>
        )
    }

    useEffect(() => {
        const searchOptionsWithToIndex = {
            ...searchOptions,
            to: postsToIndex
        }
        console.log('Fetching posts with params:', searchOptionsWithToIndex)
        const fetchPosts = async () => {
            const _posts = await loadPostsFromServer(searchOptionsWithToIndex)
            setPosts(_posts)
        }

        fetchPosts().catch(console.error)
    }, [searchOptions, postsToIndex])

    const openPostDetail = post => {
        return () => {
            dispatch(setCurrentPost(post))
            navigation.navigate('Detail')
        }
    }

    const loadMorePosts = event => {
        const positionY = event.nativeEvent.contentOffset.y
        const MAGIC_NUMBER = 400

        if (positionY > lastMaxOffsetY + MAGIC_NUMBER) {
            lastMaxOffsetY = positionY
            setPostsToIndex(postsToIndex + 3)
        }

        /*
            - Make sure that fetchPosts is not called if postsToIndex > overall posts count from server 
        */
    }

    return (
        <ScrollView onScroll={loadMorePosts}>
            <View style={styles.postsWrapper}>
                {posts.map(post => (
                    <PostPreview
                        post={post}
                        key={post.id.toString()}
                        onPreviewCliick={openPostDetail(post)}
                    />
                ))}
            </View>
        </ScrollView>
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
