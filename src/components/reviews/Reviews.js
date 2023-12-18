import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'

const Reviews = ({ photoUrl, username, date, comment, rating }) => {
  return (
    <View style={styles.container}>
      <HeroImage uri={photoUrl} size={38} onPress={() => console.log()} />
      <View style={styles.content}>
        <View style={styles.topContent}>
            <View style={styles.contentLeft}>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text>{rating}</Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6D6D6'
    },
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    topContent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLeft: {
        flexDirection: 'row',
    },
    name: {
        fontSize: 16,
        color: 'rgb(50, 50, 50)'
    },
    date: {
        color: 'rgb(50, 50, 50)',
        fontSize: 10
    },
    comment: {
        fontSize: 12,
        color: 'rgb(50, 50, 50)'
    }
})