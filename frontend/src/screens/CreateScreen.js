import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import PhotoPicker from '../components/PhotoPicker'
import { AppInput } from '../components/core/input'
import { AppSelect } from '../components/core/select'
import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'

import THEME from '../theme'
import * as CONSTANTS from '../constants'
import { makeRestfulRequest } from '../http'
import { LOCATIONS, CATEGORIES } from '../data'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_CATEGORY = CATEGORIES[0].value

const sendCreatePostRequest = async ({ img, post = {} }) => {
    const localUri = img.uri
    const filename = localUri.split('/').pop()

    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('data', post)
    formData.append('image', { uri: localUri, name: filename, type })

    const headers = { 'content-type': 'multipart/form-data' }

    const res = await makeRestfulRequest({
        headers,
        body: formData,
        method: 'POST',
        route: '/image'
    })
    const resText = await res.text()
    console.log('Done fetching:', resText)
}

const CreateScreen = ({ navigation }) => {
    const [img, setImg] = useState()
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('+7')
    const [price, setPrice] = useState('0')
    const [location, setLocation] = useState(DEFAULT_LOCATION)
    const [category, setCategory] = useState(DEFAULT_CATEGORY)
    const [description, setDescription] = useState('')

    const processImage = async img => {
        setImg(img)
        await sendCreatePostRequest({
            img,
            post: {
                title,
                phone,
                price,
                location,
                category,
                description,
                userId: 1
            }
        })
    }

    const createPost = async () => {
        const post = {
            img,
            title,
            phone,
            price,
            location,
            category,
            description
        }

        await processImage()
    }

    return (
        <View>
            <Text style={styles.title}>Create own Car Post</Text>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.center}>
                        <PhotoPicker onPick={processImage} />
                    </View>
                    <AppInput
                        title='Title'
                        value={title}
                        onChangeText={setTitle}
                    />
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
                    <View style={styles.center}>
                        <AppButton
                            title='Create'
                            onPress={createPost}
                            style={styles.createButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    createButton: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM,
        borderRadius: 25,
        backgroundColor: THEME.DANGER_COLOR
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: CONSTANTS.DEFAULT_MARGIN_HORIZONTAL
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12
    }
})

export default CreateScreen
