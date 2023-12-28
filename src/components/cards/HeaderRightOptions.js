import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const HeaderRightOptions = ({ navigation, userDetails, cartItem }) => {
    console.log({ navigation, userDetails, cartItem });
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.cartContainer}
                onPress={() =>
                    navigation.navigate("Cart", {
                        cartItem: cartItem,
                        uuid: userDetails.userId,
                    })
                }
            >
                { cartItem > 0 && (
                    <View style={styles.cartCounterContainer}>
                        <Text style={styles.cartCounterText}>
                            {cartItem}
                        </Text>
                    </View>
                )}
                <Image source={require('../../../assets/icons/bulk.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>

    )
}

export default HeaderRightOptions

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: 70,
        alignItems: 'center',
        gap: 10
    },
    cartContainer: {
        borderWidth: 0.5,
        borderRadius: 20,
        width: 50,
        height: 50,
        // right: 20,
        borderColor: "#181818",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    cartCounterContainer: {
        position: "absolute",
        height: 18,
        width: 18,
        borderRadius: 17,
        backgroundColor: "rgba(95,197,123,0.9)",
        right: -6,
        top: -6,
        marginVertical: 3,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
    },
    cartCounterText: {
        color: "#F5F5F5",
        fontWeight: "bold",
        // marginVertical: -9,
        fontSize: 12,
    }
})