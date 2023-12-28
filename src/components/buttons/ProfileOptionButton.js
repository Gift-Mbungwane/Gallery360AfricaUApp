import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Cart } from '../icons'
import { Ionicons } from '@expo/vector-icons'

const ProfileOptionButton = ({ onPress, icon, text }) => {
    // console.log({ icon, text, onPress });
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.options}
        >
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                { icon }
                <Text style={styles.optionsText}>
                    {text}
                </Text>
            </View>

            <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>
    )
}

export default ProfileOptionButton

const styles = StyleSheet.create({
    options: {
        alignSelf: "center",
        backgroundColor: "#E3E3E3",
        width: "100%",
        height: 50,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 20,
        // marginVertical: 10,
        borderColor: 'red',
        // borderWidth: 1
      },
      optionsText: {
        color: "#0E1822", fontSize: 16, fontWeight: "600"
      }
})