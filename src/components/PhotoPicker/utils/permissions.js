import { Alert, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default async function askForPermissionsAsync() {
    if (Platform.OS !== 'web') {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Error',
                'Sorry, we need camera roll permissions to make this work!'
            )
            return false
        }
        return true
    }
    return false
}
