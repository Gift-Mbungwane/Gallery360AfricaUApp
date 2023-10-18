import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'

const MessageCounter = ({ number }) => {
  return (
    <CounterComponent
        image={require('../../../assets/icons/message-text.png')}
        counter={12}
    />
  )
}

export default MessageCounter

const styles = StyleSheet.create({})