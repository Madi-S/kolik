import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import THEME from '../../../theme'

const AppTextArea = ({
    title = 'Enter:',
    numberOfLines = 4,
    keyboardType = 'default',
    placeholder = 'Type ...',
    containerStyle = {},
    textAreaStyle = {},
    value = null,
    onChangeText = () => {},
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text>{title}</Text>
            <TextInput
                multiline={true}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{...styles.textArea, ...textAreaStyle}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12
    },
    textArea: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    }
})

export default AppTextArea
