import React, { useState } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    Button
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import THEME from '../theme'
import BottomHalfModal from './modal/BottomHalfModal'
import { CATEGORIES, LOCATIONS, SORT_BY_OPTIONS } from '../data'

const CategoryModal = () => {
    return (
        <BottomHalfModal title='Categories'>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Categories</Text>
                {CATEGORIES.map((c, id) => {
                    return (
                        <TouchableOpacity
                            key={id}
                            onPress={() => console.log('Picked: ' + c)}
                            style={styles.button}
                        >
                            <Text style={styles.contentText}>{c}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </BottomHalfModal>
    )
}

const FilterModal = () => {
    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(999999)

    const [selectedSortBy, setSelectedSortBy] = useState()
    const [selectedLocation, setSelectedLocation] = useState()

    return (
        <BottomHalfModal title='Filter'>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Filter</Text>
                <View>
                    <Text>Price from:</Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder={priceFrom}
                        value={priceFrom}
                        onChangeText={setPriceFrom}
                    />
                </View>
                <View>
                    <Text>Price to:</Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder={priceTo}
                        value={priceTo}
                        onChangeText={setPriceTo}
                    />
                </View>
                <View>
                    <Text>Sort by:</Text>
                    <Picker
                        selectedValue={selectedSortBy}
                        onValueChange={setSelectedSortBy}
                    >
                        {SORT_BY_OPTIONS.map(item => {
                            return (
                                <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                />
                            )
                        })}
                    </Picker>
                </View>
                {/* <View>
                    <Text>Location:</Text>
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={setSelectedLocation}
                    >
                        {LOCATIONS.map(item => {
                            return (
                                <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                />
                            )
                        })}
                    </Picker>
                </View> */}
                <Button
                    title='Apply'
                    onPress={() => console.log('Applying filters')}
                />
            </View>
        </BottomHalfModal>
    )
}

const SearchBarModals = () => {
    return (
        <View
            style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <CategoryModal />
            <FilterModal />
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
    button: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    },
    row: {
        flexDirection: 'row'
    }
})

export default SearchBarModals
