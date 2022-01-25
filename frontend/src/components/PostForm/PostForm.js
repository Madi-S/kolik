import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import PhotoPicker from '../PhotoPicker'
import { AppInput } from '../core/input'
import { AppSelect } from '../core/select'
import { AppButton } from '../core/button'
import { AppTextArea } from '../core/textarea'

import THEME from '../../theme'
import { USER_ID } from '../../auth'
import * as CONSTANTS from '../../constants'
import { LOCATIONS, CATEGORIES } from '../../data'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_CATEGORY = CATEGORIES[0].value

const PostForm = ({
    label = '',
    onSubmit = async (post, imageUri) =>
        console.log('Post submitted:', post, imageUri),
    postState = {
        title: '',
        price: '0',
        imageUri: null,
        description: '',
        location: DEFAULT_LOCATION,
        category: DEFAULT_CATEGORY
    },
    titleStyle = {},
    containerStyle = {}
}) => {
    const [title, setTitle] = useState(postState.title)
    const [price, setPrice] = useState(postState.price.toString())
    const [imageUri, setImageUri] = useState(postState.imageUri)
    const [location, setLocation] = useState(postState.location)
    const [category, setCategory] = useState(postState.category)
    const [description, setDescription] = useState(postState.description)

    const onPostSubmit = async () => {
        const post = {
            title,
            location,
            category,
            description,
            userId: USER_ID,
            price: parseInt(price)
        }
        await onSubmit(post, imageUri)
    }

    const onImagePick = img => setImageUri(img.uri)

    return (
        <View>
            <Text style={{ ...styles.title, ...titleStyle }}>{label}</Text>
            <ScrollView>
                <View style={{ ...styles.container, ...containerStyle }}>
                    <View style={styles.center}>
                        <PhotoPicker
                            uri={imageUri}
                            onPick={onImagePick}
                            buttonStyle={styles.photoPickerButton}
                        />
                    </View>
                    <AppInput
                        title='Title'
                        value={title}
                        onChangeText={setTitle}
                    />
                    <AppInput
                        title='Price'
                        keyboardType='numeric'
                        value={price}
                        onChangeText={setPrice}
                    />
                    <AppSelect
                        title='Location'
                        selectedValue={location}
                        onValueChange={setLocation}
                        itemsList={LOCATIONS}
                    />
                    <AppSelect
                        title='Category'
                        selectedValue={category}
                        onValueChange={setCategory}
                        itemsList={CATEGORIES}
                    />
                    <AppTextArea
                        title='Description'
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={styles.center}>
                        <AppButton
                            title='Create'
                            onPress={onPostSubmit}
                            style={styles.createButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: CONSTANTS.DEFAULT_MARGIN_HORIZONTAL
    },
    photoPickerButton: {
        borderRadius: 25,
        backgroundColor: THEME.DANGER_COLOR
    },
    createButton: {
        borderRadius: 25,
        backgroundColor: THEME.DANGER_COLOR,
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PostForm
