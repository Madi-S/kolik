import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import THEME from '../../../../theme'

const FilterInput = ({ title = 'Select:', value = '', onChangeText }) => {
    return (
        <View style={styles.inputWrapper}>
            <Text>{title}</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={value}
                placeholder={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    },
    inputWrapper: {
        marginVertical: 12
    }
})

export default FilterInput
