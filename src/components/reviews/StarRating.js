import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'

const StarRating = ({ rating, size, style }) => {
    console.log({ style });
    return (
        <StarRatingDisplay
            rating={rating}
            style={[styles.starContainer, style && { ...style } ]}
            starStyle={styles.star}
            starSize={size}
        />
    )
}

export default StarRating

const styles = StyleSheet.create({
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'black',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        gap: 5
    },
    star: {
        display: 'flex',
        flex: 1,
        margin: 0,
        marginHorizontal: 0,
        paddingHorizontal: 5,
        // paddingVertical: 5,
        // paddingHorizontal: -10,
        justifyContent: 'center',
        alignItems: 'center',
        // left: -2,
        // backgroundColor: 'red',
        // padding: 10,
        // width: '20%'
    }
})