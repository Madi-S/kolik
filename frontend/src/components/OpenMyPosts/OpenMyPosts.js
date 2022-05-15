import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../../theme'
import { AppButton } from '../core/button'

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
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 30,
        alignItems: 'center'
    }
})

export default OpenMyPosts
