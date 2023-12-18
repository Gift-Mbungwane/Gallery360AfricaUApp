import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const MessageText = ({ size }) => {
    return (
        <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/message-text.png')} />
    )
}

export default MessageText

const styles = StyleSheet.create({})