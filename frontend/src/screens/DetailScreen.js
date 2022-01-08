import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Card } from 'react-native-elements'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import { setCurrentPost } from '../redux/actions/post'
import { FAButton } from '../components/core/button'

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
                <Card.Image source={{ uri: post.img }} />
                <Text>Price: {post.price}</Text>
                <Text>Category: {post.category.label}</Text>
                <Text>Location: {post.location.label}</Text>
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
