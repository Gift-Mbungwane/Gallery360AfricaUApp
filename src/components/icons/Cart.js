import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Cart = ({ size, dark=false }) => {
    return (
        // <View style={{ backgroundColor: 'red'}}>
            <Image style={[{ height: size, width: size }]} source={ dark ? require('../../../assets/icons/bulk.png') : require('../../../assets/icons/cart.png')} />

        // </View>
    )
}

export default Cart

const styles = StyleSheet.create({})