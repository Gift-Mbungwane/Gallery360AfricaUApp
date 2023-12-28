import { StyleSheet, Text, View, Modal, Dimensions, Image } from 'react-native'
import React from 'react'
import VideoPlayer from 'expo-video-player'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'

const ArtistDetailsModal = ({ isVisible, signature, videoUrl, description, hideModal }) => {
    console.log({ videoUrl });console.log({ video: 'haha'});
    const [videoRef, setVideoRef] = useState(null)
    return (
        <Modal
            visible={isVisible}
            // transparent
            style={styles.modal}
            onRequestClose={hideModal}
        >
            <View style={styles.modalView}>
                { 
                    ((videoUrl && videoUrl) !== 'no video') &&
                    <Videod
                        ref={videoRef}
                        style={{ width: "100%", height: 300, borderRadius: 20, overflow: 'hidden' }}
                        source={{
                            uri: videoUrl,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.STRETCH}
                        isLooping
                        onPlaybackStatusUpdate={status => {
                            console.log({ status });
                        }}
                    />
                }

                <Image source={{ uri: signature }} style={{ width: "60%", aspectRatio: 1 }} />
                <Text style={{ color: 'rgb(100, 100, 100)' }}>authenticity</Text>
                <Text style={{ marginTop: 10 }}>{description}</Text>
            </View>
        </Modal>
    )
}

export default ArtistDetailsModal

const styles = StyleSheet.create({
    modal: {
        // height: 100,
        width: Dimensions.get('window').width,
        backgroundColor: 'red',

    },
    modalView: {
        // height: 100,
        padding: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: 'red',
        marginTop: 'auto',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})