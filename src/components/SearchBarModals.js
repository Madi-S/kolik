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
    const [priceFrom, setPriceFrom] = useState('0')
    const [priceTo, setPriceTo] = useState('999999')

    const [selectedSortByOption, setSelectedSortByOption] = useState(
        SORT_BY_OPTIONS[0].value
    )
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].value)

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
                <View style={styles.select}>
                    <Text>Sort by:</Text>
                    <Picker
                        selectedValue={selectedSortByOption}
                        onValueChange={setSelectedSortByOption}
                    >
                        {SORT_BY_OPTIONS.map(item => {
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
                <View style={styles.select}>
                    <Text>Location:</Text>
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={setSelectedLocation}
                    >
                        {LOCATIONS.map(item => {
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
                <View
                    style={{
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
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
                        <Text style={{ color: 'white' }}>Apply</Text>
                    </TouchableOpacity>
                </View>
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
    },
    select: {
        marginVertical: 15
    },
    input: {
        borderBottomWidth: 1,
        borderColor: THEME.LIGHTEN_PRIMARY_COLOR
    },
    applyButton: {
        backgroundColor: THEME.PRIMARY_COLOR,
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SearchBarModals
