import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RatingBar from './RatingBar'

const Ratings = ({ averateRating, numOfReviews}) => {
  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Text style={styles.avg}>{ averateRating }</Text>
            <Text style={ styles.numOfReviews }>star counter</Text>
            <Text style={styles.numOfReviews}>{numOfReviews}</Text>
        </View>
        <View style={styles.right}>
            <RatingBar rating={5} />
            <RatingBar rating={4} />
            <RatingBar rating={3} />
            <RatingBar rating={2} />
            <RatingBar rating={1} />
        </View>
    </View>
  )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10
    },
    left: {
        flex: 4,
        flexDirection: 'column'
    },
    avg: {
        fontSize: 40,
        color: 'black'
    },
    numOfReviews: {
        fontSize: 14,
        color: 'black'
    },
    right: {
        flex: 6
    }
})