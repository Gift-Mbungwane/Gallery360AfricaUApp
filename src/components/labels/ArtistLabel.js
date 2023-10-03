import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistLabel = ({ uri, name }) => {
  return (
    <View style={styles.labelCont}>
        <Image source={{ uri }} style={styles.image}/>
        <Text style={ styles.text }>ArtistLabel</Text>
    </View>
  )
}

export default ArtistLabel

const styles = StyleSheet.create({
    labelCont: {
        backgroundColor: "#EEEEEE",
        width: 106,
        height: 26,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        gap: 5
    },
    image: {
        height: 16,
        width: 16,
        borderRadius: 8
    },
    text: {
        color: "#474747",
        fontSize: 15,
        alignItems: 'center',
        lineHeight: 20,
        height: 20
    }
})