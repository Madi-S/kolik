import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import THEME from '../../../theme'

const ACTIVE_OPACITY = 0.7

const AppButton = ({ onPress = () => {}, title = 'Open', style = {} }) => {
    return (
        <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={{ ...styles.button, ...style }}
            onPress={onPress}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: THEME.PRIMARY_COLOR,
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white'
    }
})

export default AppButton
