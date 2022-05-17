import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import PhotoPicker from '../PhotoPicker'
import { AppInput } from '../core/input'
import { AppSelect } from '../core/select'
import { AppButton } from '../core/button'
import { AppTextArea } from '../core/textarea'

import THEME from '../../theme'
import { BASE_URL } from '../../http'
import * as CONSTANTS from '../../constants'
import { LOCATIONS, CATEGORIES } from '../../data'

const DEFAULT_LOCATION = LOCATIONS[0].value
const DEFAULT_CATEGORY = CATEGORIES[0].value

const PostForm = ({
    children,
    label = '',
    buttonTitle = 'Create',
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
    const _imageUri =
        postState.imageUri || `${BASE_URL}/post/image/${postState.id}`

    const [title, setTitle] = useState(postState.title)
    const [price, setPrice] = useState(postState.price.toString())
    const [imageUri, setImageUri] = useState(_imageUri)
    const [location, setLocation] = useState(postState.location)
    const [category, setCategory] = useState(postState.category)
    const [description, setDescription] = useState(postState.description)

    const onPostSubmit = async () => {
        const post = {
            title: title.trim(),
            location: location.trim(),
            category: category.trim(),
            description: description.trim(),
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
                            title={buttonTitle}
                            onPress={onPostSubmit}
                            style={styles.submitButton}
                        />
                    </View>
                    {children}
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
    submitButton: {
        borderRadius: 25,
        backgroundColor: THEME.DANGER_COLOR,
        marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM / 2
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PostForm
