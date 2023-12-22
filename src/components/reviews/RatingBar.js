import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RatingBar = ({ label, ratio }) => {
  console.log({ label: ratio });
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { flex: ratio }]} />
      </View>
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
  barContainer: {
    backgroundColor: 'rgb(200,200,200)',
    height: 4,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 2
  },
  bar: {
    backgroundColor: 'black',
    height: 4,
    borderRadius: 2
  }
})