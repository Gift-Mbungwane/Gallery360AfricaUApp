import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Settings = ({ size }) => {
    return (
        <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/settings.png')} />
    )
}

export default Settings

const styles = StyleSheet.create({})