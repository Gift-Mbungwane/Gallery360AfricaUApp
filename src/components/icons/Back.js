import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Back = ({ size }) => {
  return (
    <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/back.png')} />
  )
}

export default Back

const styles = StyleSheet.create({})