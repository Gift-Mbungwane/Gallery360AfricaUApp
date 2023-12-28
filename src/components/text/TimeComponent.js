import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'


const TimeComponent = ({ seconds }) => {
    const [time, setTime] = useState({
        hours: 0, minutes: 0, seconds: 0
    })

    useEffect(() => {
        // console.log({secondsInTime: seconds});
        const time = {
            hours: Math.floor((seconds / (60 * 60))),
            minutes: getDouble(Math.floor((seconds / (60)) % 60)),
            seconds: getDouble(Math.floor((seconds) % 60))
        }
        // console.log({time});
        setTime(time)
    }, [seconds])

    const getDouble = (time) => {
        return time >= 10 ? '' + time : '0' + time
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {time.hours > 0 && <Text>{time.hours + ':'}</Text>}
            <Text>{time.minutes + ':'}</Text>
            <Text>{time.seconds}</Text>
        </View>
    )
}

export default TimeComponent

const styles = StyleSheet.create({})