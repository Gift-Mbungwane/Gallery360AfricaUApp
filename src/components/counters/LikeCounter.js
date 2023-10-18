import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'

const LikeCounter = () => {
    return (
        <CounterComponent
            image={require('../../../assets/icons/heart.png')}
            counter={12}
        />
      )
}

export default LikeCounter

const styles = StyleSheet.create({})