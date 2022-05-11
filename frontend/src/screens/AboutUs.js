import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import THEME from '../theme'
import BottomHalfModal from '../components/BottomHalfModal'
import { AppButton } from '../components/core/button'

const AboutUs = () => {
    const [showAboutUsModal, setShowAboutUsModal] = useState(false)

    const openAboutUsModal = () => {
        setShowAboutUsModal(true)
    }

    return (
        <>
            <View style={styles.wrapper}>
                <AppButton onPress={openAboutUsModal} title='About Us' />
            </View>

            <AboutUsModal
                showModal={showAboutUsModal}
                setShowModal={setShowAboutUsModal}
            />
        </>
    )
}

const AboutUsModal = ({ showModal, setShowModal }) => {
    return (
        <BottomHalfModal
            showButton={false}
            isVisible={showModal}
            setIsVisible={setShowModal}
        >
            <View style={styles.modalWrapper}>
                <Text style={styles.modalContentTitle}>About Us</Text>
                <Text style={styles.modalContentText}>
                    Kolik - a web application for loaning vehicles.
                </Text>
                <Text style={styles.modalContentText}>
                    Created by Shaiken "floppy" Madi.
                </Text>
                <Text style={styles.modalContentText}>
                    All Rights Reserved 2021-2022.
                </Text>
            </View>
        </BottomHalfModal>
    )
}

const styles = StyleSheet.create({
    wrapper: {},
    modalWrapper: {
        backgroundColor: 'white',
        padding: 22,
        marginHorizontal: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalContentTitle: {
        fontSize: 26,
        marginBottom: 8,
        fontWeight: 'bold',
        color: THEME.DARKEN_PRIMARY_COLOR
    },
    modalContentText: {
        fontSize: 24,
        fontWeight: '600',
        color: THEME.PRIMARY_COLOR
    }
})

export default AboutUs
