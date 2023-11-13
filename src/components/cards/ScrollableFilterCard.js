import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FilterText from '../text/FilterText'

const ScrollableFilterCard = ({ padding }) => {
    // padding prop allows for resizing the scrollview to always take full width regardless of the container width
    // just calculate the space between the element and the screen margin

    const [ active, setActive ] = useState('All')
    // const active = 'All'
    const filters = [
        'All',
        'Painting',
        'Drawing',
        'Sculpture',
        'Printmaking',
        'Statues'
    ]
    return (
        <View style={[styles.container, padding && { left: -padding, width: styles.container.width } ]}>
            <ScrollView
                contentContainerStyle={[styles.scrollView, padding && { paddingHorizontal: padding, marginRight: padding } ]}
                style={{ borderRadius: 20 }}
                horizontal={true}
                overScrollMode="always"
            >
                <View style={styles.scrollable}>
                {
                    filters.map((item, index) => {
                        return <FilterText key={index} active={active === item} text={item} setActive={(text) => setActive(text)} />
                    })
                }
                </View>

            </ScrollView>
        </View>
    )
}

export default ScrollableFilterCard

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        alignItems: 'flex-start',
        // borderRadius: 20,
        overflow: 'hidden',
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: Dimensions.get('window').width, 
        marginVertical: 10,
        // paddingHorizontal: 30,
        // left: -30
    },
    scrollView: {
        flex: 0,
        // flexDirection: 'row',
        // backgroundColor: 'yellow',
        
        // borderRadius: 20,
        // marginHorizontal: 30,
        // paddingHorizontal: 30, // this works when nested inside another container. 
        overflow: 'hidden'
    },
    scrollable: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        // marginHorizontal: 10,
        borderRadius: 20
    }
})