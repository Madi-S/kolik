import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Switch, StyleSheet } from 'react-native'

import THEME from '../../theme'
import {
    toggleDarkTheme,
    toggleNotificationsEnabled
} from '../../redux/actions/settings'

const UserSettings = () => {
    const dispatch = useDispatch()
    const darkThemeEnabled = useSelector(
        state => state.settings.darkThemeEnabled
    )
    const notificationsEnabled = useSelector(
        state => state.notificationsEnabled
    )

    const [darkThemeStatus, setDarkThemeStatus] = useState(darkThemeEnabled)
    const [notificationsEnbaledStatus, setNotificationsEnbaledStatus] =
        useState(notificationsEnabled)

    const _toggleDarkTheme = status => {
        setDarkThemeStatus(status)
        dispatch(toggleDarkTheme(status))
    }
    const _toggleNotificationsEnabled = status => {
        setNotificationsEnbaledStatus(status)
        dispatch(toggleNotificationsEnabled(status))
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.switchWrapper}>
                <Text>Notifications</Text>
                <Switch
                    trackColor={trackColor}
                    ios_backgroundColor='#3e3e3e'
                    value={darkThemeStatus}
                    onValueChange={_toggleDarkTheme}
                    thumbColor={
                        darkThemeStatus ? THEME.INFO_COLOR : THEME.WHITE_COLOR
                    }
                />
            </View>

            <View style={styles.switchWrapper}>
                <Text>Dark Theme</Text>
                <Switch
                    trackColor={trackColor}
                    ios_backgroundColor='#3e3e3e'
                    value={notificationsEnbaledStatus}
                    onValueChange={_toggleNotificationsEnabled}
                    thumbColor={
                        notificationsEnbaledStatus
                            ? THEME.INFO_COLOR
                            : THEME.WHITE_COLOR
                    }
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
