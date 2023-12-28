import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, BlurView } from 'react-native'
import React from 'react'
import Swiper from "react-native-swiper";
import ExhibitionCard from '../cards/ExhibitionCard';

const ExhibitionSwiper = ({ exhibition, navigation }) => {
  return (
    <Swiper style={{ borderRadius: 20, overflow: 'hidden' }} showsPagination={false} showsButtons >
    {
      exhibition.length > 0 && exhibition.map(item => {
        console.log({ item });
        return (
            <ExhibitionCard key={item.exhibitionUid} item={item} navigation={navigation}/>
        )
      })
    }
  </Swiper>
  )
}

export default ExhibitionSwiper

const styles = StyleSheet.create({})