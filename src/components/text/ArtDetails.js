import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ArtDetails = ({ artName, price, description }) => {
    return (
        <View style={styles.container}>
            <View style={ styles.header }>
                <Text style={[ styles.text, styles.artName ]}>{artName}</Text>
                <Text style={[ styles.text, styles.artPrice ]}>R{price}.00</Text>
            </View>

            <Text style={[ styles.text, styles.artDescription ]}>{description}</Text>
        </View>
    )
}

export default ArtDetails

const styles = StyleSheet.create({
    container: {
        // padding: 5,
        // paddingHorizontal: 10,
        // backgroundColor: 'red'
    },
    header: {
        padding: 10,
        gap: 5,
        // justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        color: '#151515'
    },
    artName: {
        fontSize: 20,
        fontWeight: 500,
    },
    artPrice: {
        fontSize: 34,
        fontWeight: 500
    },
    artDescription: {
        textAlign: 'center',
        fontSize: 14,
        padding: 5,
        // paddingTop: 0
    }
})


// The component used to show th details of the art on the art view screen, right before the dimensions