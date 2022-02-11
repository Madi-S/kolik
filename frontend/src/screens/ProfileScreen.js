import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
// import { Switch } from 'react-native-elemnts'

import THEME from '../theme'
import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'
import BottomHalfModal from '../components/BottomHalfModal'

/*  
    Functionality:
        - Toggle notifications                  +
        - Toggle darkTheme                      +
        - Show modal AboutUs modal              +
        - Send feedback to server
        - Navigate to MyPostsScreen             +       

    UI:
        - Userbar: user icon and user name
        - Switches: two toggles with titles     +
        - AboutUs: button, which opens modal    +
        - Feedback: textarea and button         +

*/

const ProfileScreen = ({ navigation }) => {
    // Load these parameters from redux
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    const [showAboutUsModal, setShowAboutUsModal] = useState(false)

    const [feedbackValue, setFeedbackValue] = useState('')

    // Should dispatch these parameters to redux
    const toggleDarkTheme = () => setDarkThemeEnabled(prev => !prev)
    const toggleNotifications = () => setNotificationsEnabled(prev => !prev)

    const sendFeedback = () => {
        /* Send feedback to server */
    }

    const openAboutUsModal = () => {
        setShowAboutUsModal(true)
    }

    const openMyPostsScreen = () => {
        navigation.navigate('MyPosts')
    }

    const userName = 'Mr Madi'

    return (
        <View style={styles.wrapper}>
            <AboutUsModal
                showModal={showAboutUsModal}
                setShowModal={setShowAboutUsModal}
            />

            <View style={styles.userbar}>
                <View>
                    <Text>I am a User Icon</Text>
                </View>
                <Text>Hello, {userName}</Text>
            </View>

            <View style={styles.switches}>
                <View style={styles.switch}>
                    <Text>Notifications</Text>
                    <Switch
                        trackColor={trackColor}
                        thumbColor={
                            notificationsEnabled
                                ? THEME.INFO_COLOR
                                : THEME.WHITE_COLOR
                        }
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleNotifications}
                        value={notificationsEnabled}
                    />
                </View>

                <View style={styles.switch}>
                    <Text>Dark Theme</Text>
                    <Switch
                        trackColor={trackColor}
                        thumbColor={
                            darkThemeEnabled
                                ? THEME.INFO_COLOR
                                : THEME.WHITE_COLOR
                        }
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleDarkTheme}
                        value={darkThemeEnabled}
                    />
                </View>
            </View>

            <View style={styles.about}>
                <AppButton onPress={openAboutUsModal} title='About Us' />
            </View>

            <View style={styles.feedback}>
                <AppTextArea
                    title='Recommendations ...'
                    value={feedbackValue}
                    onChangeText={setFeedbackValue}
                />
                <AppButton title='Send feedback' onPress={sendFeedback} />
            </View>
        </View>
    )
}

const AboutUsModal = ({ showModal, setShowModal }) => {
    return (
        <BottomHalfModal
            title='Categories'
            isVisible={showModal}
            setIsVisible={setShowModal}
        >
            <View style={styles.modalWrapper}>
                <Text style={styles.modalContentTitle}>About Us</Text>
                <Text style={styles.modalContentText}>
                    Kolik - a web application for loaning vehicles.
                </Text>
                <Text style={styles.modalContentText}>
                    Created by Shaiken "floppy" Madi.
                </Text>
                <Text style={styles.modalContentText}>
                    All Rights Reserved 2021-2022.
                </Text>
            </View>
        </BottomHalfModal>
    )
}

const trackColor = {
    false: THEME.DANGER_COLOR,
    true: THEME.LIGHTEN_PRIMARY_COLOR
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userbar: {
        // flex: 1,
        // alignItems: 'center',
        // flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30
    },
    switches: {},
    switch: {},
    about: {},
    feedback: {},
    modalWrapper: {
        backgroundColor: 'white',
        padding: 22,
        marginHorizontal: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalContentTitle: {
        fontSize: 26,
        marginBottom: 8,
        fontWeight: 'bold',
        color: THEME.DARKEN_PRIMARY_COLOR
    },
    modalContentText: {
        fontSize: 24,
        fontWeight: '600',
        color: THEME.PRIMARY_COLOR
    }
})

export default ProfileScreen
