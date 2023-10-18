import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArtInfo from './ArtInfo'

const ArtInfoCard = () => {
  return (
    <View style={styles.container}>
      <ArtInfo title={ 'Dimensions' } text={ '30cm x 30cm x 30cm' }/>
      <View style={ styles.line }/>
      <ArtInfo title={ 'Condition' } text={ 'Excellent' } />
      <View style={ styles.line }/>
      <ArtInfo title={ 'Available' } text={ 'Yes' } />
    </View>
  )
}

export default ArtInfoCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        gap: 10,
        // backgroundColor: 'red'
    },
    line: {
        // width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 0.4,
        height: 44
    }
})