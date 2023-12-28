import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Notifications = ({ size }) => {
    return (
        <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/notifications.png')} />
    )
}

export default Notifications

const styles = StyleSheet.create({})