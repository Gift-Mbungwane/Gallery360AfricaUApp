import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'

const UserHeaderCard = ({ userDetails }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <HeroImage
                uri={userDetails.photoUrl}
                onPress={() => navigation.navigate('UserProfile', {
                    photoURL: userDetails.photoUrl,
                    fullName: userDetails.fullName,
                    uuid: userDetails.userId,
                    cartItem: cartItem,
                })}
                size={50}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Hi, {userDetails.fullName}
            </Text>
        </View>
    )
}

export default UserHeaderCard

const styles = StyleSheet.create({})