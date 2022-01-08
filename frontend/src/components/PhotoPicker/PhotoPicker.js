import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import askForPermissionsAsync from './utils/permissions'
import { AppButton } from '../core/button'

const cameraOptions = {
    quality: 0.7,
    allowsEditing: false,
    aspect: [16, 9]
}

const PhotoPicker = ({
    title = 'Take a photo',
    onPick = () => {},
    containerStyle = {},
    imageStyle = {},
    buttonStyle = {}
}) => {
    const [image, setImage] = useState(null)

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

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
})

export default PhotoPicker
