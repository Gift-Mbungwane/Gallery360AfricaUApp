import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const ArtThumbnail = ({ uri, price }) => {
    return (
        <ImageBackground style={styles.image}  imageStyle={{ borderRadius: 20 }} source={{ uri }} >
            <View style={ styles.priceCont }>
                <Text style={ styles.text }>R { price }</Text>
            </View>
        </ImageBackground>
    )
}

export default ArtThumbnail

const styles = StyleSheet.create({
    image: {
        borderRadius: 20,
        height: 148,
        width: 148,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
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