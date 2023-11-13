import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistLabel = ({ uri, name }) => {
    return (
        <View style={{ flex: 0, alignItems: 'flex-start'}}>
            <View style={styles.labelCont}>
                <Image source={{ uri }} style={styles.image} />
                <Text style={styles.text}>{name}</Text>
            </View>
        </View>

    )
}

export default ArtistLabel

const styles = StyleSheet.create({
    labelCont: {
        // flex: 1,
        backgroundColor: "#EEEEEE",
        // width: 106,
        height: 26,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        gap: 5,
        paddingRight: 10
    },
    image: {
        height: 16,
        width: 16,
        borderRadius: 8
    },
    text: {
        padding: 1,
        color: "#474747",
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 1,
        lineHeight: 12,
        textAlignVertical: 'center',
        // textAlign: 'center',
        // backgroundColor: 'red'
    }
})