import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LoaderImage from '../../assets/components/LoaderImage'

const HeroImage = ({ uri, onPress, size }) => {
    // console.log({ uri });
    return (
        // <TouchableOpacity onPress={onPress}>
        <LoaderImage uri={uri} style={[ styles.image, size && { height: size, width: size } ]} />
            // <Image style={[ styles.image, size && { height: size, width: size } ]} {uri} src={uri} />
        // </TouchableOpacity>
    )
}

export default HeroImage

const styles = StyleSheet.create({
    image: {
        height: 67,
        width: 67,
        borderRadius: 67 / 2
    }
})