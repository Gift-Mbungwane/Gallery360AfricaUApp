import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RatingBar from './RatingBar'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import StarRating from './StarRating';

const Ratings = ({ averateRating, ratings }) => {
    console.log({ ratings });
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.avg}>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(averateRating)}</Text>
                <StarRating rating={averateRating} size={24}/>
                <Text style={styles.numOfReviews}>{ratings?.total ?? 0.0}</Text>
            </View>
            <View style={styles.right}>
                <RatingBar label={5} ratio={ratings ? (ratings?.stars["5"] / ratings?.total) : 0} />
                <RatingBar label={4} ratio={ratings ? (ratings?.stars["4"] / ratings?.total) : 0} />
                <RatingBar label={3} ratio={ratings ? (ratings?.stars["3"] / ratings?.total) : 0} />
                <RatingBar label={2} ratio={ratings ? (ratings?.stars["2"] / ratings?.total) : 0} />
                <RatingBar label={1} ratio={ratings ? (ratings?.stars["1"] / ratings?.total) : 0} />
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
    },
    numOfReviews: {
        fontSize: 14,
        color: 'black'
    },
    right: {
        flex: 6
    }
})