import React from 'react'
import { View } from 'react-native'

import FilterModal from './utils/FilterModal'
import CategoriesModal from './utils/CategoriesModal'

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
            <CategoriesModal />
            <FilterModal />
        </View>
    )
}

export default SearchBarModals
