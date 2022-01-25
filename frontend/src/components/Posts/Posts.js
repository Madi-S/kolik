import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import DATA from '../../data'
import * as CONSTANTS from '../../constants'
import PostPreview from '../PostPreview'
import { setCurrentPost } from '../../redux/actions/post'

const loadPostsFromServer = async params => {
    /*
    query: '',
    category: '',
    filters: {
        priceFrom: 0,
        priceTo: 99999,
        location: 'all',
        sortByOption: ''
    }
    */
    console.log(params)
    const body = JSON.stringify({
        q: 'a',
        filters: {
            priceFrom: 0,
            priceTo: 9999999,
            location: 'all',
            orderByOption: 'title-asc'
        },
        from_: 0,
        to: 10,
        category: 'all'
    })
    const res = await fetch('https://kolik-backend.herokuapp.com/post/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // accept: 'application/json',
            'auth-token': '2222'
        },
        body
    })
    // const posts = await res.text()
    console.log('???', await res.text())
    console.log('!!!', 'Boba')
    return DATA
}

const Posts = ({ navigation }) => {
    let posts = DATA
    const dispatch = useDispatch()
    const searchOptions = useSelector(state => state.search)

    useEffect(() => {
        const fetchPosts = async () => {
            posts = await loadPostsFromServer(searchOptions)
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

const styles = StyleSheet.create({
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default Posts
