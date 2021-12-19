import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Card, Button } from 'react-native-elements'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

import { setCurrentPost } from '../redux/actions/post'

const DetailScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const post = state.post.currentPost

    console.log('!!! STATE', state)

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
        <ScrollView>
            <Button title='Back' onPress={goBack} />
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

const styles = StyleSheet.create({})

export default DetailScreen
