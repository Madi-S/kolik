import React from 'react'
import { Text } from 'react-native'

import DATA from '../data'
import DetailScreen from './DetailScreen'

const PostsScreen = ({ navigation }) => {
    // return <Text>Posts Screen</Text>
    return <DetailScreen post={DATA[0]} navigation={navigation} />
}

export default PostsScreen
