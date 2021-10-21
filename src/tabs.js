import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import THEME from './theme'
import PostsScreen from './screens/PostsScreen'
import CreateScreen from './screens/CreateScreen'
import ProfileScreen from './screens/ProfileScreen'

// const Tab = createMaterialBottomTabNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Posts'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
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
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, onPress }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={30}
                            color={THEME.INFO_COLOR}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Create'
                component={CreateScreen}
                options={{
                    // tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'add' : 'add-outline'}
                            size={24}
                            color='white'
                        />
                    ),
                    tabBarButton: props => <CustomCircleButton {...props} />
                }}
            />
            <Tab.Screen
                name='Posts'
                component={PostsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            size={24}
                            color={THEME.INFO_COLOR}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const CustomCircleButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
        >
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: THEME.DANGER_COLOR
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
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
