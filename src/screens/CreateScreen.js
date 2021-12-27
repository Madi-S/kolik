import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import PhotoPicker from '../components/PhotoPicker'
import { AppButton } from '../components/core/button'
import { AppInput } from '../components/core/input'
import { AppSelect } from '../components/core/select'
import { AppTextArea } from '../components/core/textarea'

import { LOCATIONS, CATEGORIES } from '../data'
import * as CONSTANTS from '../constants'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_CATEGORY = CATEGORIES[0].value

const CreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('+7')
    const [price, setPrice] = useState(0)
    const [location, setLocation] = useState(DEFAULT_LOCATION)
    const [category, setCategory] = useState(DEFAULT_CATEGORY)
    const [description, setDescription] = useState('')

    const processImage = img => {
        console.log(img)
    }

    const createPost = () => {
        const post = { title, phone, price, location, category, description }
        console.log('Creating post with data: ', post)
    }

    return (
        <View>
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

                <AppButton onPress={createPost} style={styles.createButton} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    createButton: {
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    }
})

export default CreateScreen
