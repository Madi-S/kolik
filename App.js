import React, { useState } from 'react'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { ThemeProvider } from 'react-native-elements'
import { useColorScheme } from 'react-native-appearance'

import THEME from './src/theme'
import loadApp from './src/loadApp'
import store from './src/redux/store'
import TabsStackNavigator from './src/navigation/tabs'

const providerTheme = { Button: { raised: true } }

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
        <Provider store={store}>
            <ThemeProvider theme={providerTheme} useDark={isDarkScheme}>
                    <TabsStackNavigator />
                <StatusBar style='auto' />
            </ThemeProvider>
        </Provider>
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
