import React from 'react'
import { StyleSheet, View, Image, TouchableOpcaity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FeedScreen from './screens/FeedScreen'
import ProfileScreen from './screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Profile' component={ProfileScreen} />
            <Tab.Screen name='Feed' component={FeedScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs
