import { Modal, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'
import ActionButton from '../buttons/ActionButton'
import { Ionicons } from '@expo/vector-icons'

const ReviewInput = ({ showCommentInput = false, setShowCommentInput, onSubmit, submitLoading }) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    return (
        <Modal
            visible={showCommentInput}
            animationType="slide"
            transparent
            onRequestClose={() => setShowCommentInput(false)}
        >
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ alignSelf: 'flex-end', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', borderColor: 'rgb(180,180,180)', borderWidth: 1, width: Dimensions.get('window').width }}>
                    <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'rgb(180, 180, 180)', borderBottomWidth: 1 }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: 'rgb(80, 80, 80)' }}>Insert your review</Text>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setShowCommentInput(false)}>
                            <Ionicons name='close' size={28} color={'rgb(100, 100, 100)'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, marginTop: 20 }}>
                            <StarRating
                                rating={rating}
                                onChange={(val) => { console.log(val); setRating(val) }}
                                enableHalfStar={false}
                                starSize={50}
                                starStyle={{ marginHorizontal: 0 }}
                            />
                            {
                                rating > 0 && (
                                    <Text>{rating} star{rating > 1 && 's'}</Text>
                                )
                            }
                        </View>

                        <TextInput multiline={true} onChangeText={(text) => setReview(text) } numberOfLines={10} style={{ padding: 10, height: 150, width: '100%', borderRadius: 15, borderColor: 'rgb(180, 180, 180)', borderWidth: 1, textAlignVertical: 'top', color: 'rgb(50, 50, 50)', fontSize: 16 }} />
                        <ActionButton text={'Submit Review'} onPress={() => onSubmit(rating, review)} isLoading={submitLoading} />
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default ReviewInput

const styles = StyleSheet.create({})