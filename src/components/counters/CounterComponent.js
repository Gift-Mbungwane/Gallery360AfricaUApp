import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CounterComponent = ({ image, counter }) => {
    console.log({ counter });
  return (
    <View style={styles.container}>
      <Image style={styles.image } source={image}/>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  )
}

export default CounterComponent

const styles = StyleSheet.create({
    container: {
        height: 70,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5
    },
    image: {
        height: 24,
        width: 24
    },
    counter: {
        color: "#000000",
        fontSize: 11
    }
})