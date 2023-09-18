import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

const LoaderImage = ({ uri, style, mode = null }) => {
    // console.log(uri);
    return (
        <Image
            source={{ uri }}
            placeholderStyle={{ backgroundColor: 'rgb(200, 200, 200)' }}
            PlaceholderContent={<ActivityIndicator size="large" color={"#000"} />}
            containerStyle={ style }
            style={ style }
            resizeMode={ mode }
        />
    )
}

export default LoaderImage
