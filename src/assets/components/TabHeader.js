import React from 'react'
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    FontAwesome,
    MaterialCommunityIcons,
    EvilIcons,
    MaterialIcons,
    Entypo,
    Ionicons,
  } from "@expo/vector-icons";

export default function TabHeader({ uuid, fullName, imageLink, cartItem}) {
    // console.log('dataS');
    return (
        // <View style={styles.float}>
        <View style={[styles.container, {backgroundColor: 'red'}]}>
            <View style={ styles.headerLeft }>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    { fullName ? 'Hi ' + fullName : 'Welcome back' }
                </Text>
            </View>

            <View
                style={ styles.headerRight }
            >
                <TouchableOpacity
                    style={ styles.cartOpacity }
                    onPress={() =>
                        navigation.navigate("Cart", {
                            cartItem: cartItem,
                            uuid: uuid,
                        })
                    }
                >
                    <FontAwesome
                        name="shopping-cart"
                        size={17}
                        color={"#fff"}
                        style={{ alignSelf: "center" }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("UserProfile", {
                            photoURL: imageLink,
                            fullName: fullName,
                            uuid: uuid,
                            cartItem: cartItem,
                        })
                    }
                    style={ styles.profilePhotoOpacity }
                >
                    <Image
                        source={{ uri: `${imageLink}` }}
                        style={ styles.profilePhoto }
                    />
                </TouchableOpacity>
            </View>
        </View>
        // </View>

    )
}
const statusBarHeight = StatusBar.currentHeight
const styles = StyleSheet.create({
    float: {
        display: 'flex',
        position: 'absolute',
        top: 100,
        left: 0
    },
    container: {
        // borderWidth: 1,
        // borderColor: 'red',
        // height: 80,
        left: 0,
        // top: statusBarHeight ? statusBarHeight : 0,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal: 20,
        // marginBottom: statusBarHeight ? statusBarHeight - 40 : 0,
        width: Dimensions.get('window').width,
        zIndex: 50000,
        // backgroundColor: 'blue'
    },
    headerLeft: {
        // marginLeft: 35
    }, 
    headerRight: {
        flexDirection: "row",
        width: 82,
        // borderColor: 'blue',
        // borderWidth: 1,
        justifyContent: 'space-between'
        // left: 35,
    },
    cartOpacity: {
        borderWidth: 0.5,
        borderRadius: 15,
        width: 35,
        height: 35,
        // right: 20,
        borderColor: "#fff",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    profilePhotoOpacity: {
        // right: 10
    },
    profilePhoto: {
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: "lightgrey",
        borderColor: "#ceb89e",
        borderWidth: 0.5,
    }
})