import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionButton from '../buttons/ActionButton'
import { Comment, Heart } from '../icons'

const NewComment = ({ fullName, showCommentInput }) => {
  return (
    <View style={styles.container}>
        <Comment size={29} />
        <Text style={styles.username}>{fullName}</Text>
        <Text style={styles.subtitle}>Be the first to comment</Text>
        <ActionButton
            onPress={() => { showCommentInput }}
            text={'Add Comment'}
        />
    </View>
  )
}

export default NewComment

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6D6D6',
        gap: 5,
        padding: 10,
        alignItems: 'center'
    },
   
    username: {
        fontSize: 24,
        fontWeight: '500',
        color: 'rgb(80, 80, 80)'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: 'rgb(80, 80, 80)'
    }
})