import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Comment = ({ size }) => {
  return (
    <Image style={{ height: size, width: size }} source={require('../../../assets/icons/message-text.png')} />
  )
}

export default Comment

const styles = StyleSheet.create({})