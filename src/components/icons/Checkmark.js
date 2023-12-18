import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Checkmark = ({ size }) => {
    return (
        <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/checkmark.png')} />
    )
}

export default Checkmark

const styles = StyleSheet.create({})