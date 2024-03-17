import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../../../theme'
import { AppInput } from '../../core/input'
import { AppButton } from '../../core/button'
import { AppSelect } from '../../core/select'
import BottomHalfModal from '../../BottomHalfModal'
import { LOCATIONS, SORT_BY_OPTIONS } from '../../../data'
import { setSearchFilters } from '../../../redux/actions/search'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_ORDER_BY_OPTION = SORT_BY_OPTIONS[0].value

const FilterModal = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const [priceFrom, setPriceFrom] = useState('0')
    const [priceTo, setPriceTo] = useState('99999999')
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)
    const [selectedOrderByOption, setSelectedOrderByOption] = useState(
        DEFAULT_ORDER_BY_OPTION
    )

    const closeModalAndDispatchSearchFilters = () => {
        setShowModal(false)
        dispatch(
            setSearchFilters({
                priceFrom,
                priceTo,
                location: selectedLocation,
                orderByOption: selectedOrderByOption
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
                <AppInput
                    title='Price from:'
                    keyboardType='numeric'
                    value={priceFrom}
                    onChangeText={setPriceFrom}
                />
                <AppInput
                    title='Price to:'
                    keyboardType='numeric'
                    value={priceTo}
                    onChangeText={setPriceTo}
                />
                <AppSelect
                    title='Order by:'
                    selectedValue={selectedOrderByOption}
                    onValueChange={setSelectedOrderByOption}
                    itemsList={SORT_BY_OPTIONS}
                />
                <AppSelect
                    title='Location:'
                    selectedValue={selectedLocation}
                    onValueChange={setSelectedLocation}
                    itemsList={LOCATIONS}
                />
                <View style={styles.applyButtonWrapper}>
                    <AppButton
                        onPress={closeModalAndDispatchSearchFilters}
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
