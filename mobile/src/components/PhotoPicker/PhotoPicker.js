import React, { useState } from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import askForPermissionsAsync from './utils/permissions'
import { AppButton } from '../core/button'

const PhotoPicker = ({
    uri = null,
    title = 'Take a photo',
    onPick = () => {},
    containerStyle = {},
    imageStyle = {},
    buttonStyle = {}
}) => {
    const [image, setImage] = useState(uri)

    const showAndProcessImage = img => {
        setImage(img.uri)
        onPick(img)
    }

    const takePhoto = async () => {
        const hasPermissions = await askForPermissionsAsync()
        if (!hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync(cameraOptions)
        const imageIsValid = Boolean(img.uri)

        if (imageIsValid) showAndProcessImage(img)
    }

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <AppButton title={title} onPress={takePhoto} style={buttonStyle} />
            {image && (
                <Image
                    style={{ ...styles.image, ...imageStyle }}
                    source={{ uri: image }}
                />
            )}
        </View>
    )
}

const cameraOptions = {
    quality: 0.7,
    allowsEditing: false,
    aspect: [16, 9]
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: screenWidth - 20,
        height: 200,
        marginTop: 10
    }
})

export default PhotoPicker
