import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FilterText from '../text/FilterText'

const ScrollableFilterCard = ({ padding, onFilterChange }) => {
    // padding prop allows for resizing the scrollview to always take full width regardless of the container width
    // just calculate the space between the element and the screen margin

    const [active, setActive] = useState('All')
    // const active = 'All'
    const filters = [
        'All',
        'Painting',
        'Drawing',
        'Sculpture',
        'Printmaking',
        'Statues'
    ]
    const captureChange = (text) => {
        console.log({ text });
        console.log({ onFilterChange });
        if(onFilterChange) {
            console.log(onFilterChange);
            onFilterChange(text)
        } else {
            console.log('onfilterchange not defined');
        }
    }
    return (
        <View style={[styles.container, padding && { left: -padding, width: styles.container.width }]}>
            <ScrollView
                contentContainerStyle={[styles.scrollView, padding && { paddingHorizontal: padding, marginRight: padding }]}
                style={{ borderRadius: 20 }}
                horizontal={true}
                overScrollMode="always"
            >
                <View style={[styles.scrollable,  styles.containerShadow]}>
                    {
                        filters.map((item, index) => {
                            return (
                                <FilterText
                                    key={index}
                                    active={active === item}
                                    text={item}
                                    setActive={(text) => {
                                        setActive(text);
                                        captureChange(text)
                                    }}
                                />

                            )
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
        marginVertical: 5,
        // paddingHorizontal: 30,
        // left: -30
    },
    containerShadow: {
        // backgroundColor: 'red',
        shadowColor: 'rgb(120, 120, 120)',
        shadowOffset: {width: 5, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 4
      },
    scrollView: {
        flex: 0,
        // flexDirection: 'row',
        // backgroundColor: 'yellow',
        paddingVertical: 5,

        // borderRadius: 20,
        // marginHorizontal: 30,
        // paddingHorizontal: 30, // this works when nested inside another container. 
        overflow: 'hidden'
    },
    scrollable: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        // marginHorizontal: 10,
        borderRadius: 20
    }
})