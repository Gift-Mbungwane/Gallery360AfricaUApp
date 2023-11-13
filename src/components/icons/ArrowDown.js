import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const ArrowDown = ({ size, rotate }) => {
  return (
    <Image style={[{ height: size, width: size }, rotate && { transform: [{ rotateX: '180deg' }]}]} source={require('../../../assets/icons/arrow-down.png')} />
  )
}

export default ArrowDown

const styles = StyleSheet.create({})