import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'

const MessageCounter = ({ counter }) => {
  return (
    <CounterComponent
        image={require('../../../assets/icons/message-text.png')}
        counter={counter}
    />
  )
}

export default MessageCounter

const styles = StyleSheet.create({})