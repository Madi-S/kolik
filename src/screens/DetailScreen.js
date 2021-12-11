import React, { useState } from 'react'
// import { AntDesign } from '@expo/vector-icons'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Text, Card, Button } from 'react-native-elements'

import * as CONSTANTS from '../constants'

const DetailScreen = ({ navigation, post }) => {
    const [phoneNumberIsShown, setPhoneNumberIsShown] = useState(false)
    const screenWidth = Dimensions.get('window').width

    console.log('Rendered DetailScreen')

    return (
        <ScrollView
            style={{
                marginBottom: CONSTANTS.SCROLL_VIEW_MARGIN_BOTTOM
            }}
        >
            {/* <AntDesign
                name='back'
                size={24}
                color='black'
                // onPress={() => navigation.navigate('Profile')}
            /> */}
            <Card>
                <Card.Title>{post.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: post.img }} />
                <Text>
                    The idea with React Native Elements is more about component
                    structure than actual design.
                </Text>
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
