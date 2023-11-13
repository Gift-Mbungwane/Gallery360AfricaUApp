import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'

const LikeCounter = ({ counter }) => {
    return (
        <CounterComponent
            image={require('../../../assets/icons/heart.png')}
            counter={counter}
        />
      )
}

export default LikeCounter

const styles = StyleSheet.create({})