import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const FilterSelect = ({ title, selectedValue, onValueChange, itemsList }) => {
    return (
        <View style={styles.select}>
            <Text>{title}</Text>
            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
                {itemsList.map(item => {
                    return (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    )
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    select: {
        marginVertical: 15
    }
})

export default FilterSelect
