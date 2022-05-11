import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
// import { Switch } from 'react-native-elemnts'

import THEME from '../theme'

const UserSettings = () => {
    // TODO: Load these values from redux
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    // TODO: Should dispatch these parameters to redux
    const toggleDarkTheme = () => setDarkThemeEnabled(prev => !prev)
    const toggleNotifications = () => setNotificationsEnabled(prev => !prev)

    return (
        <View style={styles.wrapper}>
            <View style={styles.switchWrapper}>
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

            <View style={styles.switchWrapper}>
                <Text>Dark Theme</Text>
                <Switch
                    trackColor={trackColor}
                    thumbColor={
                        darkThemeEnabled ? THEME.INFO_COLOR : THEME.WHITE_COLOR
                    }
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleDarkTheme}
                    value={darkThemeEnabled}
                />
            </View>
        </View>
    )
}

const trackColor = {
    false: THEME.DANGER_COLOR,
    true: THEME.LIGHTEN_PRIMARY_COLOR
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 30
    },
    switchWrapper: {
        alignItems: 'center'
    }
})

export default UserSettings
