import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TransparentHeaderView = ({ children, padding, style }) => {
    // console.log({ paddingInSafe: padding });
    const headerHeight = useHeaderHeight()
    const insets = useSafeAreaInsets()
    // console.log({ headerHeight, insets });
    console.log({ children });
    console.log({ headerHeight });
    return (
        <View style={[styles.container, { paddingTop: headerHeight + 15 }]}>
            <View style={[ styles.safeArea, padding !== null && { padding }, style !== null && {...style} ]}>
                { children ? children : (
                    <Text>NO DATA</Text>
                ) }
            </View>
        </View>
    )
}

export default TransparentHeaderView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 3,
        // borderColor: 'red'
    },
    safeArea: {
        flex: 1, padding: 10
    }
})