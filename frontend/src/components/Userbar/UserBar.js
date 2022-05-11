import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../../theme'

const UserBar = () => {
    // TODO: Load username from the server
    const userName = 'Mr Madi'

    return (
        <View style={styles.wrapper}>
            <View>
                <Text>I am a User Icon</Text>
            </View>
            <Text>Hello, {userName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        // alignItems: 'center',
        // flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30,
        alignItems: 'center'
    }
})

export default UserBar
