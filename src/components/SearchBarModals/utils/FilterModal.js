import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Picker } from '@react-native-picker/picker'

import THEME from '../../../theme'
import { LOCATIONS, SORT_BY_OPTIONS } from '../../../data'
import BottomHalfModal from '../../BottomHalfModal'

const DEFAULT_SORT_BY_OPTION = SORT_BY_OPTIONS[0].value
const DEFAULT_LOCATION = LOCATIONS[0].value

const FilterModal = () => {
    const [priceFrom, setPriceFrom] = useState('0')
    const [priceTo, setPriceTo] = useState('999999')

    const [selectedSortByOption, setSelectedSortByOption] = useState(
        DEFAULT_SORT_BY_OPTION
    )
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)

    return (
        <BottomHalfModal title='Filter'>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Filter</Text>
                <View style={{ marginVertical: 12 }}>
                    <Text>Price from:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder={priceFrom}
                        value={priceFrom}
                        onChangeText={setPriceFrom}
                    />
                </View>
                <View style={{ marginVertical: 12 }}>
                    <Text>Price to:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder={priceTo}
                        value={priceTo}
                        onChangeText={setPriceTo}
                    />
                </View>
                <Select
                    title='Sort by:'
                    selectedValue={selectedSortByOption}
                    onValueChange={setSelectedSortByOption}
                    itemsList={SORT_BY_OPTIONS}
                />
                <Select
                    title='Location:'
                    selectedValue={selectedLocation}
                    onValueChange={setSelectedLocation}
                    itemsList={LOCATIONS}
                />
                <View style={styles.applyButtonWrapper}>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => {
                            console.log('Applying filters:', {
                                priceFrom,
                                priceTo,
                                selectedLocation,
                                selectedSortByOption
                            })
                        }}
                    >
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomHalfModal>
    )
}

const Select = ({ title, selectedValue, onValueChange, itemsList }) => {
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
    content: {
        backgroundColor: 'white',
        padding: 22,
        // justifyContent: 'center',
        // alignItems: 'center',
        /* Remove margins in case of applying above styles */
        marginHorizontal: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    contentTitle: {
        fontSize: 26,
        marginBottom: 8,
        fontWeight: 'bold',
        color: THEME.DARKEN_PRIMARY_COLOR
    },
    contentText: {
        fontSize: 24,
        fontWeight: '600',
        color: THEME.PRIMARY_COLOR
    },
    select: {
        marginVertical: 15
    },
    input: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    },
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

export default FilterModal
