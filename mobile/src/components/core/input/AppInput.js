import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import THEME from '../../../theme'

const AppInput = ({
    title = 'Enter:',
    keyboardType = 'default',
    placeholder = 'Type ...',
    containerStyle = {},
    inputStyle = {},
    value = '',
    onChangeText = () => {}
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text>{title}</Text>
            <TextInput
                style={{ ...styles.input, ...inputStyle }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    input: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    }
})

export default AppInput
