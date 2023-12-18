import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Person } from '../icons';

const FollowButton = ({ text, onPress, icon, secondary, isFollowing, updateFollowing }) => {
    console.log({ secondary });
    console.log({ follows: isFollowing });
    const containerStyle = [
        styles.container,
        !isFollowing && { backgroundColor: "#FFFFFF", borderColor: "#EDEDED", borderWidth: 1 }
    ]
    const textStyle = [
        styles.text,
        !isFollowing && { color: "#000000" }
    ]

    return (
        <View style={{ flex: 0, alignItems: 'flex-start' }}>
            <TouchableOpacity style={containerStyle} onPress={updateFollowing}>
                {!isFollowing && <Person size={18} /> }
                    <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FollowButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        // paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: '#181818',
        height: 25,
        // width: 100,

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        // flex: 1,
        gap: 5
    },
    icon: {
        height: 15,
        width: 15,
        // backgroundColor: 'red'
    },
    text: {
        color: "#CEB89E",
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: '300',
        // flex: 1,
        // backgroundColor: 'red'
    }
})