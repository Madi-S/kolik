import React from 'react'
import { ScrollView, View, Button } from 'react-native'

import BottomHalfModal from './modal/BottomHalfModal'

const FilterModal = () => {
    return (
        <View
            style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <BottomHalfModal />
            <BottomHalfModal />
        </View>
    )
}

export default FilterModal
