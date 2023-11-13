import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ArtThumbnail from '../images/ArtThumbnail'
import ArtistLabel from '../labels/ArtistLabel'

const ArtistArtworksCard = ({ showPrice, artistName, artName, artUri, artistPic, price, imageUID, onPress }) => {
    // console.log({ showPrice, artistName, artName, artUri, artistPic, price, imageUID, onPress });
    const uri="https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => { console.log('image pressed: ', imageUID); onPress(imageUID)}}>
            <ArtThumbnail
                price={price}
                showPrice={ showPrice ?? true }
                uri={artUri}
            />
            <View style={styles.textContainer}>
                <Text style={styles.artName}>{artName}</Text>
                <ArtistLabel name={artistName} uri={artistPic} />
            </View>
        </TouchableOpacity>
    )
}

export default ArtistArtworksCard

const styles = StyleSheet.create({
    container: {
        // gap: 5,
        // alignItems: 'center'
    },
    textContainer: {
        padding: 10,
        gap: 5
    },
    artName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#151515'
    }
})


// This is the card that displays more artworks by the artist. Currently only used on the artist profile screen.