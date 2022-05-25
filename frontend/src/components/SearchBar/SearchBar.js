import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { SearchBar as NativeSearchBar } from 'react-native-elements'

import THEME from '../../theme'
import { setSearchQuery } from '../../redux/actions/search'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [_searchQuery, _setSearchQuery] = useState()

    const setAndDispatchSearchQuery = value => {
        _setSearchQuery(value)
        dispatch(setSearchQuery(value))
    }

    return (
        <NativeSearchBar
            placeholder='Type Here ...'
            value={_searchQuery}
            onChangeText={setAndDispatchSearchQuery}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer} 
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.PRIMARY_COLOR
    },
    inputContainer: {
        backgroundColor: THEME.DARKEN_PRIMARY_COLOR
    }
})

export default SearchBar
