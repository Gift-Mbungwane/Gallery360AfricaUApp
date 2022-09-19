import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../styles/GlobalStyles'

export default function HomeHeaderRight({ navigation, cartItem }) {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("Cart", {
                    cartItem: cartItem,
                    uuid: uuid,
                })
            }
            style={globalStyles.cartIcon}
        >
            <View
                style={[
                    Platform.OS == "android"
                        ? globalStyles.iconContainer
                        : null,
                ]}
            >
                {cartItem > 0 ? (
                    <View
                        style={{
                            position: "absolute",
                            height: 16,
                            width: 16,
                            borderRadius: 17,
                            backgroundColor: "rgba(95,197,123,0.9)",
                            right: 2,
                            marginVertical: 3,
                            alignSelf: "flex-end",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2000,
                        }}
                    >
                        <Text
                            style={{
                                color: "#F5F5F5",
                                fontWeight: "bold",
                                marginVertical: -10,
                                fontSize: 12,
                            }}
                        >
                            {cartItem}
                        </Text>
                    </View>
                ) : (
                    <View></View>
                )}
                <MaterialCommunityIcons
                    name="cart"
                    size={25}
                    color={"#FFFFFF"}
                    style={{ alignSelf: "center", marginVertical: 6 }}
                />
            </View>
        </TouchableOpacity>
    )
}
