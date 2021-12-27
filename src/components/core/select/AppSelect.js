import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import THEME from '../../../theme'

const AppSelect = ({
    title = 'Select:',
    itemsList = [{ value: 'Default value', label: 'Default label' }],
    containerStyle = {},
    selectStyle = {},
    selectedValue = null,
    onValueChange = () => {}
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text>{title}</Text>
            <Picker
                style={{ ...styles.select, ...selectStyle }}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                {itemsList.map(item => {
                    return (
                        <Picker.Item
                            key={item.value || 'No item value specified'}
                            label={item.label || 'No item label specified'}
                            value={item.value || 'No item value specified'}
                        />
                    )
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    select: {}
})

export default AppSelect
