import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

import THEME from '../theme'

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
    return <View style={styles.container}></View>
}

const MyPostPreview = () => {}

const styles = StyleSheet.create({
    container: {}
})

export default MyPostsScreen
