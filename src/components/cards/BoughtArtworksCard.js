import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BoughtArtworksThumbnail from '../images/BoughtArtworksThumbnail'

const BoughtArtworksCard = ({ uri, name, onPress, artId }) => {
    return (
        <TouchableOpacity style={{}} onPress={onPress}>
            <BoughtArtworksThumbnail uri={uri} />
            <Text style={ styles.text }>{name}</Text>
        </TouchableOpacity>
    )
}

export default BoughtArtworksCard

const styles = StyleSheet.create({
    text: {
        color: "#151515",
        fontSize: 14,
        fontWeight: '500',
        // left: 10,
        margin: 10
    }
})