import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RatingBar = ({ rating }) => {
  return (
    <View style={styles.container}>
      <Text>{rating}</Text>
      <View style={[styles.bar, { flex: 1 }]}/>
    </View>
  )
}

export default RatingBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center'
    },
    bar: {
        backgroundColor: 'black',
        height: 4
    }
})