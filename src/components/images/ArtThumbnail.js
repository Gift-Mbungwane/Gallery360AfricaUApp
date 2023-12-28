import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'

const ArtThumbnail = ({ uri, price, showPrice, style = null }) => {
    // console.log({showPrice});
    const [showLoader, setShowLoader] = useState(true)
    return (
        <ImageBackground onLoad={() => setShowLoader(false)} style={[styles.image, style && style]} imageStyle={{ borderRadius: 20 }} source={{ uri }} >
            {
                showLoader && <View style={[styles.image, { position: 'absolute', top: '0', backgroundColor: 'rgb(150, 150, 150)', justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>
            }
            {
                showPrice && (
                    <View style={styles.priceCont}>
                        <Text style={styles.text}>R {parseFloat(price).toFixed(2)}</Text>
                    </View>
                )
            }
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
        height: 25,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 7
    },
    text: {
        color: "#151515",
        fontSize: 14,
        // backgroundColor: 'red'
    }
})