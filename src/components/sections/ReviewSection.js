import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ratings, Reviews, NewComment } from '../reviews'

const ReviewSection = ({ enabled, reviews, fullName, showCommentInput, averateRating, numOfReviews }) => {
    if (!enabled) return null
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Comments</Text>
            <Ratings averateRating={averateRating} numOfReviews={numOfReviews}/>
            {
                reviews && reviews.length > 0 ? (
                    <FlatList
                        data={reviews}
                        keyExtractor={reviews.id}
                        renderItem={item => <Reviews { ...item } /> }
                    />
                ) : (
                    <NewComment fullName={fullName} showCommentInput={showCommentInput}/>
                ) 
            }
        </View>
    )
}

export default ReviewSection

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 20

    },
    header: {
        fontSize: 24,
        color: 'rgb(20, 20, 20)'
    }

})