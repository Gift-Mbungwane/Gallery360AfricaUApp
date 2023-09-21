import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const HeroImage = ({ uri }) => {
    console.log({ uri });
    return (

            <Image style={styles.image}  src={uri} />

    )
}

export default HeroImage

const styles = StyleSheet.create({
    image: {
        height: 67,
        width: 67,
        borderRadius: 67/2
    }
})