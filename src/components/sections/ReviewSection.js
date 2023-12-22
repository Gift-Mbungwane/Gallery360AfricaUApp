import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ratings, Reviews, NewComment, ReviewInput } from '../reviews'
import ActionButton from '../buttons/ActionButton';

const ReviewSection = ({ enabled, hasReviewed, ratings, reviews, fullName, uid, averateRating, onReviewSubmit, submitLoading, showCommentInput, setShowCommentInput }) => {
    console.log({ reviewsInSection: ratings, uid });
    // const [hasReviewed] = useState(ratings?.reviewers?.includes(uid) ? true : false)
    console.log({ reviewsInReviews: reviews });
    console.log({ hasReviewed });
    console.log({ setShowCommentInput });
    if (!enabled) return null
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Comments</Text>
            <Ratings averateRating={averateRating} ratings={ratings} />
            {
                !hasReviewed && reviews && reviews.length > 0 && (
                    <ActionButton
                        onPress={() => {
                            console.log('action is pressed');
                            setShowCommentInput(true)
                        }}
                        text={'Add Comment'}
                    />
                )
            }
            {
                reviews && reviews.length > 0 ? (
                    <FlatList
                        data={reviews}
                        keyExtractor={reviews.id}
                        renderItem={(reviewItem) => {
                            console.log({ itemInReviews: reviewItem.item });
                            return <Reviews {...reviewItem.item} reviewerId={uid} />
                        }}
                    />
                ) : (
                    // {
                    !hasReviewed && <NewComment fullName={fullName} setShowCommentInput={setShowCommentInput} />
                    // }

                )
            }
            <ReviewInput submitLoading={submitLoading} showCommentInput={showCommentInput} setShowCommentInput={setShowCommentInput} onSubmit={(rating, review) => { onReviewSubmit(rating, review) }} />

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