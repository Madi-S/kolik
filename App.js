import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import THEME from './src/theme'
import loadApp from './src/loadApp'

export default function App() {
    console.log('Rendered app')
    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return (
            <AppLoading
                startAsync={loadApp}
                onFinish={() => setIsLoading(false)}
                onError={err => console.warn('Failed to load app', err)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Testing fonts</Text>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.SECONDARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'm-bold',
        color: THEME.PRIMARY_COLOR
    }
})
