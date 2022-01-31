import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DATA from '../../data'
import PostLoader from '../PostLoader'
import PostPreview from '../PostPreview'
import * as CONSTANTS from '../../constants'
import { setCurrentPost } from '../../redux/actions/post'
import { queryPostsRequest, getPostsQueryCountRequest } from '../../http'


const Posts = ({ navigation }) => {
    let lastMaxOffsetY = 0

    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    const [posts, setPosts] = useState(DATA)
    const [postsCount, setPostsCount] = useState(CONSTANTS.LOAD_POSTS_PER_TIME)
    const [postsCountLimit, setPostsCountLimit] = useState(999)

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
        const asyncSetPostsCountLimit = async () => {
            const postsLimit = await getPostsQueryCountRequest(searchOptions)
            setPostsCountLimit(postsLimit)
        }

        asyncSetPostsCountLimit().catch(console.error)
    }, [searchOptions])

    useEffect(() => {
        const searchOptionsWithToIndex = {
            ...searchOptions,
            to: postsCount
        }

        console.log('Fetching posts with params:', searchOptionsWithToIndex)

        const fetchPosts = async () => {
            await sleep(3000)
            const _posts = await queryPostsRequest(searchOptionsWithToIndex)
            setPosts(_posts)
        }

        fetchPosts().catch(console.error)
    }, [searchOptions, postsCount])

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

            if (postsCount < postsCountLimit) {                
                setPostsCount(postsCount + CONSTANTS.LOAD_POSTS_PER_TIME)
            }
        }
    }

    const showLoader = postsCount < postsCountLimit

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
                {showLoader ? <PostLoader /> : <Text></Text>}
            </View>
        </ScrollView>
    )
}

const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default Posts
