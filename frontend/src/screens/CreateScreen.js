import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import PhotoPicker from '../components/PhotoPicker'
import { AppInput } from '../components/core/input'
import { AppSelect } from '../components/core/select'
import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'

import * as CONSTANTS from '../constants'
import { LOCATIONS, CATEGORIES } from '../data'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_CATEGORY = CATEGORIES[0].value

const createPostAPI = async post => {
    let response = await fetch('http://127.0.0.1:5000/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post)
    })
    console.log(await response.text())
}

const CreateScreen = ({ navigation }) => {
    const [img, setImg] = useState()
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('+7')
    const [price, setPrice] = useState('0')
    const [location, setLocation] = useState(DEFAULT_LOCATION)
    const [category, setCategory] = useState(DEFAULT_CATEGORY)
    const [description, setDescription] = useState('')

    const processImage = img => {
        setImg(img)
    }

    const createPost = async () => {
        console.log('Creating post!!!')
        const post = {
            img,
            title,
            phone,
            price,
            location,
            category,
            description
        }
        // createPostAPI(post)

        let localUri = img.uri
        let filename = localUri.split('/').pop()

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData()
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type })

        console.log('Gonna do fetching')
        res = await fetch('URL', {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(await res.text())
        console.log('Done fetching')
    }

    return (
        <View style={styles.container}>
            <Text>Create own Car Post</Text>
            <ScrollView>
                <PhotoPicker onPick={processImage} />
                <AppInput title='Title' value={title} onChangeText={setTitle} />
                <AppInput
                    title='Contact phone number'
                    keyboardType='numeric'
                    value={phone}
                    onChangeText={setPhone}
                />
                <AppInput
                    title='Price'
                    keyboardType='numeric'
                    value={price}
                    onChangeText={setPrice}
                />
                <AppTextArea
                    title='Description'
                    value={description}
                    onChangeText={setDescription}
                />
                <AppSelect
                    title='Location'
                    selectedValue={location}
                    onValueChange={setLocation}
                    itemsList={LOCATIONS}
                />
                <AppSelect
                    title='Location'
                    selectedValue={category}
                    onValueChange={setCategory}
                    itemsList={CATEGORIES}
                />

                <AppButton
                    title='Create'
                    onPress={createPost}
                    style={styles.createButton}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    createButton: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})

export default CreateScreen
