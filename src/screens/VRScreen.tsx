import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';


const VrScreen = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const getMedia = async () => {
            if (Platform.OS === 'android') {
                await requestPermissions();
            }

            const localStream = await mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            setStream(localStream);
        };

        getMedia();
    }, []);

    const requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
            return (
                granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
            );
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Local Video Preview</Text>
            {stream ? (
                <RTCView
                    streamURL={stream.toURL()}
                    style={styles.video}
                    objectFit="cover"
                />
            ) : (
                <Text>Loading camera...</Text>
            )}
        </View>
    );
};

export default VrScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
    },
    video: {
        width: '90%',
        height: '60%',
        backgroundColor: '#333',
    },
});