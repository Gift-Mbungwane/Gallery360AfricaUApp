import { StyleSheet, Text, View } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import React, { useEffect, useState } from 'react'

const ArtworkImageSlider = ({ imagesArr }) => {
    console.log({ images: imagesArr[0] });
    useEffect(() => {
        // setImages(imagesArr.map(item => item.imgUrl))
        console.log({ imagesArr });
    }, [imagesArr])
    // const images = [
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"
    // ]
    return (
        <View style={{ left: 0, top: 0 }}>
            <SliderBox
                images={imagesArr}
                // sliderBoxHeight={200}
                sliderBox
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor="#FFF"
                inactiveDotColor="rgba(255, 255, 255, 0.5)"
                paginationBoxVerticalPadding={0}
                paginationBoxStyle={{
                    position: "absolute",
                    bottom: 3,
                    // padding: 0,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    backgroundColor: 'grey',
                    borderRadius: 10,
                }}
                dotStyle={{
                    width: 5,
                    height: 15,
                    borderRadius: 20,
                    marginHorizontal: 3,
                    padding: 0,
                    margin: 0,
                    backgroundColor: '#FFF',
                    color: "#FFF"
                }}
            />
        </View>
    )
}

export default ArtworkImageSlider

const styles = StyleSheet.create({})