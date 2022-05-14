import React from 'react'
import { View, StyleSheet } from 'react-native'

import UserBar from '../components/Userbar'
import AboutUs from '../components/AboutUs'
import Feedback from '../components/Feedback'
import OpenMyPosts from '../components/OpenMyPosts'
import UserSettings from '../components/UserSettings'

/*  
    Functionality:
        - Toggle notifications                  +
        - Toggle darkTheme                      +
        - Show modal AboutUs modal              +
        - Send feedback to server               +
        - Navigate to MyPostsScreen             +

    UI:
        - Userbar: user icon and user name
        - Switches: two toggles with titles     +
        - AboutUs: button, which opens modal    +
        - Feedback: textarea and button         +
        - MyPosts

*/

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default ProfileScreen
