import React from 'react'
import { Button, Text, View } from 'react-native'

const DetailScreen = ({ navigation, post }) => {
    return (
        <View>
            <Button
                title='Back to profile'
                onPress={() => navigation.navigate('Profile')}
            />
            <View>
                <Text>Photo goes here {post.photo}</Text>
            </View>
            <View>
                <Text>Title: {post.title}</Text>
            </View>
            <View>
                <Text>Price: {post.price}</Text>
                <Text>Phone number: {post.phoneNumber}</Text>
                <Text>Category: {post.category}</Text>
                <Text>Location: {post.location}</Text>
                <Text>Created at: {Date(post.createdAt)}</Text>
            </View>
            <View>
                <Text>Description: {post.description}</Text>
            </View>
        </View>
    )
}

export default DetailScreen
