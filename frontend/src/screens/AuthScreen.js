import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { AppInput } from '../components/core/input'
import { AppButton } from '../components/core/button'
import { AppSelect } from '../components/core/select'
import { LOCATIONS } from '../data'
import { confirmPhoneNumberRequest, sendConfirmationCodeRequest } from '../http'

const AuthScreen = ({ navigation }) => {
    // After successful authentication navigation to 'Tabs'
    // navigation.navigate('Tabs')

    return (
        <View>
            <Auth0 />
            <Auth1 />
            <Auth2 />
        </View>
    )
}

// Do no requests, just save username and location for later user creation
const Auth0 = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState(LOCATIONS[0])

    const saveNameAndLocation = () => {}

    return (
        <View>
            <AppInput
                title='Enter your name'
                placeholder='John Doe'
                value={name}
                onChangeText={setName}
            />
            <AppSelect
                title='Location'
                selectedValue={location}
                onValueChange={setLocation}
                itemsList={LOCATIONS}
            />
            <AppButton onPress={saveNameAndLocation} />
        </View>
    )
}

// Enter phone number
const Auth1 = () => {
    const [phoneNumber, setPhoneNumber] = useState('')

    const onPress = async () => {
        const result = await sendConfirmationCodeRequest(phoneNumber)
        console.log('Result from Auth1:', result)
    }

    return (
        <View>
            <AppInput
                title='Enter your phone number:'
                placeholder='+7XXXXXXXXXX'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <AppButton onPress={onPress} />
        </View>
    )
}

// Enter confirmation code and username
const Auth2 = () => {
    // Save token, username and userId after user from response body

    const [confirmationCode, setConfirmationCode] = useState('2222')

    const onPress = async () => {
        const result = await confirmPhoneNumberRequest(confirmationCode, {
            name: 'Madi',
            phone: '+77784156666',
            location: 'all'
        })
        console.log('Result from Auth2:', result)
    }

    return (
        <View>
            <AppInput
                title='Enter your confirmation code'
                placeholder='XXXX'
                value={confirmationCode}
                onChangeText={setConfirmationCode}
            />
            <AppButton onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default AuthScreen
