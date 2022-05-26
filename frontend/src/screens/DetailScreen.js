import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Card } from 'react-native-elements'
import { ScrollView, StyleSheet } from 'rseact-native'

import { capitalize } from '../utils'
import { getPostImageRequest } from '../http'
import { FAButton } from '../components/core/button'

const DetailScreen = ({ navigation }) => {
    const post = useSelector(state => state.post.currentPost)

    // Request phone number when phoneNumberIsShown is true only once
    const [phoneNumberIsShown, setPhoneNumberIsShown] = useState(false)

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
