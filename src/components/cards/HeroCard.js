import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'
const img = "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"
const HeroCard = ({ name, pic, uid, onPress }) => {
  // console.log({ name, pic, uid, onPress });
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(uid)}>
        <HeroImage uri={ pic || img }/>
        <Text style={styles.artistName}>{name}</Text>
    </TouchableOpacity>
  )
}

export default HeroCard

const styles = StyleSheet.create({
    container: {
        padding: 5,
        gap: 5,
        width: 82,
        zIndex: 1
    },  
    artistName: {
        color: '#616161',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 17
    }
})