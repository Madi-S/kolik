import React from 'react'
import { View, StyleSheet } from 'react-native'

import THEME from '../../theme'
import { FAButton } from '../core/button'
import { activateMyPostRequest, deactivateMyPostRequest } from '../../http'

const TogglePostActivation = ({ navigation, isActivated, postId }) => {
    let title, color

    let func = isActivated
        ? async () => {
              navigation.navigate('Profile')
              await deactivateMyPostRequest(postId)
          }
        : async () => {
              navigation.navigate('Profile')
              await activateMyPostRequest(postId)
          }

    if (isActivated) {
        title = 'Deactivate'
        color = THEME.DANGER_COLOR
    } else {
        title = 'Activate'
        color = THEME.INFO_COLOR
    }

    return (
        <View>
            <FAButton
                title={title}
                style={{ ...styles, backgroundColor: color }}
                onPress={func}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: { marginBottom: 30 }
})

export default TogglePostActivation
