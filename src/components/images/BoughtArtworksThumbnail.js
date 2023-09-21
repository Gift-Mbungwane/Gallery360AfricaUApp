import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const BoughtArtworksThumbnail = ({ uri }) => {
  return (
    <Image style={styles.image} source={{ uri }}>

</Image>
  )
}

export default BoughtArtworksThumbnail

const styles = StyleSheet.create({
    image: {
        borderRadius: 20,
        height: 66,
        width: 151,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        // resizeMode: 'contain'
    },
    priceCont: {
        width: 69,
        height: 25,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    text: {
        color: "#151515",
        fontSize: 12
    }
})