import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements';

const TransparentHeaderView = ({ children, padding, style }) => {
    console.log({ paddingInSafe: padding });
    const headerHeight = useHeaderHeight()
    console.log({ children });
    return (
        <View style={[styles.container, { paddingTop: headerHeight }]}>
            <View style={[ styles.safeArea, padding !== null && { padding }, style !== null && {style} ]}>
                { children }
            </View>
        </View>
    )
}

export default TransparentHeaderView

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'blue', borderColor: 'green', borderWidth: 3

    },
    safeArea: {
        flex: 1, backgroundColor: 'yellow', padding: 10
    }
})