import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import THEME from '../theme'
import PostsScreen from '../screens/PostsScreen'
import CreateScreen from '../screens/CreateScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Posts'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tab, ...styles.shadow }
            }}
        >
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon focused={focused} iconName='person' />
                    )
                }}
            />
            <Tab.Screen
                name='Create'
                component={CreateScreen}
                options={{
                    // tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon focused={focused} iconName='add' />
                    ),
                    tabBarButton: props => <CustomCircleButton {...props} />
                }}
            />
            <Tab.Screen
                name='Posts'
                component={PostsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon focused={focused} iconName='search' />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const CustomTabIcon = ({ focused, iconName }) => {
    return (
        <Ionicons
            size={24}
            color={THEME.INFO_COLOR}
            name={focused ? iconName : `${iconName}-outline`}
        />
    )
}

const CustomCircleButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.center,
                ...styles.shadow
            }}
        >
            <View style={styles.circle}>{children}</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tab: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 70
    },
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    center: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: THEME.DANGER_COLOR
    }
})

export default Tabs
