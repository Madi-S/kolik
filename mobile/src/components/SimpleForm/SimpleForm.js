import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppInput } from '../core/input'
import { AppButton } from '../core/button'

const SimpleForm = ({
    title,
    onPress,
    placeholder,
    value,
    onChangeValue,
    children
}) => {
    return (
        <View style={styles.wrapper}>
            <AppInput
                title={title}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeValue}
            />
            {children}
            <AppButton onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: '50%',
        marginHorizontal: 20
    }
})

export default SimpleForm
