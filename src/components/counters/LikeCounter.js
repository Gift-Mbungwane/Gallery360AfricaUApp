import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'
import { Heart } from '../icons'

const LikeCounter = ({ counter, updateLikes, userLikes }) => {
    return (
        <CounterComponent
            image={ <Heart size={ 24 } userLikes={userLikes} /> }
            counter={counter}
            onPress={updateLikes}
        />
      )
}

export default LikeCounter

const styles = StyleSheet.create({})