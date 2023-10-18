import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageCounter from '../counters/MessageCounter'
import LikeCounter from '../counters/LikeCounter'
import HeroImage from '../images/HeroImage'
import FollowButton from '../buttons/FollowButton'

const UserActivityCard = ({ artist }) => {
    return (
        <View style={styles.container}>
            <HeroImage uri={"https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"} />
            <View style={{ flex: 1}}>
                <Text>{artist}</Text>
                <View style={{ flex: 0, backgroundColor: 'blue'}}>
                <FollowButton text="Following" onPress={{}} icon={require("../../../assets/icons/person.png")} secondary={true} />
                <FollowButton text="Following" onPress={{}} secondary={false} />
                </View>

            </View>
            <MessageCounter />
            <LikeCounter />
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
        alignItems: 'center'
    }
})