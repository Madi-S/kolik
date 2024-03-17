import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../../theme'

const UserBar = () => {
    // TODO: Load username from the server
    const username = 'Mr Madi'

    return (
        <View style={styles.wrapper}>
            <Ionicons name='person-circle-outline' size={48} color='black' />
            <Text>Hello, {username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default UserBar
