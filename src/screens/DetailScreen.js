import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import {
    Text,
    Card,
    Icon,
    Image,
    Button,
    ListItem
} from 'react-native-elements'

import { SCROLL_VIEW_MARGIN_BOTTOM } from '../config'

const DetailScreen = ({ navigation, post }) => {
    const screenWidth = Dimensions.get('window').width

    return (
        <ScrollView style={{ marginBottom: SCROLL_VIEW_MARGIN_BOTTOM }}>
            <Button
                title='Back to profile'
                onPress={() => navigation.navigate('Profile')}
            />
            <Card>
                <Card.Title>{post.title}</Card.Title>
                <Card.Divider />
                <Card.Image
                    source={{ uri: post.img }}
                    style={{
                        width: screenWidth,
                        height: 200,
                        marginBottom: 20
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text>
                    The idea with React Native Elements is more about component
                    structure than actual design.
                </Text>
                <Text>Price: {post.price}</Text>
                <Text>Phone number: {post.phoneNumber}</Text>
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
                    title='VIEW NOW'
                />
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
