import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageCounter from '../counters/MessageCounter'
import LikeCounter from '../counters/LikeCounter'
import HeroImage from '../images/HeroImage'
import FollowButton from '../buttons/FollowButton'
import { TouchableOpacity } from 'react-native'

const UserActivityCard = ({ artistName, following, likes, messages, artistPhoto, viewArtist }) => {
    const uri = "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => viewArtist()}>
                <HeroImage uri={artistPhoto ?? uri}  />
            </TouchableOpacity>
            <View style={{ flex: 1, gap: 5 }}>
                <TouchableOpacity onPress={() => viewArtist()}>
                    <Text>{artistName}</Text>
                </TouchableOpacity>
                <FollowButton text="Following" onPress={{}} icon={require("../../../assets/icons/person.png")} secondary={true} following={!following} />
            </View>
            <MessageCounter counter={messages} />
            <LikeCounter counter={likes} />
        </View>
    )
}

export default UserActivityCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        height: 70,
        alignItems: 'center',
        paddingVertical: 10
    }
})