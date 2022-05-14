import React from 'react'
import { getUserId } from '../../auth'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../../theme'
import { AppButton } from '../core/button'

const userId = getUserId()

const OpenMyPosts = ({ navigation }) => {
    const openMyPostsScreen = () => {
        navigation.navigate('MyPosts')
    }

    return (
        <View style={styles.wrapper}>
            <Text>View & Edit My Posts</Text>
            <AppButton title='Open' onPress={openMyPostsScreen} />
        </View>
    )

    // return (
    //     <ScrollView onScroll={loadMorePosts}>
    //         <View style={styles.postsWrapper}>
    //             {posts.map(post => (
    //                 <PostPreview
    //                     post={post}
    //                     key={post.id.toString()}
    //                     onPreviewCliick={openPostDetail(post)}
    //                 />
    //             ))}
    //             {showLoader ? <PostLoader /> : <Text></Text>}
    //         </View>
    //     </ScrollView>
    // )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 30,
        alignItems: 'center'
    }
})

export default OpenMyPosts
