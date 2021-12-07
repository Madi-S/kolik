import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { ThemeProvider } from 'react-native-elements'
import { useColorScheme } from 'react-native-appearance'
import { NavigationContainer } from '@react-navigation/native'

import Tabs from './src/tabs'
import THEME from './src/theme'
import loadApp from './src/loadApp'

const providerTheme = {
    Button: {
        raised: true
    }
}

const App = () => {
    console.log('Rendered app')
    const [isLoading, setIsLoading] = useState(true)

    let colorScheme = useColorScheme()
    let isDarkScheme = colorScheme === 'dark'

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
        <ThemeProvider theme={providerTheme} useDark={isDarkScheme}>
            <NavigationContainer>
                <Tabs />
            </NavigationContainer>
            <StatusBar style='auto' />
        </ThemeProvider>
    )
}

const _styles = StyleSheet.create({
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

export default App
