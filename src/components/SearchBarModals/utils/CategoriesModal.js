import React from 'react'
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import THEME from '../../../theme'
import { CATEGORIES } from '../../../data'
import BottomHalfModal from '../../BottomHalfModal'
import { setSearchCategory } from '../../../redux/actions/search'

const CategoriesModal = () => {
    const dispatch = useDispatch()

    const selectCategoryHandler = value => {
        return () => {
            console.log('!!! Gonna dispatch category with value', value)
            dispatch(setSearchCategory(value))
        }
    }

    return (
        <BottomHalfModal title='Categories'>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Categories</Text>
                {CATEGORIES.map(({ value, label }) => {
                    return (
                        <TouchableOpacity
                            key={value}
                            style={styles.button}
                            onPress={selectCategoryHandler(value)}
                        >
                            <Text style={styles.contentText}>{label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </BottomHalfModal>
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
    }
})

export default CategoriesModal
