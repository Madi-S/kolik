import React from 'react'
import { View, StyleSheet } from 'react-native'

import FilterModal from './utils/FilterModal'
import CategoriesModal from './utils/CategoriesModal'

const SearchBarModals = () => {
    return (
        <View style={styles.modalsWrapper}>
            <CategoriesModal />
            <FilterModal />
        </View>
    )
}

const styles = StyleSheet.create({
    modalsWrapper: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default SearchBarModals
