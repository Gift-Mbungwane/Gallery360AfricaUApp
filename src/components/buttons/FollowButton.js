import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const FollowButton = ({ text, onPress, icon, secondary }) => {
    console.log({ secondary });
    const containerStyle = [
        styles.container,
        secondary && { backgroundColor: "#FFFFFF", borderColor: "#EDEDED", borderWidth: 1 }
    ]
    const textStyle = [
        styles.text,
        secondary && { color: "#000000" }
    ]
  return (
    <TouchableOpacity style={containerStyle} >
        { icon && <Image style={styles.icon} source={ icon } /> }
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
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
        // width: "100%", 
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    icon:{
        height: 15,
        width: 15
    },
    text: {
        color: "#CEB89E",
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: '100'
    }
})