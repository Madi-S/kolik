import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { AppButton } from '../components/core/button'
import { AppInput } from '../components/core/input'

const AuthScreen = ({ navigation }) => {
    return <Auth1 />
}

// Enter phone number
const Auth1 = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    return (
        <View>
            <AppInput
                title='Enter your phone number:'
                placeholder='+7XXXXXXXXXX'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <AppButton />
        </View>
    )
}

// Enter confirmation code
const Auth2 = () => {
    const [confirmationCode, setConfirmationCode] = useState('')
    return (
        <View>
            <AppInput
                title='Enter your confirmation code'
                placeholder='XXXX'
                value={confirmationCode}
                onChangeText={setConfirmationCode}
            />
            <AppButton />
        </View>
    )
}

// Enter user name (if user does not exist in the database)
const Auth3 = () => {
    // Save token, username and userId after user from response body
    const [name, setName] = useState('')
    return (
        <View>
            <Text>Enter your </Text>
            <AppInput
                title='Enter your name'
                placeholder='John Doe'
                value={name}
                onChangeText={setName}
            />
            <AppButton />
        </View>
    )
}

const styles = StyleSheet.create({})

export default AuthScreen
