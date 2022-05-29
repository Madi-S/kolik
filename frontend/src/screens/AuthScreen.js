import React, { useState } from 'react'
import { Text } from 'react-native'

import { LOCATIONS } from '../data'
import { AppSelect } from '../components/core/select'
import SimpleForm from '../components/SimpleForm/SimpleForm'
import { getToken, getUserId, setToken, setUserId } from '../auth'
import { confirmPhoneNumberRequest, sendConfirmationCodeRequest } from '../http'

const AuthScreen = ({ navigation }) => {
    if (getToken() && getUserId()) {
        navigation.navigate('Tabs')
        return <Text>Navigating to Tabs ...</Text>
    } else {
        const [pageNumber, setPageNumber] = useState(0)

        const [name, setName] = useState('')
        const [phoneNumber, setPhoneNumber] = useState('+7')
        const [location, setLocation] = useState(LOCATIONS[0])
        const [confirmationCode, setConfirmationCode] = useState('2222')

        if (pageNumber === 0) {
            const onPress = () => {
                setPageNumber(1)
            }

            return (
                <SimpleForm
                    title='Enter your name'
                    placeholder='John Doe'
                    value={name}
                    onPress={onPress}
                    onChangeValue={setName}
                >
                    <AppSelect
                        title='Location'
                        selectedValue={location}
                        onValueChange={setLocation}
                        itemsList={LOCATIONS}
                    />
                </SimpleForm>
            )
        } else if (pageNumber === 1) {
            const onPress = async () => {
                setPageNumber(2)
                const result = await sendConfirmationCodeRequest(phoneNumber)
                console.log('Result from Auth1:', result)
            }

            return (
                <SimpleForm
                    title='Enter your phone number:'
                    placeholder='+7XXXXXXXXXX'
                    value={phoneNumber}
                    onChangeValue={setPhoneNumber}
                    onPress={onPress}
                />
            )
        } else if (pageNumber === 2) {
            const onPress = async json => {
                const result = await confirmPhoneNumberRequest(
                    confirmationCode,
                    { name, phone, location }
                )
                if (result.token) {
                    setUserId(json.id)
                    setToken(json.token)
                    navigation.navigate('Tabs')
                } else {
                    setPageNumber(0)
                }
            }

            return (
                <SimpleForm
                    title='Enter your confirmation code'
                    placeholder='XXXX'
                    value={confirmationCode}
                    onChangeValue={setConfirmationCode}
                    onPress={onPress}
                />
            )
        } else {
            return <Text>Error occurred</Text>
        }
    }
}

export default AuthScreen
