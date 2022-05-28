import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { LOCATIONS } from '../data'
import { AppInput } from '../components/core/input'
import { AppButton } from '../components/core/button'
import { AppSelect } from '../components/core/select'
import { getToken, getUserId, setToken, setUserId } from '../auth'
import { confirmPhoneNumberRequest, sendConfirmationCodeRequest } from '../http'

const AuthScreen = ({ navigation }) => {
    if (getToken() && getUserId()) {
        console.log(getUserId(), getToken())
        navigation.navigate('Tabs')
        return <Text>Hello World</Text>
    } else {
        const [pageNumber, setPageNumber] = useState(0)

        const [name, setName] = useState('')
        const [phoneNumber, setPhoneNumber] = useState('+7')
        const [location, setLocation] = useState(LOCATIONS[0])

        if (pageNumber === 0) {
            const onPress = () => {
                setPageNumber(1)
            }

            return (
                <Auth0
                    onPress={onPress}
                    name={name}
                    setName={setName}
                    location={location}
                    setLocation={setLocation}
                />
            )
        } else if (pageNumber === 1) {
            const onPress = () => {
                setPageNumber(2)
            }

            return (
                <Auth1
                    onPress={onPress}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                />
            )
        } else if (pageNumber === 2) {
            const onSuccess = json => {
                setToken(json.token)
                setUserId(json.id)
                navigation.navigate('Tabs')
            }

            return (
                <Auth2
                    name={name}
                    phone={phoneNumber}
                    location={location.value}
                    onSuccess={onSuccess}
                />
            )
        } else {
            return <Text>Error occurred</Text>
        }
    }
}

// Do no requests, just save username and location for later user creation
const Auth0 = ({ onPress, name, setName, location, setLocation }) => {
    const pressHanlder = () => {
        onPress()
    }

    return (
        <View style={styles.wrapper}>
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
            <AppButton onPress={pressHanlder} />
        </View>
    )
}

// Enter phone number
const Auth1 = ({ onPress, phoneNumber, setPhoneNumber }) => {
    const pressHandler = async () => {
        onPress()
        const result = await sendConfirmationCodeRequest(phoneNumber)
        console.log('Result from Auth1:', result)
    }

    return (
        <View style={styles.wrapper}>
            <AppInput
                title='Enter your phone number:'
                placeholder='+7XXXXXXXXXX'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <AppButton onPress={pressHandler} />
        </View>
    )
}

// Enter confirmation code and username
const Auth2 = ({ onSuccess = json => {}, name, location, phone }) => {
    // Save token, username and userId after user from response body

    const [confirmationCode, setConfirmationCode] = useState('2222')

    const pressHandler = async () => {
        const result = await confirmPhoneNumberRequest(confirmationCode, {
            name,
            phone,
            location
        })
        if (result.token) {
            onSuccess(result)
        }
        console.log('Result from Auth2:', result)
    }

    return (
        <View style={styles.wrapper}>
            <AppInput
                title='Enter your confirmation code'
                placeholder='XXXX'
                value={confirmationCode}
                onChangeText={setConfirmationCode}
            />
            <AppButton onPress={pressHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: '50%',
        marginHorizontal: 20
    }
})

export default AuthScreen
