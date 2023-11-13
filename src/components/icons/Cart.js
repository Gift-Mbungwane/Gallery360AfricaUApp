import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Cart = ({ size }) => {
    return (
        // <View style={{ backgroundColor: 'red'}}>
            <Image style={[{ height: size, width: size }]} source={require('../../../assets/icons/cart.png')} />

        // </View>
    )
}

export default Cart

const styles = StyleSheet.create({})