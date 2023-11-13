import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ViewAll = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress}>
            <Text style={styles.viewMoreText}>View All</Text>
        </TouchableOpacity>
    )
}

export default ViewAll

const styles = StyleSheet.create({
    viewMoreText: {
        color: '#CEB89E',
        padding: 10
    }
})