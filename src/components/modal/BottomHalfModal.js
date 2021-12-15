import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Button } from 'react-native'

import DefaultModalContent from './utils/DefaultModalContent'

const BottomHalfModal = props => {
    const [isVisible, setIsVisible] = useState(props.visible)

    const openModal = () => setIsVisible(true)
    const closeModal = () => setIsVisible(false)

    return (
            <View style={styles.wrapper}>
                <Button
                    testID={'modal-open-button'}
                    onPress={openModal}
                    title='Open'
                />
                <Modal
                    testID={'modal'}
                    backdropOpacity={0.5}
                    onBackdropPress={closeModal}
                    isVisible={isVisible}
                    useNativeDriver={false}
                    onSwipeComplete={closeModal}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.view}
                    hideModalContentWhileAnimating={true}
                >
                    {props.children || <DefaultModalContent onPress={closeModal} />}
                </Modal>
            </View>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default BottomHalfModal
