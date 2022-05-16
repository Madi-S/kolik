import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Card } from 'react-native-elements'
import { ScrollView, StyleSheet } from 'react-native'

import { BASE_URL } from '../http'
import { capitalize } from '../utils'
import { FAButton } from '../components/core/button'
import PostForm from '../components/PostForm/PostForm'

/*
    Functionality:
        - Receive post parameter or take it from redux-selector
            cuz it will be dispatched in MyPostsScree

    UI:
        - PostForm with changed buttonText -> 'Edit' 
            and changed onPressHandler
*/

const MyDetailScreen = ({ navigation }) => {
    const post = useSelector(state => state.post.currentPost)


    return <PostForm />

    // return (
    //     <ScrollView>
    //         <Card>
    //             <Card.Title>
    //                 Activated: {post.activated ? 'Yes' : 'No'}
    //             </Card.Title>
    //             <Card.Title>Your Post: {post.title}</Card.Title>
    //             <Card.Divider />
    //             <Card.Image
    //                 source={{
    //                     uri: `${BASE_URL}/post/image/${parseInt(post.id)}`
    //                 }}
    //             />
    //             <Text>Price: {post.price}</Text>
    //             <Text>Category: {capitalize(post.category)}</Text>
    //             <Text>Location: {capitalize(post.location)}</Text>
    //             <Text>Created at: {Date(post.createdAt)}</Text>
    //             <Text style={{ marginBottom: 10 }}>
    //                 Description: {post.description}
    //             </Text>
    //             <FAButton
    //                 style={styles.togglePhoneNumberButton}
    //                 onPress={togglePhoneNumberIsShown}
    //                 title={togglePhoneNumberTitle}
    //             />
    //             {phoneNumberIsShown ? (
    //                 <Text>Phone number: {post.phoneNumber}</Text>
    //             ) : null}
    //         </Card>
    //     </ScrollView>
    // )
}

const styles = StyleSheet.create({
    togglePhoneNumberButton: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    }
})

export default MyDetailScreen
