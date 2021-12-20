import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import THEME from '../../../theme'
import FilterInput from './misc/FilterInput'
import FilterSelect from './misc/FilterSelect'
import BottomHalfModal from '../../BottomHalfModal'
import { AppButton } from '../../core/buttons'
import { LOCATIONS, SORT_BY_OPTIONS } from '../../../data'
import { setSearchFilters } from '../../../redux/actions/search'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_SORT_BY_OPTION = SORT_BY_OPTIONS[0].value

const FilterModal = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const [priceFrom, setPriceFrom] = useState('0')
    const [priceTo, setPriceTo] = useState('99999999')
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)
    const [selectedSortByOption, setSelectedSortByOption] = useState(
        DEFAULT_SORT_BY_OPTION
    )

    const applyFilters = () => {
        setShowModal(false)
        dispatch(
            setSearchFilters({
                priceFrom,
                priceTo,
                selectedLocation,
                selectedSortByOption
            })
        )
    }

    return (
        <BottomHalfModal
            title='Filter'
            isVisible={showModal}
            setIsVisible={setShowModal}
        >
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Filter</Text>
                <FilterInput
                    title='Price from:'
                    value={priceFrom}
                    onChangeText={setPriceFrom}
                />
                <FilterInput
                    title='Price to:'
                    value={priceTo}
                    onChangeText={setPriceTo}
                />
                <FilterSelect
                    title='Sort by:'
                    selectedValue={selectedSortByOption}
                    onValueChange={setSelectedSortByOption}
                    itemsList={SORT_BY_OPTIONS}
                />
                <FilterSelect
                    title='Location:'
                    selectedValue={selectedLocation}
                    onValueChange={setSelectedLocation}
                    itemsList={LOCATIONS}
                />
                <View style={styles.applyButtonWrapper}>
                    <AppButton
                        onPress={applyFilters}
                        title='Apply'
                        style={styles.applyButton}
                    />
                </View>
            </View>
        </BottomHalfModal>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: 24,
        fontWeight: '600',
        color: THEME.PRIMARY_COLOR,
        // justifyContent: 'center',
        // alignItems: 'center',
        /* Remove margins in case of applying above styles */
        marginHorizontal: 20
    },
    contentTitle: {
        fontSize: 26,
        marginBottom: 8,
        fontWeight: 'bold',
        color: THEME.DARKEN_PRIMARY_COLOR
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
    }
})

export default FilterModal
