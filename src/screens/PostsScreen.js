import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import DATA from '../data'
import DetailScreen from './DetailScreen'

import * as CONSTANTS from '../constants'

const PostsScreen = ({ navigation }) => {
    const posts = DATA

    return (
        <ScrollView
            style={{
                marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM,
                fontfamily: 'm-bold'
            }}
        >
            <Card containerStyle={{ padding: 0 }}>
                {posts.map(post => (
                    <ListItem key={post.id.toString()} post={post} />
                ))}
            </Card>
        </ScrollView>
    )

    // return <DetailScreen post={DATA[0]} navigation={navigation} />
}

export default PostsScreen
