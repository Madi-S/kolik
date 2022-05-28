import * as Font from 'expo-font'
import { setToken, setUserId } from './auth'

const loadApp = async () => {
    await setAuthParams()

    try {
        await Font.loadAsync({
            'm-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
            'm-thin': require('../assets/fonts/Montserrat-Thin.ttf'),
            'm-light': require('../assets/fonts/Montserrat-Light.ttf'),
            'm-italic': require('../assets/fonts/Montserrat-Italic.ttf'),
            'm-regular': require('../assets/fonts/Montserrat-Regular.ttf')
        })
    } catch (error) {
        console.warn('Failed to load fonts', err)
    }
}

const setAuthParams = async () => {
    // Check token for validity
    // If token is not valid, set userId and token to null
}

export default loadApp
