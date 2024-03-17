import React from 'react'
import { View, StyleSheet } from 'react-native'

import UserBar from '../components/Userbar'
import AboutUs from '../components/AboutUs'
import Feedback from '../components/Feedback'
import OpenMyPosts from '../components/OpenMyPosts'
import UserSettings from '../components/UserSettings'

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.wrapper}>
            <UserBar />
            <UserSettings />
            <OpenMyPosts navigation={navigation} />
            <Feedback />
            <AboutUs />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

export default ProfileScreen
