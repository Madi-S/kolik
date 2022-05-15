import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DATA from '../../data'
import PostLoader from '../PostLoader'
import PostPreview from '../PostPreview'
import * as CONSTANTS from '../../constants'
import { setCurrentPost } from '../../redux/actions/post'
import { queryPostsRequest, getPostsQueryCountRequest } from '../../http'

let lastMaxOffsetY = 0

const Posts = ({ navigation }) => {
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

        const asyncFetchPosts = async () => {
            const _posts = await queryPostsRequest(searchOptionsWithToIndex)

            setPosts(_posts)
        }

        asyncFetchPosts().catch(console.error)
    }, [searchOptions, postsCount])

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

    const openPostDetail = post => {
        return () => {
            dispatch(setCurrentPost(post))
            navigation.navigate('Detail')
        }
    }

    let showLoader = postsCount < postsCountLimit

    return (
        <ScrollView onScroll={loadMorePosts}>
            <View style={styles.postsWrapper}>
                {posts.map(post => (
                    <PostPreview
                        post={post}
                        key={post.id.toString()}
                        onPreviewClick={openPostDetail(post)}
                    />
                ))}
                {showLoader ? <PostLoader /> : <Text></Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default Posts
