import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import THEME from '../../../theme'

const AppInput = ({
    title = 'Enter:',
    keyboardType = 'default',
    placeholder = 'Type ...',
    containerStyle = {},
    inputStyle = {},
    value = null,
    onChangeText = () => {},
}) => {
    return (
        <View style={{...styles.container, ...containerStyle}}>
            <Text>{title}</Text>
            <TextInput
                style={{...styles.input, ...inputStyle}}
                keyboardType={keyboardType}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12
    },
    input: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    }
})

export default AppInput
