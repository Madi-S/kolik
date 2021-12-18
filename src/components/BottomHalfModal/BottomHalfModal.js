import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import THEME from '../../theme'
import DefaultModalContent from './utils/DefaultModalContent'

const BottomHalfModal = ({
    title = 'Open',
    visible = false,
    children = null,
    openButtonStyle = {}
}) => {
    const [isVisible, setIsVisible] = useState(visible)

    const openModal = () => setIsVisible(true)
    const closeModal = () => setIsVisible(false)

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ ...styles.button, ...openButtonStyle }}
                onPress={openModal}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
            <Modal
                backdropOpacity={0.5}
                onBackdropPress={closeModal}
                isVisible={isVisible}
                useNativeDriver={false}
                onSwipeComplete={closeModal}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}
                hideModalContentWhileAnimating={true}
            >
                {children || <DefaultModalContent onPress={closeModal} />}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    button: {
        backgroundColor: THEME.PRIMARY_COLOR,
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: { color: 'white' }
})
export default BottomHalfModal
