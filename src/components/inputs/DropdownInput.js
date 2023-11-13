import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import {  } from 'react-native-web'
import { ArrowDown } from '../icons'

const DropdownInput = () => {
    const [sortBy, setSortBy] = useState({
        name: 'new',
        text: 'New To Old'
    })
    const options = [
        { name: 'new', text: 'New To Old' },
        { name: 'old', text: 'Old To New' },
        { name: 'a-z', text: 'A- Z' },
        { name: 'z-a', text: 'Z - A' }
    ]
    const [showOptions, toggleShowOptions] = useState(false)
    const updateState = (item) => {
        setSortBy(item)
        toggleShowOptions(state => !state)
    }
    return (
        <View>
            <TouchableOpacity style={styles.touchable} onPress={() => toggleShowOptions(state => !state)}>
                <Text>{sortBy.text}</Text>
                <ArrowDown size={24} rotate={showOptions} />
            </TouchableOpacity>
            {
                showOptions && (
                    <View style={[styles.listContainer]}>
                        <View style={styles.list}>
                            {
                                options.map((item, index) => {
                                    const disabled = item.name === sortBy.name
                                    return <>
                                        <TouchableOpacity key={item.name} style={styles.optionOpacity} disabled={disabled} onPress={() => updateState(item)}>
                                            <Text style={[styles.optionText,disabled && {color: 'rgb(80, 80, 80)'}]}>{item.text}</Text>
                                        </TouchableOpacity>
                                        {
                                            index !== options.length - 1 && (
                                                <View style={styles.line} />
                                            )
                                        }

                                    </>

                                })
                            }
                            {/* <TouchableOpacity style={styles.optionOpacity}>
                                <Text style={styles.optionText}>New To Old</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionOpacity}>
                                <Text style={styles.optionText}>Old to New</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionOpacity}>
                                <Text style={styles.optionText}>A - Z</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionOpacity}>
                                <Text style={styles.optionText}>Z - A</Text>
                            </TouchableOpacity> */}
                        </View>

                    </View>
                )
            }

        </View>
    )
}

export default DropdownInput

const styles = StyleSheet.create({
    touchable: {
        flexDirection: 'row',
        gap: 10,
        // backgroundColor: 'red',
        alignItems: 'center',
        marginVertical: 5
    },
    text: {
        fontSize: 12,
        color: '#000000'
    },
    listContainer: {
        // overflow: 'scroll',
        // backgroundColor: 'red',
        // flex: 0
    },
    list: {
        position: 'absolute',
        zIndex: 100,
        elevation: 100,
        // marginTop: 'auto',
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTopVertical: 5,
        // gap: 5,
        minWidth: 100
    },
    optionOpacity: {
        paddingVertical: 8
    },
    optionText: {

    },
    line: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#CEB89E'
    }
})