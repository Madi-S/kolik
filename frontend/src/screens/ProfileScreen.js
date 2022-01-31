import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
// import { Switch } from 'react-native-elemnts'

import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'

const ProfileScreen = ({ navigation }) => {
    const toggleSwitch = () => {}
    return (
        <View>
            <View style={styles.userbar}></View>
            <View style={styles.switches}>
                <View style={styles.switch}>
                    <Text>Notifications</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.switch}>
                    <Text>Dark Theme</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={styles.about}>
                <AppButton
                    onPress={() => {
                        navigation.navigate('about')
                    }}
                />
            </View>
            <View style={styles.feedback}>
                <AppTextArea />
                <AppButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userbar: {},
    switches: {},
    switch: {},
    about: {},
    feedback: {}
})

export default ProfileScreen
