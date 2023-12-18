import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArtInfo from './ArtInfo'
import { useState } from 'react'

const ArtInfoCard = ({ dimensions, condition, available }) => {
  console.log({ dimensions });
  const [processedDimensions, setProcessedDimensions] = useState(null)
  const processDimensions = () => {
    
  }
  if(!dimensions || !dimensions.height) return null
  return (
    <View style={styles.container}>
      <ArtInfo title={ 'Dimensions' } text={ `${dimensions.height}cm x ${dimensions.width}cm ${dimensions.depth ? 'x ' + dimensions.depth + 'cm' : ''}` }/>
      <View style={ styles.line }/>
      <ArtInfo title={ 'Condition' } text={ condition } />
      <View style={ styles.line }/>
      <ArtInfo title={ 'Available' } text={ available ? 'Yes' : 'No' } />
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
        // paddingHorizontal: 15
        // backgroundColor: 'red'
    },
    line: {
        // width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 0.4,
        height: 44
    }
})