import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ArtInfo = ({ title, text }) => {
  return (
    <View style={ styles.container }>
        <Text style={styles.title}>{ title }</Text>
        <Text style={styles.content}>{ text ?? 'N/A' }</Text>
    </View>
  )
}

export default ArtInfo

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
        
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 10,
        color: '#000000',
        letterSpacing: 1
    },
    content: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 1
    }
})