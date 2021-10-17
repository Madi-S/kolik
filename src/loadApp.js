import * as Font from 'expo-font'

const loadApp = async () => {
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

export default loadApp
