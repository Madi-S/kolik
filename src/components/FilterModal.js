import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import THEME from '../theme'
import { CATEGORIES, LOCATIONS } from '../data'
import BottomHalfModal from './modal/BottomHalfModal'

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
    return <BottomHalfModal title='Filter'></BottomHalfModal>
}

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
            <CategoryModal />
            <FilterModal />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})

export default FilterModal
