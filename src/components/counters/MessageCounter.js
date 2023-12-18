import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'
import { MessageText } from '../icons'

const MessageCounter = ({ counter, onPress }) => {
  return (
    <CounterComponent
        image={<MessageText size={ 24 } /> }
        counter={counter}
        onPress={onPress}
    />
  )
}

export default MessageCounter

const styles = StyleSheet.create({})