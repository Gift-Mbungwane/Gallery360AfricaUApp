import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Person = ({ size }) => {
    return (
        <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/person.png')} />
    )
}

export default Person

const styles = StyleSheet.create({})