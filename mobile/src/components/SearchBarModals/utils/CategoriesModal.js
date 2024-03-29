import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import THEME from '../../../theme'
import { CATEGORIES } from '../../../data'
import BottomHalfModal from '../../BottomHalfModal'
import { setSearchCategory } from '../../../redux/actions/search'

const CategoriesModal = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const closeModalAndDispatchSearchCategory = value => {
        return () => {
            setShowModal(false)
            dispatch(setSearchCategory(value))
        }
    }

    return (
        <BottomHalfModal
            title='Categories'
            isVisible={showModal}
            setIsVisible={setShowModal}
        >
            <View style={styles.content}>
                <Text style={styles.contentTitle}>Categories</Text>
                {CATEGORIES.map(({ value, label }) => {
                    return (
                        <TouchableOpacity
                            key={value}
                            style={styles.button}
                            onPress={closeModalAndDispatchSearchCategory(value)}
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
        padding: 22,
        borderRadius: 4,
        marginHorizontal: 20,
        backgroundColor: 'white',
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
