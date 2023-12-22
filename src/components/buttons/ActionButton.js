import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'

const ActionButton = ({ text, onPress, icon, disabled, style, isLoading }) => {
    console.log({ text, onPress, icon });
    const containerStyle = [
        styles.container,
        disabled && { backgroundColor: "#FFFFFF" }
    ]
    const textStyle = [
        styles.text,
        disabled && { color: "#22180E" }
    ]
    return (
        <TouchableOpacity style={[containerStyle, style]} onPress={onPress} disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator size={'large'} color={'#FFFFFF'}/>
            ) : (
                <>
                    {icon && icon}
                    <Text style={textStyle}>{text}</Text>
                </>

            )}

        </TouchableOpacity>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#181818',
        height: 54,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    text: {
        color: "#FFFFFF",
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: '500'
    }
})