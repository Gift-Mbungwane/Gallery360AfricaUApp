import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const SignOutButton = ({ signOutUser }) => {
    return (
        <TouchableOpacity style={{
          height: 50,
          width: 50,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 5
          // alignSelf: "center"
        }}
          onPress={signOutUser}
        >
          <FontAwesome name='sign-out' size={21} color='white'></FontAwesome>
          {/* <Image src={LogoutIcon} style={{height: 30, width: 30}}></Image> */}
        </TouchableOpacity>
      )
}

export default SignOutButton

const styles = StyleSheet.create({})