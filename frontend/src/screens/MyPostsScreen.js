import React from 'react'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-elements'
import { View, ScrollView, StyleSheet } from 'react-native'

import THEME from '../theme'
import { BASE_URL, getMyPostsRequest } from '../http'
import * as CONSTANTS from '../constants'
import PostLoader from '../components/PostLoader'
import { FAButton } from '../components/core/button'
import { setCurrentPost } from '../redux/actions/post'

/*
    Functionality:
        - Get posts by userId (create a function in http.js)
        - Map these posts as new MyPostPreview component
            with passing additional buttons as children props
            (delete, deactivate / activate buttons)
        - Whenever MyPostPreview is clicked, navigate EditScreen
            by passing the params (postState)
            and dispatch currentPost

    UI:
        - PostsContainer: custom post preview cards
            with delete icon button
*/

const MyPostsScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState(null)

    const openPostDetail = post => {
        return () => {
            dispatch(setCurrentPost(post))
            navigation.navigate('Detail')
        }
    }

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
        const asyncFetchPosts = async () => {
            const posts = await getMyPostsRequest()
            setPosts(posts)
        }

        asyncFetchPosts().catch(console.error)
    }, [])

    return (
        <ScrollView>
            <View style={styles.postsWrapper}>
                {posts.map(post => (
                    <MyPostPreview
                        post={post}
                        key={post.id.toString()}
                        onPreviewCliick={openPostDetail(post)}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

const MyPostPreview = ({ post, onPreviewClick }) => {
    const dispatch = useDispatch()

    const showPostDetail = () => {
        dispatch(setCurrentPost(post))
        onPreviewClick()
    }

    return (
        <Card>
            <Card.Image
                source={{
                    uri: `${BASE_URL}/post/image/${parseInt(post.id)}`
                }}
                style={styles.img}
            />
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Price: {post.price} $</Card.Title>
            <FAButton
                title='VIEW NOW'
                onPress={showPostDetail}
                style={previewButtonStyle}
            />
            <Card.Divider />
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {},
    postsWrapper: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default MyPostsScreen
