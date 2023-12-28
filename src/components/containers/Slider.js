
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'

const Slider = ({ contentContainerStyle, children }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    console.log({ children });
    const Slid = () => <Image style={{ "borderBottomLeftRadius": 20, "borderBottomRightRadius": 20, "flex": 1, "height": "100%", "justifyContent": "center", "width": "100%" }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1701424180058?alt=media&token=230ff691-d984-4bc5-b078-dec8cd993fe6" }} />
    console.log(Slid);
    const link = "https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1701424180058?alt=media&token=230ff691-d984-4bc5-b078-dec8cd993fe6"
    handleViewItemsChange = (data) => {
        console.log({ shownData: data });
    }
    const onViewableItemsChanged = ({
        viewableItems,
      }) => {
        // Do stuff
        console.log({ viewableItems });
        const index = viewableItems[0].index
        console.log({ index });
        setActiveIndex(index)
      };
      const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
      ]);
    return (
        <View style={[styles.container, contentContainerStyle]}>
            <FlatList
                horizontal
                data={children}
                keyExtractor={(item, index) => index}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get('window').width}
                viewabilityConfigCallbackPairs={
                    viewabilityConfigCallbackPairs.current
                }

                renderItem={({ item }) => {
                    const Component = () => item
                    // console.log(<Component { ...item.props }/>);
                    return <Component {...item.props} />
                    // return <Image style={{ width: Dimensions.get('window').width, aspectRatio: 0.7}} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1701424180058?alt=media&token=230ff691-d984-4bc5-b078-dec8cd993fe6"}} />
                }}
            />
            <View style={styles.paginatorCount}>
                {
                    children.map((item, index) => {
                        return <View style={[styles.inactiveIndex, activeIndex === index && {backgroundColor: '#FFF'}]} />
                    })
                }
            </View>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red',
        overflow: 'hidden'
    },
    paginatorCount: {
        position: 'absolute',
        padding: 8,
        borderRadius: 10,
        // width: 100,
        // height: 100,
        // zIndex: 10,
        // elevation: 10,
        bottom: 90,
        flexDirection: 'row',
        backgroundColor: 'rgba(150, 150, 150, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    inactiveIndex: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 5,
        height: 20,
        borderRadius: 5
    }
})