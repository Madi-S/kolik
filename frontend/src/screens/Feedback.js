import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import THEME from '../theme'
import { sendFeedbackRequest } from '../http'
import { AppButton } from '../components/core/button'
import { AppTextArea } from '../components/core/textarea'

const Feedback = () => {
    const [feedbackValue, setFeedbackValue] = useState('')

    return (
        <View style={styles.wrapper}>
            <AppTextArea
                title='Recommendations:'
                value={feedbackValue}
                onChangeText={setFeedbackValue}
                placeholder='Great application but ...'
                textAreaStyle={{ width: 300 }}
                numberOfLines={3}
            />
            <AppButton title='Send feedback' onPress={sendFeedbackRequest} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 30,
        alignItems: 'center'
    }
})

export default Feedback
