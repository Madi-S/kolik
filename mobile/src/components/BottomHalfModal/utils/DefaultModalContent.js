import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const DefaultModalContent = ({ onPress }) => (
    <View style={styles.content}>
        <Text style={styles.contentTitle}>Hi 👋!</Text>
        <Button onPress={onPress} title='Close' />
    </View>
)

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12
    }
})

export default DefaultModalContent
