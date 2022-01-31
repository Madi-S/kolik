import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
// import { Switch } from 'react-native-elemnts'

import THEME from '../theme'
import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'

/*  
    Functionality:
        - Toggle notifications
        - Toggle darkTheme
        - Show modal AboutUs modal
        - Send feedback to server

    UI:
        - Userbar: user icon and user name
        - Switches: two toggles with titles
        - AboutUs: button, which opens modal
        - Feedback: textarea and button

*/

const ProfileScreen = ({ navigation }) => {
    // Load these parameters from redux
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true)

    // Should dispatch these parameters to redux
    const toggleNotifications = () => setNotificationsEnabled(prev => !prev)
    const toggleDarkTheme = () => setDarkThemeEnabled(prev => !prev)

    const showAboutUs = () => {}
    const sendFeedback = () => {}

    const userName = 'Mr Madi'

    return (
        <View>
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
                <AppButton
                    onPress={showAboutUs}
                    title='About us'
                />
            </View>
            <View style={styles.feedback}>
                <AppTextArea />
                <AppButton title='Send feedback' onPress={sendFeedback} />
            </View>
        </View>
    )
}

const trackColor = {
    false: THEME.DANGER_COLOR,
    true: THEME.LIGHTEN_PRIMARY_COLOR
}

const styles = StyleSheet.create({
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
    feedback: {}
})

export default ProfileScreen
