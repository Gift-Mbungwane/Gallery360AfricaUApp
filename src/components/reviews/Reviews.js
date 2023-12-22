import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'
import StarRating from './StarRating'

const Reviews = ({ photoURL, username, date, review, rating, reviewerId, id }) => {
    return (
        <View style={styles.container}>
            <HeroImage uri={photoURL} size={38} onPress={() => console.log()} />
            <View style={styles.content}>
                <View style={styles.topContent}>
                    <View style={styles.contentLeft}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.name}>{username}</Text>
                            {
                                reviewerId === id && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, left: 5 }}>
                                        <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: 'rgb(50, 50, 50)' }} />
                                        <Text style={{ color: 'rgb(50, 50, 50)' }}>You</Text>
                                    </View>
                                )
                            }
                        </View>

                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <View style={styles.starContainer}>
                        <StarRating rating={rating} size={18} style={{ gap: 10 }} />
                    </View>

                </View>
                <Text style={styles.comment}>{review}</Text>
            </View>
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6D6D6',
        padding: 10,
        marginVertical: 10
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        gap: 10
    },
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLeft: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        color: 'rgb(50, 50, 50)'
    },
    date: {
        color: 'rgb(50, 50, 50)',
        fontSize: 10
    },
    starContainer: {
        // backgroundColor: 'red'
    },
    comment: {
        fontSize: 12,
        color: 'rgb(50, 50, 50)'
    }
})