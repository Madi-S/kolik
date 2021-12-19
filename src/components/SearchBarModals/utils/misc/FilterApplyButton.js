import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import THEME from '../../../../theme'

const FilterApplyButton = ({ onPress, title }) => {
    return (
        <View style={styles.applyButtonWrapper}>
            <TouchableOpacity style={styles.applyButton} onPress={onPress}>
                <Text style={styles.applyButtonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    applyButtonWrapper: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButton: {
        backgroundColor: THEME.PRIMARY_COLOR,
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButtonText: {
        color: 'white'
    }
})

export default FilterApplyButton
