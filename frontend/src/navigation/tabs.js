import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import THEME from '../theme'
import EditScreen from '../screens/EditScreen'
import PostsScreen from '../screens/PostsScreen'
import CreateScreen from '../screens/CreateScreen'
import DetailScreen from '../screens/DetailScreen'
import MyPostsScreen from '../screens/MyPostsScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

const TabsStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Tabs'>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name='Tabs'
                    component={Tabs}
                />
                <Stack.Screen name='Edit' component={EditScreen} />
                <Stack.Screen name='Detail' component={DetailScreen} />
                <Stack.Screen name='MyPosts' component={MyPostsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Tab = createBottomTabNavigator()

const Tabs = () => {
    const TabNavigatorScreenOptions = {
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab, ...styles.shadow }
    }

    const headerStyle = {
        backgroundColor: THEME.PRIMARY_COLOR
    }

    const headerTitleStyle = {
        color: '#fff'
    }

    return (
        <Tab.Navigator
            initialRouteName='Posts'
            screenOptions={TabNavigatorScreenOptions}
        >
            <Tab.Screen
                name='Posts'
                component={PostsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            focused={focused}
                            iconName='search'
                            color={THEME.INFO_COLOR}
                        />
                    ),
                    // headerShown: false,
                    // headerTransparent: true,
                    headerStyle,
                    headerTitleStyle
                }}
            />
            <Tab.Screen
                name='Create'
                component={CreateScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon focused={focused} iconName='add' />
                    ),
                    tabBarButton: props => <CustomCircleButton {...props} />,
                    headerStyle,
                    headerTitleStyle
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            focused={focused}
                            iconName='person'
                            color={THEME.INFO_COLOR}
                        />
                    ),
                    headerStyle,
                    headerTitleStyle
                }}
            />
        </Tab.Navigator>
    )
}

const CustomTabIcon = ({ focused, iconName, size = 24, color = '#fff' }) => {
    return (
        <Ionicons
            size={size}
            color={color}
            name={focused ? iconName : `${iconName}-outline`}
        />
    )
}

const CustomCircleButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
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

export default TabsStackNavigator
