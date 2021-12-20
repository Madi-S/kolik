import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View } from 'react-native'

import { AppButton } from '../core/buttons'
import DefaultModalContent from './utils/DefaultModalContent'

const BottomHalfModal = ({
    title = '',
    openButtonStyle = {},
    visible = false,
    children = <DefaultModalContent onPress={closeModal} />
}) => {
    const [isVisible, setIsVisible] = useState(visible)

    const openModal = () => setIsVisible(true)
    const closeModal = () => setIsVisible(false)

    return (
        <View style={styles.wrapper}>
            <AppButton
                title={title}
                onPress={openModal}
                style={openButtonStyle}
            />
            <Modal
                backdropOpacity={0.5}
                isVisible={isVisible}
                useNativeDriver={false}
                hideModalContentWhileAnimating={true}
                onBackdropPress={closeModal}
                onSwipeComplete={closeModal}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}
            >
                {children}
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
    }
})

export default BottomHalfModal
