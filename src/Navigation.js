import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import THEME from './theme'
import FeedScreen from './screens/FeedScreen'
import ProfileScreen from './screens/ProfileScreen'

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor:
            Platform.OS === 'android' ? THEME.PRIMARY_COLOR : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : THEME.SECONDARY_COLOR
}

const FeedNavigator = createStackNavigator(
    { Feed: FeedScreen },
    { initialRouteName: 'Feed', defaultNavigationOptions }
)

const Profileavigator = createStackNavigator(
    { Profile: ProfileScreen },
    { initialRouteName: 'Profile', defaultNavigationOptions }
)

const bottomTabsConfig = {
    Feed: {
        screen: FeedNavigator,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: info => (
                <Ionicons name='ios-albums' color={info.tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Profileavigator,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: info => (
                <Ionicons name='ios-star' color={info.tintColor} size={24} />
            )
        }
    }
}

const bottomNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(bottomTabsConfig, {
              activeTintColor: 'white',
              shifting: true,
              barStyle: {
                  backgroundColor: THEME.PRIMARY_COLOR
              }
          })
        : createBottomTabNavigator(bottomTabsConfig, {
              tabBarOptions: {
                  activeTintColor: THEME.PRIMARY_COLOR
              }
          })

export const AppNavigation = createAppContainer(bottomNavigator)
