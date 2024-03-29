import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import THEME from '../../../theme'

const FAButton = ({ onPress = () => {}, title = '', style = {} }) => {
    return (
        <FontAwesome.Button
            style={{ ...styles.button, ...style }}
            onPress={onPress}
        >
            {title}
        </FontAwesome.Button>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 38,
        backgroundColor: THEME.PRIMARY_COLOR
    }
})

export default FAButton
