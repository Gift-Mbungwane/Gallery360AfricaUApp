import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const CounterComponent = ({ image, counter, onPress, size }) => {
  console.log({ counter });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        { image }
      </TouchableOpacity>
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