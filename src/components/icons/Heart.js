import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Heart = ({ size, userLikes }) => {
    console.log({ userLikes });
    return (
        <Image style={[{ height: size, width: size }, userLikes && { tintColor: 'rgb(255, 50, 50)' } ]} source={require('../../../assets/icons/heart.png')} />
    )
}

export default Heart

const styles = StyleSheet.create({})