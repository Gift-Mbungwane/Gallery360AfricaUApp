import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'

const UserHeaderCard = ({ userDetails, onPress, navigation, cartItem }) => {
    console.log({ userDetails });
    console.log({ navigationInHeader: navigation });
    return (
        <TouchableOpacity
            onPress={() => {
                console.log({ navigation });
                navigation.navigate('UserProfile', {
                    photoURL: userDetails.photoUrl,
                    fullName: userDetails.fullName,
                    uuid: userDetails.userId,
                    cartItem: cartItem,
                })
            }

            }>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 70 }}>
                <HeroImage
                    uri={userDetails.photoUrl}
                    size={50}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Hi, {userDetails.fullName ?? 'User'}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

export default UserHeaderCard

const styles = StyleSheet.create({})