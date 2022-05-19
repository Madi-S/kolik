import React from 'react'
import { View, StyleSheet } from 'react-native'

import THEME from '../../theme'
import { FAButton } from '../core/button'
import { activateMyPostRequest, deactivateMyPostRequest } from '../../http'

const TogglePostActivation = (isActivated, postId) => {
    let title, color, handler

    if (isActivated) {
        title = 'Deactivate'
        handler = deactivateMyPostRequest
        color = THEME.DANGER_COLOR
    } else {
        title = 'Activate'
        handler = activateMyPostRequest
        color = THEME.INFO_COLOR
    }

    const onPress = postId => handler(postId)

    return (
        <View>
            <FAButton
                title={title}
                style={{ ...styles, backgroundColor: color }}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: { marginBottom: 30 }
})

export default TogglePostActivation
