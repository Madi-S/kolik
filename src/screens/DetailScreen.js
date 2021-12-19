import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Card, Button } from 'react-native-elements'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import * as CONSTANTS from '../constants'
import { setCurrentPost } from '../redux/actions/post'

const DetailScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.post.currentPost)

    const [phoneNumberIsShown, setPhoneNumberIsShown] = useState(false)
    const _screenWidth = Dimensions.get('window').width

    const goBack = () => {
        /* 
        Set currentPost to falsy value so that PostsScreen will not return this component
        */
        navigation.navigate('Posts')
        dispatch(setCurrentPost(null))
    }

    return (
        <ScrollView
            style={{
                marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
            }}
        >
            <Button title='Back' onPress={goBack} />
            <Card>
                <Card.Title>{post.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: post.img }} />
                <Text>Price: {post.price}</Text>
                <Text>Category: {post.category}</Text>
                <Text>Location: {post.location}</Text>
                <Text>Created at: {Date(post.createdAt)}</Text>
                <Text style={{ marginBottom: 10 }}>
                    Description: {post.description}
                </Text>
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => {
                        phoneNumberIsShown
                            ? setPhoneNumberIsShown(false)
                            : setPhoneNumberIsShown(true)
                    }}
                    title={
                        phoneNumberIsShown
                            ? 'HIDE PHONE NUMBER'
                            : 'SHOW PHONE NUMBER'
                    }
                />
                {phoneNumberIsShown ? (
                    <Text>Phone number: {post.phoneNumber}</Text>
                ) : null}
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DetailScreen
