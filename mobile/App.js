import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'react-native-elements'
import { useColorScheme } from 'react-native-appearance'
import { PersistGate } from 'redux-persist/integration/react'

import THEME from './src/theme'
import loadApp from './src/loadApp'
import { store, persistor } from './src/redux/store'
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
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={providerTheme} useDark={isDarkScheme}>
                    <TabsStackNavigator />
                    <StatusBar style='auto' />
                </ThemeProvider>
            </PersistGate>
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
