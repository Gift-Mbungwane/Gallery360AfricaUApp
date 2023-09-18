import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export default function Skeleton({ width, height, variant, radius, style, children }) {
    const opacity = useRef(new Animated.Value(0.36));
    // console.log(opacity.current.toValue);
    const opacityVal = opacity.current
    if (!variant) {
        throw Error('variant expects a value of either circle or rectangle')
    }
    const borderRadius = variant === 'circle' ? Number(height) / 2 : radius ? radius : 0;
    // console.log(borderRadius, height);
    // console.log(children);
    const skeletonStyle = {
        flex: 1,
        backgroundColor: `rgb(210, 210, 210)`,
        position: 'relative',
        borderRadius: Number(borderRadius),
        width: width,
        height: height,
        ...style
    }
    const styles = StyleSheet.create({
        skeleton: skeletonStyle
    })
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityVal, { toValue: 0.6, duration: 350, useNativeDriver: true }),
                Animated.timing(opacityVal, { toValue: 0.85, duration: 250, useNativeDriver: true  }),
                Animated.timing(opacityVal, { toValue: 1, duration: 150, useNativeDriver: true  }),
                Animated.timing(opacityVal, { toValue: 0.5, duration: 250, useNativeDriver: true  }),
                Animated.timing(opacityVal, { toValue: 0.4, duration: 110, useNativeDriver: true  }),
                Animated.timing(opacityVal, { toValue: 0.36, duration: 80, useNativeDriver: true  })
            ])
        ).start()
    }, [opacity])
    return (
        // <Animated.View style={{ backgroundColor: 'rgb(200, 200, 200)', flex: 1, opacity: opacity.current, borderRadius: Number(borderRadius), width: width, height: height }}>

        // </Animated.View>
        // <View style={{ width: width, height: height, backgroundColor: 'rgb(250, 250, 250)', borderRadius: borderRadius }}>
             <Animated.View style={[styles.skeleton, {opacity: opacityVal}]}>{children}</Animated.View>
        // </View>
       
    )
}
