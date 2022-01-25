import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import Posts from '../components/Posts'
import SearchBar from '../components/SearchBar'
import SearchBarModals from '../components/SearchBarModals'

// Get posts qount with given query params
// Use posts.count and length of posts ot determine if has nextPage or not


const PostsScreen = ({ navigation }) => {
    return (
        <View>
            <SearchBar />
            <ScrollView>
                <SearchBarModals />
                <Posts navigation={navigation} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})

export default PostsScreen
