import React, { useState } from 'react'
import { Text, Card } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import { capitalize } from '../utils'
import { getPostImageRequest } from '../http'
import { FAButton } from '../components/core/button'
import { setCurrentPost } from '../redux/actions/post'

const DetailScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.post.currentPost)

    const [phoneNumberIsShown, setPhoneNumberIsShown] = useState(false)
    const _screenWidth = Dimensions.get('window').width

    const goBack = () => {
        navigation.navigate('Posts')
        dispatch(setCurrentPost(null))
    }

    const togglePhoneNumberIsShown = () => {
        phoneNumberIsShown
            ? setPhoneNumberIsShown(false)
            : setPhoneNumberIsShown(true)
    }

    const togglePhoneNumberTitle = phoneNumberIsShown
        ? 'HIDE PHONE NUMBER'
        : 'SHOW PHONE NUMBER'

    return (
        <ScrollView>
            <Card>
                <Card.Title>{post.title}</Card.Title>
                <Card.Divider />
                <Card.Image
                    source={{
                        uri: getPostImageRequest(post.id)
                    }}
                />
                <Text>Price: {post.price}</Text>
                <Text>Category: {capitalize(post.category)}</Text>
                <Text>Location: {capitalize(post.location)}</Text>
                <Text>Created at: {Date(post.createdAt)}</Text>
                <Text style={{ marginBottom: 10 }}>
                    Description: {post.description}
                </Text>
                <FAButton
                    style={styles.togglePhoneNumberButton}
                    onPress={togglePhoneNumberIsShown}
                    title={togglePhoneNumberTitle}
                />
                {phoneNumberIsShown ? (
                    <Text>Phone number: {post.phoneNumber}</Text>
                ) : null}
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    togglePhoneNumberButton: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    }
})

export default DetailScreen
